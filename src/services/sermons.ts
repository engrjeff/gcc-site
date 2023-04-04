import { Database } from "@/lib/database.types";
import { formatDate } from "@/lib/helpers";
import { supabase } from "@/lib/supabaseClient";

export const getSermons = async () => {
  const sermons = await supabase
    .from("sermon")
    .select()
    .order("recordingDate", { ascending: false });

  return {
    ...sermons,
    data: sermons.data?.map((d) => ({
      ...d,
      recordingDate: formatDate(d.recordingDate),
    })),
  };
};

export const getRecentSermons = async () => {
  const sermons = await supabase
    .from("sermon")
    .select()
    .limit(3)
    .order("recordingDate", { ascending: false });

  return {
    ...sermons,
    data: sermons.data?.map((d) => ({
      ...d,
      recordingDate: formatDate(d.recordingDate),
    })),
  };
};

export const getSermonById = async (id: string) => {
  const sermon = await supabase.from("sermon").select().eq("id", id).single();

  if (!sermon.data) return null;

  return {
    ...sermon.data,
    recordingDate: formatDate(sermon.data?.recordingDate),
  };
};

export const getLatestSermon = async () => {
  const sermon = await supabase
    .from("sermon")
    .select()
    .order("recordingDate", { ascending: false })
    .limit(1)
    .single();

  if (!sermon.data) return null;

  return {
    ...sermon.data,
    recordingDate: formatDate(sermon.data?.recordingDate),
  };
};

export const getSermonsBySeries = async (
  seriesName: string,
  idToExclude: string
) => {
  const sermons = await supabase
    .from("sermon")
    .select()
    .eq("series", seriesName)
    .neq("id", idToExclude)
    .order("recordingDate", { ascending: false });

  return {
    ...sermons,
    data: sermons.data?.map((d) => ({
      ...d,
      recordingDate: formatDate(d.recordingDate),
    })),
  };
};

export type SermonResponse = Awaited<ReturnType<typeof getSermons>>;

export type SermonResponseSuccess = SermonResponse["data"];
export type SermonResponseError = SermonResponse["error"];

export type Sermon = Database["public"]["Tables"]["sermon"]["Row"];
