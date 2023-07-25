import type { GetServerSideProps } from "next";
import Link from "next/link";

import { getResourceFilesByFolder } from "@/services/gdrive";
import { NextPageWithLayout } from "@/pages/_app";
import ResourcesLayout from "@/components/ResourcesLayout";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { formatToReadableBytes } from "@/lib/helpers";

interface Props {
  data: Awaited<ReturnType<typeof getResourceFilesByFolder>>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { folderId } = context.params as { folderId: string };

  const data = await getResourceFilesByFolder(folderId);

  return {
    props: {
      data,
    },
  };
};

const FilesPage: NextPageWithLayout<Props> = ({ data }) => {
  return (
    <div>
      <ul className='space-y-3'>
        {data.files?.map((file) => (
          <li key={file.id}>
            <div className='flex items-center justify-between px-4 py-4 rounded-lg text-slate-900 dark:text-white border-2 dark:border-slate-800'>
              <div>
                <h2 className='font-semibold text-sm lg:text-lg'>
                  {file.name}
                </h2>
                <p className='text-xs text-slate-500'>
                  {formatToReadableBytes(parseFloat(file.size!))}
                </p>
              </div>
              <a
                href={file.webViewLink!}
                target='_blank'
                className='h-8 w-8 rounded bg-slate-900 flex items-center justify-center hover:bg-primary'
              >
                <span className='sr-only'>open file</span>
                <ArrowUpRightIcon className='h-4 w-4' />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

FilesPage.getLayout = function getLayout(page) {
  return (
    <ResourcesLayout
      title={
        <div>
          <Link href='/resources/lessons' className='hover:text-primary'>
            Lessons
          </Link>
          <span> {">"} </span>
          <span>{page.props.data.folder?.name}</span>
        </div>
      }
      subtitle={page.props.data.folder?.description!}
    >
      {page}
    </ResourcesLayout>
  );
};

export default FilesPage;
