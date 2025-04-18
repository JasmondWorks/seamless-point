"use client";

import { createContext, useContext, useState } from "react";

type FormContextValue<T = any> = {
  formData: T;
  addFormData: (data: Partial<T>) => void;
  formStep: number;
  incrementFormStep: () => void;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
};

const FormContext = createContext<FormContextValue>({} as FormContextValue);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState({
    amount: 50,
    selectedPaymentMethod: "debit-card",
  });
  const [formStep, setFormStep] = useState(1);

  const incrementFormStep = () => setFormStep(step => step + 1);
  const addFormData = (data: Partial<typeof formData>) => {
    setFormData(cur => ({ ...cur, ...data }));
  };

  return (
    <FormContext.Provider value={{
      formData,
      addFormData,
      incrementFormStep,
      formStep,
      setFormData,
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext<T = any>() {
  const context = useContext<FormContextValue<T>>(FormContext);
  if (!context) throw new Error("useFormContext must be used within FormProvider");
  return context;
}
