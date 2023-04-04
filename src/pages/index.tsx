import Container from "@/components/Container";
import SermonCard from "@/components/SermonCard";
import { getLatestSermon, getRecentSermons, Sermon } from "@/services/sermons";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  latestSermon: Sermon;
  recentSermons: Sermon[];
}

const HomePage: NextPage<Props> = ({ latestSermon, recentSermons }) => {
  return (
    <>
      <div
        className='w-full h-[60vh] lg:h-[80vh] bg-cover bg-center bg-no-repeat relative overflow-hidden box-content'
        style={{ backgroundImage: `url("${latestSermon.thumbnailUrl}")` }}
      >
        <div className='absolute inset-0 p-4 lg:p-10 bg-black/70'>
          <Container>
            <div className='h-full flex flex-col justify-center'>
              <div className='space-y-4 mb-12'>
                <p className='text-sm uppercase tracking-wider text-slate-300'>
                  {latestSermon.series}
                </p>
                <h1 className='text-5xl lg:text-8xl text-white font-semibold max-w-[20ch]'>
                  {latestSermon.title}
                </h1>
                <p className='text-xs uppercase tracking-wider text-slate-300'>
                  Preached on {latestSermon.recordingDate}
                </p>
              </div>
              <Link
                href={`/resources/${latestSermon.id}`}
                className='inline-flex self-start items-center text-white justify-center gap-4 bg-primary px-8 py-4 font-medium rounded-full hover:bg-indigo-700'
              >
                Listen Now{" "}
                <span className='sr-only'>to {latestSermon.title}</span>
                <span>
                  <ArrowUpRightIcon className='h-5 w-5' />
                </span>
              </Link>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <section className='py-10 md:py-20'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl md:text-3xl font-semibold'>
              Recent Sermons
            </h2>
            <Link href='/resources' className='underline hover:text-primary'>
              See All
            </Link>
          </div>
          <ul className='grid md:grid-cols-3 gap-6 md:gap-8 grid-rows-1'>
            {recentSermons?.map((sermon) => (
              <li key={sermon.id}>
                <Link href={`/resources/${sermon.id}`}>
                  <SermonCard sermon={sermon} />
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
  const latestSermon = await getLatestSermon();
  const recentSermons = await getRecentSermons();

  if (!latestSermon)
    return {
      notFound: true,
    };

  return {
    props: {
      latestSermon,
      recentSermons: recentSermons.data ?? [],
    },
  };
};

export default HomePage;
