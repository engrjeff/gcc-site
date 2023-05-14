import { useState } from "react";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import * as Select from "@radix-ui/react-select";

import { getSermons, SermonResponse } from "@/services/sermons";
import SermonCard from "@/components/SermonCard";
import Tag from "@/components/Tag";
import Search from "@/components/Search";
import Head from "next/head";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/helpers";
import { NextPageWithLayout } from "../_app";
import ResourcesLayout from "@/components/ResourcesLayout";

interface Props {
  sermons: SermonResponse;
  tags: string[];
}

const ResourcesPage: NextPageWithLayout<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  const { data: sermonList } = props.sermons;

  let filteredSermons = sermonList?.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sermonsToDisplay =
    tagFilters.length === 0
      ? filteredSermons
      : filteredSermons?.filter((p) =>
          p.tags.some((t) => tagFilters.includes(t))
        );

  const handleSearch = (q: string) => {
    setTagFilters([]);
    setSearchQuery(q);
  };

  return (
    <>
      <Head>
        <title>Resources - Grace City Church</title>
      </Head>
      <div className='flex items-center my-8'>
        <div className='flex-1'>
          <Search onSearch={handleSearch} query={searchQuery} />
        </div>
        <div className='ml-auto hidden'>
          <Select.Root>
            <Select.Trigger className='w-48 relative flex items-center justify-between gap-3 px-4 py-3 bg-transparent focus:ring-2 border border-gray-300 dark:border-slate-600 dark:focus:border-transparent focus:border-transparent focus:ring-primary rounded-full outline-none capitalize'>
              <Select.Value placeholder='Select a topic' />
              <Select.Icon>
                <ChevronDownIcon className='w-5 h-5' />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                position='popper'
                className='overflow-hidden font-sans w-44 p-1 bg-white dark:bg-slate-900 border rounded shadow-sm border-gray-300 dark:border-slate-600'
              >
                <Select.ScrollUpButton>
                  <ChevronDownIcon className='w-5 h-5 rotate-180' />
                </Select.ScrollUpButton>
                <Select.Viewport className='font-sans'>
                  {props.tags.map((tag) => (
                    <Select.Item
                      key={tag}
                      value={tag}
                      className='p-1 text-base capitalize flex items-center'
                    >
                      <Select.ItemText className='inline-block'>
                        {tag}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
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
    </>
  );
};

ResourcesPage.getLayout = function getLayout(page) {
  return (
    <ResourcesLayout
      title='Sermons'
      subtitle='Biblical, Christ-centered sermons to feed your soul'
    >
      {page}
    </ResourcesLayout>
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
