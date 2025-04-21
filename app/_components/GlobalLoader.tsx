// app/_components/GlobalLoader.tsx
"use client";

import { useLoader } from "@/app/_contexts/LoaderContext";
import SpinnerFull from "@/app/_components/SpinnerFull";

export default function GlobalLoader() {
  const { isLoading } = useLoader();
  return isLoading ? <SpinnerFull /> : null;
}
