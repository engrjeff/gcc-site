import React from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import ResourcesLayout from "@/components/ResourcesLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/helpers";
import Head from "next/head";

const links = [
  {
    path: "/resources/lessons/level-1",
    title: "Leadership Level 1",
    subtitle: "Essential doctrines",
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    path: "/resources/lessons/level-2",
    title: "Leadership Level 2",
    subtitle: "Cell leadership and discipleship",
    gradient: "bg-gradient-to-r from-sky-500 to-indigo-500",
  },
];

const LessonsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Lessons - Grace City Church</title>
      </Head>
      <div className='flex flex-col gap-5'>
        {links.map((item, index) => (
          <Link
            key={item.path}
            href={item.path}
            className={index === 1 ? "pointer-events-none opacity-40" : ""}
          >
            <div
              className={cn(
                "flex items-center justify-between p-4 lg:p-6 rounded-lg text-white hover:underline",
                item.gradient
              )}
            >
              <div>
                <h2 className='text-xl lg:text-2xl font-semibold'>
                  {item.title}
                </h2>
                <p className='text-sm'>{item.subtitle}</p>
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
      subtitle='Lessons for soul-winning and discipleship'
    >
      {page}
    </ResourcesLayout>
  );
};

export default LessonsPage;
