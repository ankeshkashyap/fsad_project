import React from "react";
import { useLessons } from "../../hooks/useLessons";
import { useProjects } from "../../hooks/useProjects";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/ui/ProgressBar";

const calculateSustainabilityScore = (lessonsCompleted: number, projectsCompleted: number) =>
  lessonsCompleted * 10 + projectsCompleted * 25;

export const ProgressPage: React.FC = () => {
  const { lessons, progress } = useLessons();
  const { projects, participation } = useProjects();

  const lessonsCompleted = progress.filter((p) => p.completed).length;
  const projectsCompleted = participation.filter((p) => p.status === "completed").length;
  const totalLessons = lessons.length;
  const totalProjects = projects.length;

  const score = calculateSustainabilityScore(lessonsCompleted, projectsCompleted);

  const overallPercent =
    totalLessons + totalProjects === 0
      ? 0
      : Math.round(
          ((lessonsCompleted + projectsCompleted) / (totalLessons + totalProjects)) * 100
        );

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Progress tracker
        </h1>
        <p className="text-sm text-foreground-muted">
          Review your completed lessons and projects, and reflect on how your habits are changing.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Overall progress
          </h2>
          <ProgressBar value={overallPercent} label="Combined completion" />
          <p className="text-xs text-foreground-muted">
            You have completed {lessonsCompleted} lesson(s) and {projectsCompleted} project(s).
          </p>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Sustainability score
          </h2>
          <p className="text-3xl font-semibold text-primary-700 dark:text-primary-300">
            {score}
          </p>
          <p className="text-xs text-foreground-muted">
            Every lesson and project you complete increases this score and represents real-world
            impact.
          </p>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Reflection prompt
          </h2>
          <p className="text-xs text-foreground-muted">
            Think of one habit that has changed because of this platform. How has it affected your
            home, school, or community?
          </p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Lesson progress
          </h2>
          {lessons.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              Lessons are not available yet. Once lessons are published, you will see detailed
              progress here.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-foreground-muted">
              {lessons.map((lesson) => {
                const lessonProgress = progress.find((p) => p.lessonId === lesson.id);
                return (
                  <li
                    key={lesson.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900/60"
                  >
                    <span>{lesson.title}</span>
                    <span className="text-xs">
                      {lessonProgress?.completed
                        ? `Completed (${lessonProgress.score}%)`
                        : "Not completed"}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Project progress
          </h2>
          {projects.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              Projects are not available yet. Once projects are published, you will see detailed
              progress here.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-foreground-muted">
              {projects.map((project) => {
                const projectParticipation = participation.find(
                  (p) => p.projectId === project.id
                );
                return (
                  <li
                    key={project.id}
                    className="flex flex-col gap-1 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900/60"
                  >
                    <span>{project.title}</span>
                    <span className="text-xs">
                      {projectParticipation?.status === "completed"
                        ? "Completed"
                        : projectParticipation?.status === "in-progress"
                        ? "In progress"
                        : "Not started"}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </section>
  );
};

