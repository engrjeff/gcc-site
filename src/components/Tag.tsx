import { cn } from "@/lib/helpers";

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
        "flex items-center justify-center bg-gray-200 text-gray-600 dark:text-slate-200 dark:bg-slate-700 py-2 px-2.5 rounded-full",
        selected
          ? "bg-primary text-white dark:text-white dark:bg-primary"
          : "bg-gray-200 text-gray-600 dark:text-slate-200 dark:bg-slate-700 hover:bg-primary dark:hover:bg-primary",
        clickable && !selected
          ? "hover:bg-gray-300 dark:hover:bg-slate-600"
          : ""
      )}
    >
      <span className='text-xs inline-flex uppercase tracking-wider'>
        {tag}
      </span>
    </div>
  );
};

export default Tag;
