import React from "react";
import { useLessons } from "../../hooks/useLessons";
import { useProjects } from "../../hooks/useProjects";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Badge } from "../../components/ui/Badge";
import { Link } from "react-router-dom";
import dashboardIllustration from "../../assets/dashboard-eco.svg";

const calculateSustainabilityScore = (lessonsCompleted: number, projectsCompleted: number) =>
  lessonsCompleted * 10 + projectsCompleted * 25;

const getBadges = (score: number): string[] => {
  const badges: string[] = [];
  if (score >= 25) badges.push("Eco Explorer");
  if (score >= 50) badges.push("Habit Builder");
  if (score >= 100) badges.push("Community Champion");
  return badges;
};

export const UserDashboard: React.FC = () => {
  const { lessons, progress } = useLessons();
  const { projects, participation } = useProjects();

  const lessonsCompleted = progress.filter((p) => p.completed).length;
  const projectsCompleted = participation.filter((p) => p.status === "completed").length;
  const totalLessons = lessons.length;
  const totalProjects = projects.length;

  const score = calculateSustainabilityScore(lessonsCompleted, projectsCompleted);
  const lessonCompletionPercent = totalLessons
    ? Math.round((lessonsCompleted / totalLessons) * 100)
    : 0;
  const projectCompletionPercent = totalProjects
    ? Math.round((projectsCompleted / totalProjects) * 100)
    : 0;

  const badges = getBadges(score);

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Your sustainability dashboard
          </h1>
          <p className="text-sm text-foreground-muted">
            Track your learning progress, eco-projects, and overall sustainability score.
          </p>
        </div>
        <div className="hidden max-w-[220px] flex-shrink-0 sm:block">
          <img
            src={dashboardIllustration}
            alt="Stylised dashboard showing progress on sustainability goals."
            loading="lazy"
            className="w-full drop-shadow-sm"
          />
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Sustainability score
          </h2>
          <p className="text-3xl font-semibold text-primary-700 dark:text-primary-300">
            {score}
          </p>
          <p className="text-xs text-foreground-muted">
            Score formula: lessons × 10 + projects × 25.
          </p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Learning progress
          </h2>
          <p className="text-sm text-foreground-muted">
            {lessonsCompleted} of {totalLessons} lessons completed.
          </p>
          <ProgressBar value={lessonCompletionPercent} label="Lesson completion" />
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Project progress
          </h2>
          <p className="text-sm text-foreground-muted">
            {projectsCompleted} of {totalProjects} projects completed.
          </p>
          <ProgressBar value={projectCompletionPercent} label="Project completion" />
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr,3fr]">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Eco goals checklist
          </h2>
          <ul className="space-y-2 text-sm text-foreground-muted">
            <li>
              <span className="mr-2">▪</span>Complete at least one lesson in each category.
            </li>
            <li>
              <span className="mr-2">▪</span>Finish one sustainability project this month.
            </li>
            <li>
              <span className="mr-2">▪</span>Share one habit change with a friend or family member.
            </li>
          </ul>
          <p className="text-xs text-foreground-muted">
            As you complete lessons and projects, your score and progress indicators update
            automatically.
          </p>
        </Card>
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Suggested next steps
            </h2>
            <Badge variant="info">Guided path</Badge>
          </div>
          <ul className="space-y-2 text-sm text-foreground-muted">
            <li>
              <span className="font-medium text-slate-800 dark:text-slate-50">
                1. Deepen your knowledge
              </span>{" "}
              – Explore{" "}
              <Link to="/lessons" className="text-primary-700 dark:text-primary-300">
                the lessons library
              </Link>{" "}
              and pick a topic you have not completed yet.
            </li>
            <li>
              <span className="font-medium text-slate-800 dark:text-slate-50">
                2. Apply what you know
              </span>{" "}
              – Choose a project from{" "}
              <Link to="/projects" className="text-primary-700 dark:text-primary-300">
                the project hub
              </Link>{" "}
              that fits your home or school.
            </li>
            <li>
              <span className="font-medium text-slate-800 dark:text-slate-50">
                3. Share and reflect
              </span>{" "}
              – Use{" "}
              <Link to="/progress" className="text-primary-700 dark:text-primary-300">
                the progress tracker
              </Link>{" "}
              to reflect on changes and celebrate milestones.
            </li>
          </ul>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
              Badges
            </h3>
            {badges.length === 0 ? (
              <p className="text-xs text-foreground-muted">
                Complete your first lesson or project to unlock your first badge.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge key={badge} variant="success">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

