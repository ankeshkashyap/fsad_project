import React, { FormEvent, useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/ToastProvider";
import projectsIllustration from "../../assets/projects-eco.svg";

export const ProjectsPage: React.FC = () => {
  const { projects, participation, joinProject, submitProjectProof, getParticipationFor } =
    useProjects();
  const { showToast } = useToast();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [proofText, setProofText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoin = (projectId: string) => {
    joinProject(projectId);
    showToast("Project added to your sustainability journey.", "success");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!activeProjectId || !proofText.trim()) return;
    setIsSubmitting(true);
    submitProjectProof(activeProjectId, proofText.trim());
    setProofText("");
    setIsSubmitting(false);
    showToast("Thank you for completing this project and sharing your reflection.", "success");
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Sustainability projects
          </h1>
          <p className="text-sm text-foreground-muted">
            Choose a project that fits your context, complete the activities, and log your impact.
          </p>
        </div>
        <div className="hidden max-w-[220px] flex-shrink-0 sm:block">
          <img
            src={projectsIllustration}
            alt="Illustration of eco projects and progress towards completion."
            loading="lazy"
            className="w-full drop-shadow-sm"
          />
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr,3fr]">
        <Card className="space-y-3 text-sm text-foreground-muted">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            How project tracking works
          </h2>
          <p>
            When you join a project, it is marked as in progress. Once you finish the activities,
            submit a short reflection as proof of completion. Your completed projects increase your
            sustainability score.
          </p>
          <p>
            You can work on multiple projects at the same time. Use the reflection space to capture
            what you tried, what worked, and what you would change next time.
          </p>
        </Card>
        <div className="space-y-3">
          {projects.map((project) => {
            const projectParticipation = getParticipationFor(project.id);
            const status = projectParticipation?.status ?? "not-joined";
            const isCompleted = status === "completed";
            return (
              <Card key={project.id} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {project.title}
                    </h2>
                    <p className="text-xs text-foreground-muted">{project.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="info">{project.difficulty}</Badge>
                    <span className="text-xs text-foreground-muted">
                      ~{project.estimatedDuration}
                    </span>
                    <Badge variant={isCompleted ? "success" : "info"}>
                      {status === "not-joined"
                        ? "Not joined"
                        : status === "in-progress"
                        ? "In progress"
                        : "Completed"}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-foreground-muted">
                  Impact: {project.impact}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={status !== "not-joined"}
                    onClick={() => handleJoin(project.id)}
                  >
                    {status === "not-joined" ? "Join project" : "Already joined"}
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      setActiveProjectId(project.id);
                      setProofText(
                        projectParticipation?.submittedProof
                          ? projectParticipation.submittedProof
                          : ""
                      );
                    }}
                  >
                    {isCompleted ? "Update reflection" : "Submit completion proof"}
                  </Button>
                </div>
                {participation.length > 0 && projectParticipation?.submittedProof && (
                  <div className="rounded-xl bg-slate-50 p-3 text-xs text-foreground-muted dark:bg-slate-900/60">
                    <p className="font-medium text-slate-800 dark:text-slate-50">
                      Your latest reflection
                    </p>
                    <p>{projectParticipation.submittedProof}</p>
                  </div>
                )}
              </Card>
            );
          })}

          {activeProjectId && (
            <Card className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Reflect on your project
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <label className="space-y-1 text-sm text-foreground-muted">
                  <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    What did you do and what did you learn?
                  </span>
                  <textarea
                    rows={4}
                    required
                    value={proofText}
                    onChange={(e) => setProofText(e.target.value)}
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary-500 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving reflection..." : "Save reflection and mark complete"}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

