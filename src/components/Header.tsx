import { BookOpenIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/helpers";
import { appLinks } from "@/lib/constants";

function Header() {
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/" ? router.pathname === href : router.pathname.includes(href);

  return (
    <header className='sticky top-0 left-0 z-20 h-20 w-full bg-coolnavy text-white'>
      <nav className='container max-w-6xl flex h-full items-center'>
        <Link
          href='/'
          className='flex items-center text-xl lg:text-2xl font-semibold'
        >
          <span className='sr-only'>back to home</span>
          <span>
            <BookOpenIcon className='mr-3 h-6 w-6 md:h-8 md:w-8 text-primary' />
          </span>
          GCC Resources<span className='text-primary'>&#x2022;</span>
        </Link>
        <ul className='hidden lg:flex flex-1 items-center justify-center gap-8'>
          {appLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={cn(
                  "text-sm font-medium uppercase tracking-wider transition-colors",
                  isActive(item.path)
                    ? "text-primary hover:text-primary"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
