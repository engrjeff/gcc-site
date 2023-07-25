import Link from "next/link";

import { appLinks } from "@/lib/constants";
import {
  HomeIcon,
  BookOpenIcon,
  HeartIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import { cn } from "@/lib/helpers";

const iconMap: Record<string, ReactNode> = {
  Home: <HomeIcon className='h-5 w-5' />,
  Resources: <BookOpenIcon className='h-5 w-5' />,
  Gospel: <HeartIcon className='h-5 w-5' />,
  About: <InformationCircleIcon className='h-5 w-5' />,
};

function MobileMenu() {
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/" ? router.pathname === href : router.pathname.includes(href);

  return (
    <nav className='h-14 w-full dark:bg-coolnavy bg-white fixed bottom-0 left-0 z-10 shadow-md border-t border-gray-200 dark:border-slate-800 md:hidden'>
      <ul className='flex'>
        {appLinks.map((linkItem) => (
          <li key={linkItem.label} className='flex-1'>
            <Link
              href={linkItem.path}
              className={cn(
                "flex flex-col items-center justify-center h-full min-w-[80px] px-3 pt-2 pb-3",
                isActive(linkItem.path)
                  ? "dark:text-indigo-400 text-primary"
                  : "dark:text-slate-400 text-gray-500"
              )}
            >
              <span>{iconMap[linkItem.label]}</span>
              <span className='text-xs'>{linkItem.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MobileMenu;
