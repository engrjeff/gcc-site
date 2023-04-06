import { cn } from "@/lib/helpers";
import { CheckIcon } from "@heroicons/react/24/outline";

const Tag = ({
  tag,
  clickable,
  selected,
}: {
  tag: string;
  clickable?: boolean;
  selected?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center py-2 px-2.5 rounded-full",
        selected
          ? "bg-primary text-white dark:text-white dark:bg-primary"
          : "bg-gray-200 text-gray-600 dark:text-slate-200 dark:bg-slate-700"
      )}
    >
      <span className='text-xs inline-flex items-center uppercase tracking-wider'>
        {selected ? <CheckIcon className='h-4 w-4 mr-1' /> : null} {tag}
      </span>
    </div>
  );
};

export default Tag;
