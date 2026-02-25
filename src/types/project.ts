export type ProjectStatus = "not-joined" | "in-progress" | "completed";

export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: string;
}

export interface ProjectParticipation {
  projectId: string;
  status: ProjectStatus;
  submittedProof?: string;
  joinedAt: string;
  completedAt?: string;
}

