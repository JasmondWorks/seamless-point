"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SpinnerFull from "@/app/_components/SpinnerFull";

const RouteChangeSpinner = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const currentPath = usePathname(); // Detect route changes

  useEffect(() => {
    let timeout;

    const handleStart = () => {
      clearTimeout(timeout); // Prevent overlapping timers
      setLoading(true);
    };

    const handleComplete = () => {
      timeout = setTimeout(() => setLoading(false), 300); // Add a delay for UX
    };

    handleStart(); // Trigger spinner on route change start
    handleComplete(); // Remove spinner after a slight delay

    return () => clearTimeout(timeout);
  }, [currentPath]);

  return loading ? <SpinnerFull /> : children;
};

export default RouteChangeSpinner;
