import React from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Select: React.FC<SelectProps> = ({ id, label, className, children, ...rest }) => {
  const selectId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-foreground-muted"
      >
        {label}
      </label>
      <select
        id={selectId}
        className={twMerge(
          "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary-500 focus:border-primary-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
          className
        )}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};

