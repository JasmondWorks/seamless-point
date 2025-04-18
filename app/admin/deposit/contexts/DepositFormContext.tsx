"use client";

import React, { createContext, useContext, useState } from "react";

type FormData = {
  step: number;
  amount: number;
  selectedPaymentMethod: string;
  transactionFee: number;
};

type DepositFormContextType = {
  formData: FormData;
  nextStep: () => void;
  prevStep: () => void;
  updateForm: (data: Partial<FormData>) => void;
};

const DepositFormContext = createContext<DepositFormContextType | undefined>(undefined);

export function DepositFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    amount: 0,
    selectedPaymentMethod: '',
    transactionFee: 1.5
  });

  const nextStep = () => setFormData(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setFormData(prev => ({ ...prev, step: prev.step - 1 }));
  const updateForm = (data: Partial<FormData>) => setFormData(prev => ({ ...prev, ...data }));

  return (
    <DepositFormContext.Provider value={{ formData, nextStep, prevStep, updateForm }}>
      {children}
    </DepositFormContext.Provider>
  );
}

export function useDepositForm() {
  const context = useContext(DepositFormContext);
  if (!context) throw new Error("useDepositForm must be used within DepositFormProvider");
  return context;
} 