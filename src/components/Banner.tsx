import Image from "next/image";

function Banner() {
  return (
    <div className='h-80 w-full relative text-white overflow-hidden rounded-lg'>
      <Image
        src='/resources-banner.png'
        alt='grace city church resources'
        fill
        className='w-full h-full object-cover rounded-lg shadow'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 flex flex-col justify-end p-10'>
        <h1 className='text-6xl font-bold'>Sermons</h1>
        <p>
          Christ-centered, Spirit-led, God-exalting sermons to feed your soul.
        </p>
      </div>
    </div>
  );
}

export default Banner;
