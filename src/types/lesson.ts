export type LessonCategory = "Renewable Energy" | "Waste Reduction" | "Eco-Friendly Lifestyle";

export interface LessonQuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  options: LessonQuizOption[];
}

export interface Lesson {
  id: string;
  title: string;
  category: LessonCategory;
  shortDescription: string;
  content: string;
  quiz: LessonQuizQuestion[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
}

