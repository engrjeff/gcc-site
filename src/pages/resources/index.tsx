import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";

import CardImage from "@/components/CardImage";
import { getSermons, SermonResponse } from "@/services/sermons";
import Container from "@/components/Container";

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
          <p className='text-slate-400'>
            Start listening to sermons by clicking one below
          </p>
        </div>
        <div className='space-y-4 mb-10'>
          <h2 className='mb-2'>Tags</h2>
          <ul className='flex items-center gap-3 flex-wrap'>
            {props.tags.map((tag) => (
              <li key={tag}>
                <div className='flex items-center justify-center bg-slate-700 text-slate-200 py-1 px-2 rounded-full'>
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
                <div className='overflow-hidden rounded-lg bg-slate-800 shadow group'>
                  <CardImage src={sermon.thumbnailUrl} alt={sermon.title} />
                  <div className='p-4 md:p-6'>
                    <div>
                      <h2 className='font-medium mb-2 group-hover:text-primary'>
                        {sermon.title}
                      </h2>
                      <p className='text-xs text-slate-300 mb-1 italic'>
                        {sermon.series}
                      </p>
                      <p className='text-xs text-slate-300'>
                        {sermon.recordingDate}
                      </p>
                    </div>
                  </div>
                </div>
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
