import { useEffect, useState } from "react";
import { Project, ProjectParticipation } from "../types/project";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { mockProjects } from "../services/mockData";

const STORAGE_KEY = "sustainable-projects-participation";

export interface UseProjectsResult {
  projects: Project[];
  participation: ProjectParticipation[];
  joinProject: (projectId: string) => void;
  submitProjectProof: (projectId: string, content: string) => void;
  getParticipationFor: (projectId: string) => ProjectParticipation | undefined;
}

export const useProjects = (): UseProjectsResult => {
  const [projects] = useState<Project[]>(() => mockProjects);
  const [participation, setParticipation] = useState<ProjectParticipation[]>(() =>
    loadFromStorage<ProjectParticipation[]>(STORAGE_KEY, [])
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, participation);
  }, [participation]);

  const joinProject = (projectId: string) => {
    setParticipation((prev) => {
      const existing = prev.find((p) => p.projectId === projectId);
      if (existing) return prev;
      return [
        ...prev,
        {
          projectId,
          status: "in-progress",
          joinedAt: new Date().toISOString()
        }
      ];
    });
  };

  const submitProjectProof = (projectId: string, content: string) => {
    setParticipation((prev) => {
      const existing = prev.find((p) => p.projectId === projectId);
      if (!existing) {
        return [
          ...prev,
          {
            projectId,
            status: "completed",
            submittedProof: content,
            joinedAt: new Date().toISOString(),
            completedAt: new Date().toISOString()
          }
        ];
      }
      return prev.map((p) =>
        p.projectId === projectId
          ? {
              ...p,
              status: "completed",
              submittedProof: content,
              completedAt: new Date().toISOString()
            }
          : p
      );
    });
  };

  const getParticipationFor = (projectId: string) =>
    participation.find((p) => p.projectId === projectId);

  return {
    projects,
    participation,
    joinProject,
    submitProjectProof,
    getParticipationFor
  };
};

