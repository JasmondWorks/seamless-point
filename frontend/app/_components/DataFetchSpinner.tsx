import Spinner from "@/app/_components/Spinner";
import React from "react";

export default function DataFetchSpinner() {
  return (
    <div className="!text-secondary py-5 flex justify-center items-center">
      <Spinner size="large" color="orange" />
    </div>
  );
}
