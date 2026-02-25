import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-600 to-emerald-400 text-xl text-white shadow-soft">
              🌱
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Sustainable Living Lab
            </span>
          </Link>
          {user && (
            <div className="hidden items-center gap-3 text-xs text-foreground-muted sm:flex">
              <span>Signed in as</span>
              <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100">
                {user.name} · {user.role === "admin" ? "Admin" : "Student"}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {user ? (
            <>
              <div className="hidden items-center gap-2 text-sm text-foreground-muted md:flex">
                <NavLink
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-1 transition ${
                      isActive
                        ? "bg-gradient-to-r from-primary-600 to-emerald-500 text-white shadow-soft"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {user.role === "admin" ? "Admin dashboard" : "My dashboard"}
                </NavLink>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hidden rounded-full px-3 py-1 text-sm transition md:inline-flex ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                Log in
              </NavLink>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-soft transition hover:from-primary-700 hover:to-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:from-primary-500 dark:to-emerald-400 dark:hover:from-primary-600 dark:hover:to-emerald-500"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

