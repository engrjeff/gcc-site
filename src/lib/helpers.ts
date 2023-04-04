import { format, parseISO } from "date-fns";

export const formatDate = (dateStr: string) => {
  return format(parseISO(dateStr), "MMMM dd, yyyy");
};

export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
