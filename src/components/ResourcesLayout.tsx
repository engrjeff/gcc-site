import type { ReactNode, ComponentProps, MouseEventHandler } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "./Container";
import { cn } from "@/lib/helpers";

interface ResourcesLayoutProps {
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
}

const LESSONS_KEY = "lessons-password";
const LESSONS_PASS = "gccadmin";

const SubLink = (props: ComponentProps<typeof Link>) => {
  const router = useRouter();

  const isActive = props.href === router.pathname;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (localStorage.getItem(LESSONS_KEY) === LESSONS_PASS) {
      // means OK
      return;
    }

    if (props.href.toString().includes("lessons")) {
      e.preventDefault();

      // show prompt
      const password = prompt(
        "This page if for primary leaders only. If you are a primary leader, kindly enter the password to access this page.",
        ""
      );

      if (password === LESSONS_PASS) {
        // save "session"
        localStorage.setItem(LESSONS_KEY, password);
        router.push("/resources/lessons");
      }
    }
  };

  return (
    <Link
      {...props}
      className={cn(
        "text-sm font-medium  transition-colors",
        isActive
          ? "text-primary hover:text-primary"
          : "text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-white"
      )}
    />
  );
};

function ResourcesLayout({ title, subtitle, children }: ResourcesLayoutProps) {
  return (
    <Container>
      <div className='py-6'>
        <div className='pb-6 space-x-6 border-b border-gray-200 dark:border-slate-800 mb-6'>
          <SubLink href='/resources'>Sermons</SubLink>
          <SubLink href='/resources/lessons'>Lessons</SubLink>
          <SubLink href='/resources/preaching-slides'>Preaching Slides</SubLink>
        </div>
        <div className='mb-6 lg:mb-8 space-y-2 lg:space-y-3'>
          <h1 className='text-xl lg:text-3xl font-semibold'>{title}</h1>
          <p className='text-gray-500 dark:text-slate-400 text-sm lg:text-base'>
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </Container>
  );
}

export default ResourcesLayout;
