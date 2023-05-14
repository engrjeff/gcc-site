import Container from "@/components/Container";
import { getLesson, getLessons } from "@/services/content";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Lesson } from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const LessonPage: NextPage<{ lesson: Lesson }> = ({ lesson }) => {
  const MDXContent = useMDXComponent(lesson.body.code);

  return (
    <Container>
      <Head>
        <title>{lesson.title} - Grace City Church</title>
      </Head>
      <div className='flex gap-2 max-w-prose mt-8 text-sm'>
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
        /
        <Link href='/resources/lessons/level-1' className='hover:underline'>
          Leadership Level 1
        </Link>
      </div>
      <article className='prose dark:prose-invert prose-quoteless prose-blockquote:not-italic prose-a:no-underline hover:prose-a:text-primary mx-auto lg:prose-lg py-8 text-left lg:text-justify'>
        <div>
          <h1 className='mb-0'>{lesson.title}</h1>
          <div className='relative aspect-video w-full rounded-lg'>
            <Image
              src={lesson.bannerImage}
              alt={lesson.title}
              fill
              placeholder='blur'
              blurDataURL={lesson.bannerImage}
              className='w-auto h-auto rounded-lg'
            />
          </div>
        </div>
        <div>
          <MDXContent />
        </div>
      </article>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getLessons("level-1").map((lesson) => ({
      params: {
        slug: lesson.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ lesson: Lesson }> = (context) => {
  const { slug } = context.params as { slug: string };

  const lesson = getLesson("level-1", slug);

  if (!lesson) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      lesson,
    },
  };
};

export default LessonPage;
