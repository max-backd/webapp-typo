import React, { ErrorInfo, ReactNode } from "react";
import { AppDispatch } from "../app/store";
import { setError } from "../state/errorSlice";

type ErrorBoundaryProps = {
  dispatch: AppDispatch;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, any> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.dispatch(setError({ error: error.message }));
  }

  render(): ReactNode {
    return this.props.children;
  }
}