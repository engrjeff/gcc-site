import Image from "next/image";

import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

function ResourcesPage() {
  return (
    <>
      <section className='bg-[url(/resources-banner.png)] bg-no-repeat bg-cover bg-center'>
        <div className='p-16 text-white container'>
          <h1 className='text-8xl font-bold'>GCC Resources</h1>
          <p className='text-2xl font-light'>
            Biblical resources to feed and equip the saints
          </p>
        </div>
      </section>
      <section className='container py-16'>
        <h2 className='text-3xl font-semibold text-slate-900 mb-10'>
          Sermon Series
        </h2>
        <div className='grid grid-cols-4 gap-6'>
          {[1, 2, 3, 4].map((series) => (
            <div key={series} className='border rounded-lg overflow-hidden'>
              <div className='aspect-video w-full relative'>
                <Image
                  src='/the-three-stages-of-redemption-cover.png'
                  alt='cover'
                  fill
                  className='rounded-t-lg'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold text-slate-gray mb-4'>
                  The Three Stages of Redemption
                </h3>
                <button className='flex items-center rounded bg-slate-900 gap-3 text-white px-3 py-2 shadow-lg transition-colors hover:bg-orange-500 focus:shadow-sm'>
                  View <ArrowLongRightIcon className='h-5 w-5' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ResourcesPage;
