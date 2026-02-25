import React, { FormEvent, useState } from "react";
import { useLessons } from "../../hooks/useLessons";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { LessonCategory } from "../../types/lesson";
import { useToast } from "../../components/ui/ToastProvider";

export const AdminLessonsPage: React.FC = () => {
  const { lessons } = useLessons();
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<LessonCategory>("Renewable Energy");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // In a real backend this would create a lesson. Here we only simulate success.
    setTitle("");
    setShortDescription("");
    setContent("");
    showToast(
      "Lesson saved in the mock admin panel. In a real deployment this would be sent to the backend.",
      "success"
    );
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Manage lessons
        </h1>
        <p className="text-sm text-foreground-muted">
          Review available lessons and use the form to prototype new content before connecting a
          real API.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[3fr,2fr]">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Published lessons
          </h2>
          {lessons.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              No lessons are published yet. Use the editor on the right to draft new content.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-foreground-muted">
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900/60"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-50">
                      {lesson.title}
                    </p>
                    <p className="text-xs">{lesson.shortDescription}</p>
                  </div>
                  <Badge variant="info">{lesson.category}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Draft a new lesson
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              label="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as LessonCategory)}
            >
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Waste Reduction">Waste Reduction</option>
              <option value="Eco-Friendly Lifestyle">Eco-Friendly Lifestyle</option>
            </Select>
            <label className="space-y-1 text-sm text-foreground-muted">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                Short description
              </span>
              <textarea
                rows={2}
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary-500 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="space-y-1 text-sm text-foreground-muted">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                Lesson content
              </span>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary-500 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <Button type="submit">Save draft</Button>
            <p className="text-xs text-foreground-muted">
              This admin panel is wired to local state only. When a backend is connected, this form
              can directly call lesson management APIs.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
};

