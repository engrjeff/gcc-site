import Container from "@/components/Container";
import { getLatestSermon, Sermon } from "@/services/sermons";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  latestSermon: Sermon;
}

const HomePage: NextPage<Props> = ({ latestSermon }) => {
  return (
    <>
      <div
        className='w-full h-[60vh] lg:h-[80vh] bg-cover bg-center bg-no-repeat relative overflow-hidden'
        style={{ backgroundImage: `url("${latestSermon.thumbnailUrl}")` }}
      >
        <div className='absolute inset-0 p-6 lg:p-10 bg-black/80'>
          <Container>
            <div className='h-full flex flex-col justify-center'>
              <div className='space-y-4 mb-12'>
                <p className='text-sm uppercase tracking-wider text-slate-300'>
                  {latestSermon.series}
                </p>
                <h1 className='text-6xl lg:text-7xl font-semibold max-w-[20ch]'>
                  {latestSermon.title}
                </h1>
                <p className='text-xs uppercase tracking-wider text-slate-300'>
                  Preached on {latestSermon.recordingDate}
                </p>
              </div>
              <Link
                href={`/resources/${latestSermon.id}`}
                className='inline-flex self-start items-center justify-center bg-primary px-8 py-4 font-medium rounded-full hover:bg-indigo-600'
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const latestSermon = await getLatestSermon();

  if (!latestSermon)
    return {
      notFound: true,
    };

  return {
    props: {
      latestSermon,
    },
  };
};

export default HomePage;
