import AudioPlayer from "@/components/AudioPlayer";
import Container from "@/components/Container";
import MediaListItem from "@/components/MediaListItem";
import { Sermon, getSermonById, getSermonsBySeries } from "@/services/sermons";
import { ArrowDownTrayIcon, PlayIcon } from "@heroicons/react/24/solid";
import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  sermon: Sermon;
  relatedSermonsbySeries: Sermon[];
}

const SermonPage: NextPage<Props> = ({ sermon, relatedSermonsbySeries }) => {
  return (
    <>
      <div
        className='w-full min-h-[400px] bg-cover bg-center bg-no-repeat relative overflow-hidden'
        style={{ backgroundImage: `url("${sermon.thumbnailUrl}")` }}
      >
        <div className='absolute inset-0 p-4 lg:p-10 bg-black/80 h-full'>
          <Container>
            <div className='h-full flex flex-col justify-center'>
              <div className='space-y-4 mb-10'>
                <p className='text-sm uppercase tracking-wider text-slate-300'>
                  {sermon.series}
                </p>
                <h1 className='text-5xl font-semibold max-w-[30ch]'>
                  {sermon.title}
                </h1>
                <p className='text-xs uppercase tracking-wider text-slate-300'>
                  Preached on {sermon.recordingDate}
                </p>
              </div>
              <AudioPlayer key={sermon.id} audioSrc={sermon.audioUrl} />
            </div>
          </Container>
        </div>
      </div>
      {/* RELATED */}
      <Container>
        <section>
          <h2 className='text-2xl font-semibold my-10'>Overview</h2>
          <h3 className='text-xl font-semibold mb-6'>{sermon.title}</h3>
          <p className='uppercase text-slate-300 tracking-wider text-sm mb-3'>
            Description
          </p>
          <p className='mb-6'>
            I will put a short description here so we can provide the listener a
            quick overview of what the message is all about. -jep
          </p>
          <p className='uppercase text-slate-300 tracking-wider text-sm mb-3'>
            Scripture references
          </p>
          <p className='mb-6'>Verse 1:2</p>
          <a
            href={sermon.audioUrl}
            download
            className='inline-flex gap-3 px-4 py-3 rounded-full bg-slate-700 text-sm hover:bg-primary focus:ring focus:ring-primary focus:ring-offset-4 focus:ring-offset-coolnavy'
          >
            Download Sermon{" "}
            <span>
              <ArrowDownTrayIcon className='h-5 w-5' />
            </span>
          </a>
        </section>
        <section>
          <h2 className='text-2xl font-semibold my-10'>
            Sermons under the same series
          </h2>
          <ul className='mb-20'>
            {relatedSermonsbySeries.map((sermon, index) => (
              <li key={sermon.id} className='mb-1'>
                <Link href={`/resources/${sermon.id}`}>
                  <MediaListItem
                    index={index}
                    title={sermon.title}
                    subtitle={sermon.series!}
                    subtitle2={sermon.recordingDate}
                    thumbnail={sermon.thumbnailUrl}
                    trailingIcon={<PlayIcon className='h-5 w-5' />}
                    trailingText='Listen Now'
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.params as { id: string };

  const sermon = await getSermonById(id);

  if (!sermon)
    return {
      notFound: true,
    };

  const { data: relatedSermonsbySeries } = await getSermonsBySeries(
    sermon.series!,
    id
  );

  return {
    props: {
      sermon,
      relatedSermonsbySeries: relatedSermonsbySeries ?? [],
    },
  };
};

export default SermonPage;