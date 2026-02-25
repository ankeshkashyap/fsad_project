import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLessons } from "../../hooks/useLessons";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import lessonsIllustration from "../../assets/lessons-eco.svg";

export const LessonsListPage: React.FC = () => {
  const { lessons, progress, categories } = useLessons();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = lessons.filter((lesson) => {
    const matchesCategory = category === "All" || lesson.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      lesson.title.toLowerCase().includes(query) ||
      lesson.shortDescription.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Lessons library
          </h1>
          <p className="text-sm text-foreground-muted">
            Learn about renewable energy, waste reduction, and eco-friendly lifestyle habits.
          </p>
        </div>
        <div className="hidden max-w-[220px] flex-shrink-0 sm:block">
          <img
            src={lessonsIllustration}
            alt="Illustration of eco-themed lesson cards and progress."
            loading="lazy"
            className="w-full drop-shadow-sm"
          />
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
        <div className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Input
                label="Search lessons"
                placeholder="Search by topic or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <Card className="text-sm text-foreground-muted">
              No lessons match your search and filter. Try clearing your filters or searching for a
              different topic.
            </Card>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {filtered.map((lesson) => {
                const lessonProgress = progress.find((p) => p.lessonId === lesson.id);
                const isCompleted = lessonProgress?.completed;
                return (
                  <Card key={lesson.id} className="flex flex-col justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                          {lesson.title}
                        </h2>
                        <Badge variant={isCompleted ? "success" : "info"}>
                          {isCompleted ? "Completed" : "Not started"}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground-muted">{lesson.shortDescription}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-foreground-muted">
                      <span>{lesson.category}</span>
                      <Link
                        to={`/lessons/${lesson.id}`}
                        className="font-medium text-primary-700 hover:underline dark:text-primary-300"
                      >
                        View lesson
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
        <Card className="space-y-3 text-sm text-foreground-muted">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            How lessons work
          </h2>
          <p>
            Each lesson includes concise reading material and a short multiple-choice quiz. You earn
            progress when you complete the quiz, and your score contributes to your sustainability
            score.
          </p>
          <p>
            You can revisit any lesson at any time to review the content or reattempt the quiz. Your
            highest score is stored locally in your browser.
          </p>
        </Card>
      </div>
    </section>
  );
};

