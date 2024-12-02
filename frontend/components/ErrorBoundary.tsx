import React, { Component } from "react";
import toast from "react-hot-toast";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error information here if needed, for example:
    // console.error("Error caught by ErrorBoundary", error, errorInfo);

    if (process.env.NODE_ENV === "development") {
      console.error("Caught error:", error); // Display full error in development
    }

    // In production, we want to avoid exposing details of the error
    if (process.env.NODE_ENV !== "development") {
      toast.error("Something went wrong. Please try again.");
    }
  }

  render() {
    if (this.state.hasError) {
      return null; // or a custom fallback UI
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
