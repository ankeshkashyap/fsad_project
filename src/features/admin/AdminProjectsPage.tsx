import React, { FormEvent, useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { useToast } from "../../components/ui/ToastProvider";

export const AdminProjectsPage: React.FC = () => {
  const { projects, participation } = useProjects();
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTitle("");
    setDescription("");
    showToast(
      "Project saved in the mock admin panel. Connect a backend to persist this in production.",
      "success"
    );
  };

  const totalParticipants = participation.length;
  const completedProjects = participation.filter((p) => p.status === "completed").length;

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Manage projects
        </h1>
        <p className="text-sm text-foreground-muted">
          Monitor student participation and prototype new sustainability projects.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[3fr,2fr]">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Current projects
          </h2>
          {projects.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              No projects are configured. Use the editor on the right to define future projects.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-foreground-muted">
              {projects.map((project) => {
                const participantsForProject = participation.filter(
                  (p) => p.projectId === project.id
                );
                const completedForProject = participantsForProject.filter(
                  (p) => p.status === "completed"
                );
                return (
                  <li
                    key={project.id}
                    className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-50">
                          {project.title}
                        </p>
                        <p className="text-xs">{project.description}</p>
                      </div>
                      <Badge variant="info">{project.difficulty}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-foreground-muted">
                      Participants in this browser: {participantsForProject.length}, completed:{" "}
                      {completedForProject.length}.
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="text-xs text-foreground-muted">
            Across all projects in this browser: {totalParticipants} total participant record(s) and{" "}
            {completedProjects} completion record(s).
          </p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Prototype a new project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              label="Project title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="space-y-1 text-sm text-foreground-muted">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                Description
              </span>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary-500 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <Button type="submit">Save draft</Button>
            <p className="text-xs text-foreground-muted">
              Approval workflows and backend storage can be connected later without changing this
              page structure.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
};

