import Image from "next/image";
import Link from "next/link";

import { ArrowUpRightIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import Banner from "@/components/Banner";

function SermonsPage() {
  return (
    <div className='dark:bg-coolnavy dark:text-white space-y-10'>
      <Banner />
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='font-semibold text-3xl'>Latest Sermon</h2>
        </div>
        <div className='flex rounded-lg bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-800'>
          <div className='relative w-full h-[240px] overflow-hidden flex-1'>
            <Image
              src='/price-of-servant.png'
              alt='the three stages of redemption cover'
              fill
              className='w-full h-full object-cover rounded-tl-lg rounded-bl-lg'
            />
          </div>
          <div className='w-1/3 p-8 flex flex-col items-start'>
            <h3 className='text-4xl font-bold'>The Price of a Servant</h3>
            <p className='text-sm'>The Three Stages of Redemption</p>
            <button className='flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded mt-auto'>
              Listen now
              <span>
                <PlayCircleIcon className='h-5 w-5' />
              </span>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='font-semibold text-3xl'>Series</h2>
          <Link href='/' className='underline decoration-primary decoration-2'>
            See All
          </Link>
        </div>
        <ul className='grid grid-cols-3 gap-8'>
          {[1, 2, 3].map((series) => (
            <li key={series}>
              <div className='group rounded-lg shadow-md dark:bg-slate-800'>
                <div className='relative aspect-video rounded-tl-lg rounded-tr-lg overflow-hidden'>
                  <Image
                    src='/the-three-stages-of-redemption-cover.png'
                    alt='the three stages of redemption cover'
                    fill
                    className='w-full h-full object-cover rounded-tl-lg rounded-tr-lg'
                  />
                  <div className='text-white absolute inset-0 bg-black/0 flex items-center justify-center group-hover:bg-black/60 transition-colors'>
                    <Link
                      href='/'
                      className='flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded shadow-md translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'
                    >
                      View <ArrowUpRightIcon className='h-4 w-4' />
                    </Link>
                  </div>
                </div>
                <div className='p-4'>
                  <h3
                    aria-hidden='true'
                    className='font-semibold group-hover:text-violet-700'
                  >
                    Series title {series}
                  </h3>
                  <p className='text-slate-700 dark:text-slate-500 text-sm'>
                    3 sermons
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default SermonsPage;
