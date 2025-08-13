"use client";

import React, { ReactNode, useRef } from "react";

export default function ScrollWrapper({ children }: { children: ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function scrollToTop() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div
      ref={scrollContainerRef}
      className="h-full overflow-y-auto p-5 md:p-6 space-y-10 scroll-container"
      style={{
        scrollBehavior: "smooth",
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { scrollToTop })
          : child
      )}
    </div>
  );
}
