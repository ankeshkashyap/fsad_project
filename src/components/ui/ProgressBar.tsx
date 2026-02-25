import React from "react";
import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  className
}) => {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={twMerge("space-y-1", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs text-foreground-muted">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary-500 transition-[width] dark:bg-primary-400"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

