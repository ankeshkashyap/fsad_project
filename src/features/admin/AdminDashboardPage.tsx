import React from "react";
import { useLessons } from "../../hooks/useLessons";
import { useProjects } from "../../hooks/useProjects";
import { useResources } from "../../hooks/useResources";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/ui/ProgressBar";
import dashboardIllustration from "../../assets/dashboard-eco.svg";

export const AdminDashboardPage: React.FC = () => {
  const { lessons, progress } = useLessons();
  const { projects, participation } = useProjects();
  const { resources } = useResources();

  const lessonsCompleted = progress.filter((p) => p.completed).length;
  const projectsCompleted = participation.filter((p) => p.status === "completed").length;

  const totalInteractions = lessonsCompleted + projectsCompleted;

  const lessonCompletionRate = lessons.length
    ? Math.round((lessonsCompleted / lessons.length) * 100)
    : 0;
  const projectCompletionRate = projects.length
    ? Math.round((projectsCompleted / projects.length) * 100)
    : 0;

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Admin overview
          </h1>
          <p className="text-sm text-foreground-muted">
            Review learning content, engagement, and completion trends across the platform. All data
            shown here is aggregated from the mock local dataset.
          </p>
        </div>
        <div className="hidden max-w-[220px] flex-shrink-0 sm:block">
          <img
            src={dashboardIllustration}
            alt="Illustration of analytics tiles and sustainability metrics."
            loading="lazy"
            className="w-full drop-shadow-sm"
          />
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="space-y-1">
          <h2 className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            Lessons
          </h2>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {lessons.length}
          </p>
          <p className="text-xs text-foreground-muted">Total published lessons.</p>
        </Card>
        <Card className="space-y-1">
          <h2 className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            Projects
          </h2>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {projects.length}
          </p>
          <p className="text-xs text-foreground-muted">Available sustainability projects.</p>
        </Card>
        <Card className="space-y-1">
          <h2 className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            Resources
          </h2>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {resources.length}
          </p>
          <p className="text-xs text-foreground-muted">Linked articles, PDFs, and websites.</p>
        </Card>
        <Card className="space-y-1">
          <h2 className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            Engagement count
          </h2>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {totalInteractions}
          </p>
          <p className="text-xs text-foreground-muted">
            Sum of completed lessons and projects in this browser.
          </p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Lesson completion rate
          </h2>
          <ProgressBar value={lessonCompletionRate} label="Completed lessons" />
          <p className="text-xs text-foreground-muted">
            This percentage represents how many of the published lessons have been completed at
            least once in this local environment.
          </p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Project completion rate
          </h2>
          <ProgressBar value={projectCompletionRate} label="Completed projects" />
          <p className="text-xs text-foreground-muted">
            This metric increases as students join and complete projects. Use it to gauge how often
            students are turning knowledge into action.
          </p>
        </Card>
      </div>
    </section>
  );
};

