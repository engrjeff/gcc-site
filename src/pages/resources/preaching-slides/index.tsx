import React from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import type { GetServerSideProps } from "next";
import ResourcesLayout from "@/components/ResourcesLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/helpers";
import Head from "next/head";
import { getPreachingFolders } from "@/services/gdrive";

interface Props {
  folders: Awaited<ReturnType<typeof getPreachingFolders>>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const folders = await getPreachingFolders();

  return {
    props: {
      folders,
    },
  };
};

const PreachingSlidesPage: NextPageWithLayout<Props> = ({ folders }) => {
  return (
    <>
      <Head>
        <title>Preaching Slides - Grace City Church</title>
      </Head>
      <div className='flex flex-col gap-3 lg:gap-4'>
        {folders?.map((folder, index) => (
          <Link
            key={folder.id}
            href={`/resources/preaching-slides/${folder.id}`}
          >
            <div
              className={cn(
                "flex items-center justify-between px-6 py-4 rounded-lg text-slate-900 hover:border-primary  dark:hover:border-primary dark:text-white border-2 dark:border-slate-800"
              )}
            >
              <div>
                <h2 className='text-xl lg:text-xl font-semibold'>
                  {folder.name}
                </h2>
                <p className='text-sm text-slate-400'>{folder.description}</p>
              </div>
              <ChevronRightIcon className='w-5 h-5' />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

PreachingSlidesPage.getLayout = function getLayout(page) {
  return (
    <ResourcesLayout
      title='GCC Preaching Slides'
      subtitle='Archived Sermon Resources'
    >
      {page}
    </ResourcesLayout>
  );
};

export default PreachingSlidesPage;
