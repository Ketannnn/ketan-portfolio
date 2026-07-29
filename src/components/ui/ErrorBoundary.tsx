import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-base/50 rounded-xl border border-red-500/20">
          <h2 className="text-red-400 font-mono text-sm mb-2">3D Scene Failed to Load</h2>
          <p className="text-zinc-500 text-xs max-w-xs">Please ensure your Spline URL is valid and publicly accessible.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
