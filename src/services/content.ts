import { Lesson, allLessons } from "contentlayer/generated";
import { compareAsc } from "date-fns";

export type LessonWithoutBody = Omit<Lesson, "body">;

type LessonLevel = "level-1" | "level-2";

export const getLessons = (lessonLevel: LessonLevel): LessonWithoutBody[] => {
  return allLessons
    .filter((i) => i.level === lessonLevel)
    .sort((a, b) => compareAsc(new Date(a.order), new Date(b.order)))
    .map(({ body, ...rest }) => rest);
};

export const getLesson = (lessonLevel: LessonLevel, slug: string) => {
  return allLessons.find((i) => i.level === lessonLevel && i.slug === slug);
};
