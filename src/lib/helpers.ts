import { format, parseISO } from "date-fns";

export const formatDate = (dateStr: string) => {
  return format(parseISO(dateStr), "MMM dd, yyyy");
};

export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export function formatToReadableBytes(bytes: number) {
  const formatter = new Intl.NumberFormat(undefined, {
    notation: "compact",
  });

  return formatter.format(bytes) + "B";
}
