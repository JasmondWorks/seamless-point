"use client";

import useScrollbarPadding from "@/app/_hooks/useScrollbarPadding";
import React, { useRef } from "react";

const ScrollableContainer = ({ children, className = "", ...props }) => {
  const containerRef = useRef(null);
  const hasScrollbar = useScrollbarPadding(containerRef);

  return (
    <div
      ref={containerRef}
      className={`max-h-96 overflow-y-auto ${className} ${
        hasScrollbar ? "pr-4" : ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;
