import React from "react";
import { twMerge } from "tailwind-merge";

type BadgeVariant = "success" | "warning" | "info";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeClasses: Record<BadgeVariant, string> = {
  success:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 border-emerald-200 dark:border-emerald-700",
  warning:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-100 border-amber-200 dark:border-amber-700",
  info: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-100 border-sky-200 dark:border-sky-700"
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "info",
  className,
  children,
  ...rest
}) => (
  <span
    className={twMerge(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
      badgeClasses[variant],
      className
    )}
    {...rest}
  >
    {children}
  </span>
);

