import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/ToastProvider";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      showToast("Welcome back! Your sustainability journey continues.", "success");
      navigate("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to sign in. Please try again.";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="login-title"
      className="mx-auto flex max-w-md flex-col gap-6"
    >
      <div className="space-y-2 text-center">
        <h1
          id="login-title"
          className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50"
        >
          Log in to your eco-journey
        </h1>
        <p className="text-sm text-foreground-muted">
          Continue where you left off, track your impact, and explore new sustainable habits.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"
      >
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-900/40 dark:text-red-100">
            {error}
          </p>
        )}
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
        <p className="text-center text-xs text-foreground-muted">
          New here?{" "}
          <Link to="/register" className="font-medium text-primary-700 dark:text-primary-300">
            Create a learning account
          </Link>
          .
        </p>
        <p className="text-center text-xs text-foreground-muted">
          Use <span className="font-mono text-xs">admin@sustainability.edu</span> to sign in as the
          demo administrator.
        </p>
      </form>
    </section>
  );
};

