import { Sermon } from "@/services/sermons";
import CardImage from "./CardImage";

const SermonCard = ({ sermon }: { sermon: Sermon }) => {
  return (
    <div className='overflow-hidden h-full flex md:block rounded-lg bg-white border border-gray-300 dark:border-slate-800 dark:bg-coolnavy dark:shadow group'>
      <div className='w-[100px] md:w-auto'>
        <CardImage src={sermon.thumbnailUrl} alt={sermon.title} />
      </div>
      <div className='p-4 md:p-6 flex-1'>
        <div>
          <h2 className='font-medium mb-2 group-hover:text-primary line-clamp-1'>
            {sermon.title}
          </h2>
          <p className='text-xs text-gray-500 dark:text-slate-300 mb-1 line-clamp-1'>
            {sermon.series}
          </p>
          <p className='text-xs text-gray-500 dark:text-slate-300'>
            {sermon.recordingDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SermonCard;
