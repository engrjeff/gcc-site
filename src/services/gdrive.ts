import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const gdrive = google.drive({
  version: "v3",
  auth,
});

export async function getPreachingFolders() {
  try {
    const rootFolder = await gdrive.files.list({
      q: `name='Preaching'`,
      spaces: "drive",
    });

    if (!rootFolder.data.files) {
      return [];
    }

    const root = rootFolder.data.files[0];

    const preachingFolders = await gdrive.files.list({
      q: `mimeType = 'application/vnd.google-apps.folder' and '${root.id}' in parents`,
      fields: "nextPageToken, files(id, name, description)",
      orderBy: "name desc",
      spaces: "drive",
    });

    return preachingFolders.data.files;
  } catch (error) {
    return [];
  }
}

export async function getResourcesFolders() {
  try {
    const rootFolder = await gdrive.files.list({
      q: `name='gcc_app'`,
      spaces: "drive",
    });

    if (!rootFolder.data.files) {
      return [];
    }

    const root = rootFolder.data.files[0];

    const resourcesFolders = await gdrive.files.list({
      q: `mimeType = 'application/vnd.google-apps.folder' and '${root.id}' in parents`,
      fields: "nextPageToken, files(id, name, description)",
      orderBy: "createdTime asc",
      spaces: "drive",
    });

    return resourcesFolders.data.files;
  } catch (error) {
    return [];
  }
}

export async function getResourceFilesByFolder(
  folderId: string,
  order: "asc" | "desc" = "asc"
) {
  try {
    // get folder details first
    const folder = await gdrive.files.get({
      fileId: folderId,
      fields: "id,name,description",
    });

    const files = await gdrive.files.list({
      q: `'${folder.data.id}' in parents`,
      fields:
        "nextPageToken, files(id,name,description,thumbnailLink,fileExtension,size,webViewLink,webContentLink)",
      orderBy: `name ${order}`,
      spaces: "drive",
    });

    return {
      folder: folder.data,
      files: files.data.files,
    };
  } catch (error) {
    console.log(error);
    return {
      folder: null,
      files: [],
    };
  }
}
