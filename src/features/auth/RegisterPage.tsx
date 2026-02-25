import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../types/user";
import { useToast } from "../../components/ui/ToastProvider";

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await register(name, email, role, password);
      showToast("Account created. Welcome to the Sustainable Living Lab!", "success");
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to create your account right now.";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="register-title"
      className="mx-auto flex max-w-md flex-col gap-6"
    >
      <div className="space-y-2 text-center">
        <h1
          id="register-title"
          className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50"
        >
          Join the Sustainable Living Lab
        </h1>
        <p className="text-sm text-foreground-muted">
          Create an account to access interactive lessons, hands-on projects, and progress
          dashboards.
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
          label="Full name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          autoComplete="new-password"
          required
          minLength={6}
          helperText="Passwords are stored only in your browser for this demo."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="student">Student</option>
          <option value="admin">Administrator</option>
        </Select>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
        <p className="text-center text-xs text-foreground-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary-700 dark:text-primary-300">
            Sign in
          </Link>
          .
        </p>
      </form>
    </section>
  );
};

