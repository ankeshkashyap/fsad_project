import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // In a production app you would send this to an error monitoring service.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Something went wrong.
          </h1>
          <p className="max-w-md text-sm text-foreground-muted">
            An unexpected error occurred while rendering this page. Please refresh your browser to
            try again.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

