import type { ReactNode } from "react";
import Image from "next/image";

interface MediaListItemProps {
  index: number;
  title: string;
  subtitle: string;
  subtitle2?: string;
  thumbnail: string;
  trailingText: string;
  trailingIcon: ReactNode;
}

function MediaListItem(props: MediaListItemProps) {
  const {
    index,
    title,
    subtitle,
    subtitle2,
    thumbnail,
    trailingText,
    trailingIcon,
  } = props;

  return (
    <div className='flex md:items-center gap-4 lg:gap-10 px-2 md:px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg group'>
      <span className='text-xl lg:text-2xl font-bold text-gray-300 dark:text-slate-600'>
        {index < 10 ? "0" + (index + 1) : index + 1}
      </span>
      <div className='w-14 h-14 md:w-16 md:h-16 aspect-square relative'>
        <Image
          src={thumbnail}
          alt={title}
          aria-hidden='true'
          fill
          className='object-cover object-center rounded-xl'
        />
      </div>
      <div className='space-y-1 md:space-y-2'>
        <h3 className='font-medium text-sm md:text-base'>{title}</h3>
        <div className='flex md:items-center flex-col md:flex-row text-xs md:text-sm text-gray-500 dark:text-slate-300'>
          <p>{subtitle}</p>
          {subtitle2 ? (
            <>
              <span className='mx-2 hidden md:inline'>&#x2022;</span>
              <p>{subtitle2}</p>
            </>
          ) : null}
        </div>
      </div>
      <span className='hidden text-sm gap-2 lg:inline-flex items-center ml-auto scale-0 opacity-0 transition-all group-hover:opacity-100 group-hover:scale-100'>
        {trailingText} {trailingIcon}
      </span>
    </div>
  );
}

export default MediaListItem;
