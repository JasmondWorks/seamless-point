"use client"; // Mark as a client component

import React, { Component } from "react";
import toast from "react-hot-toast";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state to show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error information
    if (process.env.NODE_ENV === "development") {
      console.error("Caught error:", error, errorInfo);
    }

    // Display a toast message in production to avoid exposing error details
    if (process.env.NODE_ENV !== "development") {
      toast.error("Something went wrong. Please try again.");
    }
  }

  render() {
    if (this.state.hasError) {
      // Return a custom fallback UI when an error occurs
      return <div>An error occurred. Please try again later.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
