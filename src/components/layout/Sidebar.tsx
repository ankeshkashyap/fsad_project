import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const linkBase =
  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50";

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === "admin") {
    return (
      <aside
        aria-label="Admin navigation"
        className="hidden w-56 flex-shrink-0 border-r border-slate-200 bg-white/60 px-3 py-4 text-sm dark:border-slate-800 dark:bg-slate-900/40 md:block"
      >
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
            }
          >
            <span>Overview</span>
          </NavLink>
          <NavLink
            to="/admin/lessons"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
            }
          >
            <span>Manage lessons</span>
          </NavLink>
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
            }
          >
            <span>Manage projects</span>
          </NavLink>
          <NavLink
            to="/admin/resources"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
            }
          >
            <span>Manage resources</span>
          </NavLink>
        </nav>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Student navigation"
      className="hidden w-56 flex-shrink-0 border-r border-slate-200 bg-white/60 px-3 py-4 text-sm dark:border-slate-800 dark:bg-slate-900/40 md:block"
    >
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
          }
        >
          <span>Overview</span>
        </NavLink>
        <NavLink
          to="/lessons"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
          }
        >
          <span>Lessons</span>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
          }
        >
          <span>Projects</span>
        </NavLink>
        <NavLink
          to="/resources"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
          }
        >
          <span>Resources</span>
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100" : ""}`
          }
        >
          <span>Progress</span>
        </NavLink>
      </nav>
    </aside>
  );
};

