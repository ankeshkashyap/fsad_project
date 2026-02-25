import { useEffect, useMemo, useState } from "react";
import { Lesson, LessonProgress, LessonCategory } from "../types/lesson";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { lessonCategories, mockLessons } from "../services/mockData";

const STORAGE_KEY = "sustainable-lessons-progress";

export interface LessonsState {
  lessons: Lesson[];
  progress: LessonProgress[];
  categories: LessonCategory[];
}

export interface UseLessonsResult extends LessonsState {
  markLessonCompleted: (lessonId: string, score: number) => void;
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
}

export const useLessons = (): UseLessonsResult => {
  const [lessons] = useState<Lesson[]>(() => mockLessons);
  const [progress, setProgress] = useState<LessonProgress[]>(() =>
    loadFromStorage<LessonProgress[]>(STORAGE_KEY, [])
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, progress);
  }, [progress]);

  const markLessonCompleted = (lessonId: string, score: number) => {
    setProgress((prev) => {
      const existing = prev.find((p) => p.lessonId === lessonId);
      if (existing) {
        return prev.map((p) =>
          p.lessonId === lessonId ? { ...p, completed: true, score } : p
        );
      }
      return [...prev, { lessonId, completed: true, score }];
    });
  };

  const getLessonProgress = (lessonId: string) =>
    progress.find((p) => p.lessonId === lessonId);

  const categories = useMemo(() => lessonCategories, []);

  return {
    lessons,
    progress,
    categories,
    markLessonCompleted,
    getLessonProgress
  };
};

