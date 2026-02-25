import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-emerald-50/80 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div className="relative left-1/2 aspect-[3/1] w-[72rem] -translate-x-1/2 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.35),_transparent_60%)] opacity-60 dark:opacity-50" />
      </div>
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-4 px-4 py-4">
        <Sidebar />
        <main className="flex-1 space-y-4 pb-8 eco-fade-in">
          <div className="min-h-[60vh] rounded-3xl bg-white/80 p-4 shadow-soft ring-1 ring-slate-100 backdrop-blur dark:bg-slate-900/80 dark:ring-slate-800 sm:p-6">
            {children}
          </div>
          <footer className="text-xs text-foreground-muted">
            Built for students exploring practical ways to live more sustainably.
          </footer>
        </main>
      </div>
    </div>
  );
};

