import Image from "next/image";
import Link from "next/link";

import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

function Home() {
  return (
    <>
      <div className='bg-[url(/hero-banner.png)] bg-cover bg-no-repeat bg-top relative z-10'>
        <div className='absolute inset-0 w-full h-full bg-black bg-opacity-60 -z-10'></div>
        <div className='container py-20 space-y-16'>
          <div className='text-white space-y-5'>
            <h1 className='text-8xl font-bold my-10'>Grace City Church</h1>
            <p className='text-5xl'>Making Disciples of All Nations.</p>
            <p className='text-5xl'>Proclaiming the Gospel.</p>
            <p className='text-5xl'>Equipping the saints.</p>
          </div>
          <div className='space-x-6 pb-10'>
            <button className='text-lg font-medium rounded bg-orange-600 text-white px-8 py-4 shadow-lg transition-colors hover:bg-orange-500 focus:shadow-sm'>
              Worship with us
            </button>
            <button className='text-lg font-medium rounded border border-white text-white px-8 py-4 shadow-lg transition-colors hover:bg-orange-600 hover:border-orange-600 focus:shadow-sm'>
              Explore our Resources
            </button>
          </div>
        </div>
      </div>
      <section className='bg-gradient-to-r from-slate-800 to-slate-900'>
        <div className='container flex flex-col gap-10 items-center justify-center py-10'>
          <Image
            src='/gcc_logo.svg'
            alt='gcc logo'
            width={100}
            height={100}
            className='w-[100px] h-[100px]'
          />
          <div className='prose prose-xl text-white text-center'>
            <p>
              Grace City Church is a Christ-centered, biblical, soul-winning,
              and disciple-making church!
            </p>
            <p>We are glad that you found us!</p>
          </div>
        </div>
      </section>
      <section className=' py-16 bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-8 text-slate-800'>
        <p className='prose prose-lg text-center'>
          We are convicted and committed to do the Great Commission of the Lord
          Jesus Christ until He comes again
        </p>
        <span className='font-serif border-gray-900  border w-12 h-12 rounded-full inline-flex items-center justify-center text-5xl leading-3 pt-6'>
          &rdquo;
        </span>
        <blockquote className='container text-2xl font-semibold max-w-[60%] text-center'>
          Go therefore and make disciples of all the nations, baptizing them in
          the name of the Father and of the Son and of the Holy Spirit, teaching
          them to observe all things that I have commanded you; and lo, I am
          with you always, even to the end of the age.
        </blockquote>
        <span className='block text-lg'>- Matthew 28:19-20</span>
      </section>
      <section className='container py-16'>
        <div className='flex items-center justify-between mb-10'>
          <h2 className='text-3xl font-bold text-slate-900'>Latest Sermon</h2>
          <Link
            href='/resources'
            className='font-medium text-slate-900 hover:text-sky-500'
          >
            View All Sermons
          </Link>
        </div>
        <div className='flex gap-10'>
          <div className='aspect-video relative flex-1'>
            <Image
              fill
              src='/price-of-servant.png'
              alt='the price of a servant sermon banner'
              className='rounded-xl object-cover'
            />
            <Link
              href='/resources'
              className='absolute flex items-center gap-4 group bg-white text-slate-900 bottom-6 right-6 rounded font-medium px-6 py-3'
            >
              Listen now{" "}
              <span className='sr-only'>to the price of a servant sermon</span>
              <span className='transition-transform group-hover:translate-x-1'>
                <ArrowLongRightIcon className='h-5 w-5' />
              </span>
            </Link>
          </div>
          <div className='flex-1 bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-8 text-slate-800'>
            <span className='font-serif border-gray-900  border w-12 h-12 rounded-full inline-flex items-center justify-center text-5xl leading-3 pt-6'>
              &rdquo;
            </span>
            <blockquote className='text-2xl font-semibold max-w-[80%] text-center'>
              The only way for you to serve the brethren is to be affected by
              the finished work of Christ.
            </blockquote>
            <span className='block text-lg'>- Pastor John De Guzman</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
