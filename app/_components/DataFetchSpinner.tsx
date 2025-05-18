import Spinner from "@/app/_components/Spinner";
import { cn } from "@/app/_lib/utils";
import React from "react";

export default function DataFetchSpinner({ className = "" }) {
  return (
    <div
      className={cn(
        "!text-secondary py-5 flex justify-center items-center",
        className
      )}
    >
      <Spinner size="medium" color="orange" />
    </div>
  );
}
