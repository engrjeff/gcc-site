import { useState } from "react";
import Link from "next/link";
import type { NextPage, GetServerSideProps } from "next";

import { getSermons, SermonResponse } from "@/services/sermons";
import Container from "@/components/Container";
import SermonCard from "@/components/SermonCard";
import Tag from "@/components/Tag";
import Search from "@/components/Search";
import Head from "next/head";

interface Props {
  sermons: SermonResponse;
  tags: string[];
}

const ResourcesPage: NextPage<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  const { data: sermonList, error } = props.sermons;

  let filteredSermons = sermonList?.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sermonsToDisplay =
    tagFilters.length === 0
      ? filteredSermons
      : filteredSermons?.filter((p) =>
          p.tags.some((t) => tagFilters.includes(t))
        );

  const handleTagClick = (tag: string) => {
    setTagFilters((old) =>
      old.includes(tag) ? old.filter((t) => t !== tag) : [...old, tag]
    );
  };

  const handleSearch = (q: string) => {
    setTagFilters([]);
    setSearchQuery(q);
  };

  return (
    <Container>
      <Head>
        <title>Grace City Church - Resources</title>
      </Head>
      <div className='py-10 lg:py-20'>
        <div className='mb-10 space-y-3'>
          <h1 className='text-3xl font-semibold'>Sermons</h1>
          <p className='text-gray-500 dark:text-slate-400'>
            Start listening to sermons by clicking one below
          </p>
        </div>
        <div>
          <Search onSearch={handleSearch} query={searchQuery} />
        </div>
        <div className='space-y-4 mb-10'>
          <h2 className='mb-2'>Tags</h2>
          <ul className='flex items-center gap-2 flex-wrap'>
            {props.tags.map((tag) => (
              <li key={tag}>
                <button onClick={() => handleTagClick(tag)}>
                  <Tag
                    tag={tag}
                    clickable
                    selected={tagFilters.includes(tag)}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {!sermonsToDisplay?.length && Boolean(searchQuery) && (
          <p>No results found for `{searchQuery}`.</p>
        )}
        <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {sermonsToDisplay?.map((sermon) => (
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
