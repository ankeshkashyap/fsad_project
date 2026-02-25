import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  helperText,
  className,
  ...rest
}) => {
  const inputId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-foreground-muted"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={twMerge(
          "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary-500 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
          className
        )}
        {...rest}
      />
      {helperText && (
        <p className="text-xs text-foreground-muted" aria-live="polite">
          {helperText}
        </p>
      )}
    </div>
  );
};

