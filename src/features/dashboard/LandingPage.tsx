import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Card } from "../../components/ui/Card";
import heroIllustration from "../../assets/hero-eco.svg";

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="space-y-10">
      <div className="grid gap-10 md:grid-cols-[3fr,2.4fr]">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-100 dark:ring-emerald-800/60">
            <span className="text-base">✨</span>
            Interactive lessons, real-world projects, and a personal sustainability score.
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Learn sustainable living through{" "}
            <span className="bg-gradient-to-r from-primary-600 to-emerald-500 bg-clip-text text-transparent">
              hands-on practice
            </span>
            .
          </h1>
          <p className="max-w-xl text-sm text-foreground-muted sm:text-base">
            The Sustainable Living Lab turns climate science into everyday actions. Explore short
            lessons, complete real-world eco-projects, and watch your sustainability score grow.
          </p>
          <div className="flex flex-wrap gap-3">
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Go to your dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Start learning now
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  I already have an account
                </Link>
              </>
            )}
          </div>
          <dl className="mt-4 grid gap-4 text-xs text-foreground-muted sm:grid-cols-3">
            <div>
              <dt className="font-medium text-slate-800 dark:text-slate-100">Focused lessons</dt>
              <dd>Short modules on energy, waste, and lifestyle habits.</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-800 dark:text-slate-100">
                Actionable projects
              </dt>
              <dd>Complete real projects like home energy audits and composting.</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-800 dark:text-slate-100">
                Trackable progress
              </dt>
              <dd>See your sustainability score and earn milestone badges.</dd>
            </div>
          </dl>
        </div>
        <Card className="relative flex flex-col justify-between gap-4 overflow-hidden border-none bg-gradient-to-br from-emerald-50/90 via-white to-sky-50/90 p-0 shadow-soft dark:from-emerald-900/40 dark:via-slate-950 dark:to-sky-900/30">
          <div className="eco-hero-glow pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative grid gap-4 p-5 sm:p-6">
            <img
              src={heroIllustration}
              alt="Illustration of leaves and energy flows representing sustainable living."
              className="mx-auto w-full max-w-md drop-shadow-md"
              loading="lazy"
            />
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Why this platform exists
              </h2>
              <p className="text-sm text-foreground-muted">
                Many students want to help the planet but are unsure where to start. This platform
                breaks sustainable living into clear, achievable steps that fit into everyday life.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>✔ Evidence-based content aligned with global sustainability goals.</li>
              <li>✔ Activities that work for homes, dorms, and classrooms.</li>
              <li>✔ Built-in reflection prompts to help habits stick.</li>
            </ul>
            <p className="mt-1 text-xs text-foreground-muted">
              All data is stored locally in your browser for this demo. No personal information
              leaves your device.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

