import React from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import type { GetServerSideProps } from "next";
import ResourcesLayout from "@/components/ResourcesLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/helpers";
import Head from "next/head";
import { getResourcesFolders } from "@/services/gdrive";

interface Props {
  folders: Awaited<ReturnType<typeof getResourcesFolders>>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const folders = await getResourcesFolders();

  return {
    props: {
      folders,
    },
  };
};

const LessonsPage: NextPageWithLayout<Props> = ({ folders }) => {
  return (
    <>
      <Head>
        <title>Lessons - Grace City Church</title>
      </Head>
      <div className='flex flex-col gap-5'>
        {folders?.map((folder, index) => (
          <Link key={folder.id} href={`/resources/lessons/${folder.id}`}>
            <div
              className={cn(
                "flex items-center justify-between px-6 py-4 rounded-lg text-slate-900 hover:border-primary  dark:hover:border-primary dark:text-white border-2 dark:border-slate-800"
              )}
            >
              <div>
                <h2 className='text-base lg:text-xl font-semibold'>
                  {folder.name}
                </h2>
                <p className='text-xs lg:text-sm text-slate-400'>
                  {folder.description}
                </p>
              </div>
              <ChevronRightIcon className='w-5 h-5' />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

LessonsPage.getLayout = function getLayout(page) {
  return (
    <ResourcesLayout
      title='GCC Lessons'
      subtitle='Lessons for equipping the saints'
    >
      {page}
    </ResourcesLayout>
  );
};

export default LessonsPage;
