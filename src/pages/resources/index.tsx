import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";

import { getSermons, SermonResponse } from "@/services/sermons";
import Container from "@/components/Container";
import SermonCard from "@/components/SermonCard";

interface Props {
  sermons: SermonResponse;
  tags: string[];
}

const ResourcesPage: NextPage<Props> = (props) => {
  const { data: sermonList, error } = props.sermons;

  return (
    <Container>
      <div className='py-10 lg:py-20'>
        <div className='mb-10 space-y-3'>
          <h1 className='text-3xl font-semibold'>Sermons</h1>
          <p className='text-gray-500 dark:text-slate-400'>
            Start listening to sermons by clicking one below
          </p>
        </div>
        <div className='space-y-4 mb-10'>
          <h2 className='mb-2'>Tags</h2>
          <ul className='flex items-center gap-3 flex-wrap'>
            {props.tags.map((tag) => (
              <li key={tag}>
                <div className='flex items-center justify-center bg-gray-200 text-gray-600 dark:text-slate-200 dark:bg-slate-700 py-1 px-2 rounded-full'>
                  <span className='text-xs inline-flex uppercase tracking-wider'>
                    {tag}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ul className='grid md:grid-cols-2 gap-6 md:gap-8'>
          {sermonList?.map((sermon) => (
            <li key={sermon.id}>
              <Link href={`/resources/${sermon.id}`}>
                <SermonCard sermon={sermon} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const sermons = await getSermons();

  const tags = Array.from(new Set(sermons.data?.map((s) => s.tags).flat()));

  return {
    props: {
      sermons,
      tags,
    },
  };
};

export default ResourcesPage;
