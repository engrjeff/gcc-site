import { Sermon } from "@/services/sermons";
import CardImage from "./CardImage";

const SermonCard = ({ sermon }: { sermon: Sermon }) => {
  return (
    <div className='overflow-hidden rounded-lg bg-white border border-gray-300 dark:border-slate-800 dark:bg-slate-800 dark:shadow group'>
      <CardImage src={sermon.thumbnailUrl} alt={sermon.title} />
      <div className='p-4 md:p-6'>
        <div>
          <h2 className='font-medium mb-2 group-hover:text-primary'>
            {sermon.title}
          </h2>
          <p className='text-xs text-gray-500 dark:text-slate-300 mb-1'>
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
