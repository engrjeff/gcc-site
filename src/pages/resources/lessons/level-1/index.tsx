import {
  type InferGetStaticPropsType,
  type GetStaticProps,
  type NextPage,
} from "next";
import { type LessonWithoutBody, getLessons } from "@/services/content";
import Link from "next/link";
import Container from "@/components/Container";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/helpers";
import Head from "next/head";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const LeadershipLevelOnePage: NextPage<PageProps> = ({ lessons }) => {
  return (
    <Container>
      <Head>
        <title>Leadership Level 1 - Grace City Church</title>
      </Head>
      <div className='py-6'>
        <div className='flex gap-2 max-w-prose mb-4 text-sm'>
          <Link
            href='/resources'
            className='flex gap-2 items-center hover:underline'
          >
            <BookOpenIcon className='h-4 w-4' /> Resources
          </Link>
          /
          <Link href='/resources/lessons' className='hover:underline'>
            Lessons
          </Link>
        </div>
        <div className='mb-8 space-y-3'>
          <h1 className='text-3xl font-semibold'>Leadership Level 1</h1>
          <p className='text-gray-500 dark:text-slate-400'>
            Essential Truths and Doctrines
          </p>
        </div>
        <div className='flex flex-col gap-3'>
          {lessons.map((lesson, index) => (
            <Link
              key={lesson._id}
              href={lesson.url}
              className={cn(
                "flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-800 hover:bg-primary dark:hover:text-white dark:hover:bg-primary hover:text-white rounded-md transition-colors",
                index > 0 ? "pointer-events-none opacity-40" : ""
              )}
            >
              <span className='line-clamp-1'>
                {index + 1} - {lesson.title}
              </span>
              <ChevronRightIcon className='h-4 w-4' />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<{
  lessons: LessonWithoutBody[];
}> = () => {
  const lessons = getLessons("level-1");

  return {
    props: {
      lessons,
    },
  };
};
export default LeadershipLevelOnePage;
