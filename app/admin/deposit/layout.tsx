"use client";

import { DepositFormProvider } from './contexts/DepositFormContext';

export default function DepositLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DepositFormProvider>{children}</DepositFormProvider>;
} 