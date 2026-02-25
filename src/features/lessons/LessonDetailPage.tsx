import React, { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useLessons } from "../../hooks/useLessons";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { useToast } from "../../components/ui/ToastProvider";
import lessonsIllustration from "../../assets/lessons-eco.svg";

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lessons, getLessonProgress, markLessonCompleted } = useLessons();
  const { showToast } = useToast();
  const lesson = lessons.find((l) => l.id === id);
  const existingProgress = id ? getLessonProgress(id) : undefined;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittedScore, setSubmittedScore] = useState<number | null>(
    existingProgress?.score ?? null
  );

  if (!lesson) {
    return (
      <section className="space-y-3">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Lesson not found
        </h1>
        <p className="text-sm text-foreground-muted">
          The lesson you were looking for could not be found. It may have been removed or the link
          might be incorrect.
        </p>
      </section>
    );
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let correctCount = 0;
    lesson.quiz.forEach((question) => {
      const selected = answers[question.id];
      const correctOption = question.options.find((opt) => opt.isCorrect);
      if (selected && correctOption && selected === correctOption.id) {
        correctCount += 1;
      }
    });
    const score = Math.round((correctCount / lesson.quiz.length) * 100);
    markLessonCompleted(lesson.id, score);
    setSubmittedScore(score);
    if (score === 100) {
      showToast("Perfect score! You completed this lesson.", "success");
    } else if (score >= 60) {
      showToast("Nice work! You passed this lesson quiz.", "success");
    } else {
      showToast("Keep going. Review the lesson and try the quiz again.", "info");
    }
  };

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              {lesson.title}
            </h1>
            <p className="text-xs text-foreground-muted">{lesson.category}</p>
          </div>
          <Badge variant={existingProgress?.completed ? "success" : "info"}>
            {existingProgress?.completed ? "Completed" : "In progress"}
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-[2fr,1.4fr]">
          <p className="text-sm text-foreground-muted">{lesson.shortDescription}</p>
          <div className="hidden max-w-[220px] justify-self-end md:block">
            <img
              src={lessonsIllustration}
              alt="Illustration of a student reading an eco-focused lesson."
              loading="lazy"
              className="w-full drop-shadow-sm"
            />
          </div>
        </div>
      </header>

      <Card className="space-y-3 text-sm text-foreground-muted">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Reading
        </h2>
        <p>{lesson.content}</p>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Lesson quiz
          </h2>
          <p className="text-xs text-foreground-muted">
            Answer the questions below to check your understanding. Your score is stored with this
            lesson once you submit.
          </p>
          <div className="space-y-4">
            {lesson.quiz.map((question) => (
              <fieldset key={question.id} className="space-y-2">
                <legend className="text-sm font-medium text-slate-900 dark:text-slate-50">
                  {question.question}
                </legend>
                <div className="space-y-1">
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={answers[question.id] === option.id}
                        onChange={() => handleAnswerChange(question.id, option.id)}
                        className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <Button type="submit" className="mt-2">
            Submit quiz
          </Button>
          {submittedScore !== null && (
            <p className="text-xs text-foreground-muted">
              Latest recorded score for this lesson: <strong>{submittedScore}%</strong>.
            </p>
          )}
        </Card>
      </form>
    </section>
  );
};

