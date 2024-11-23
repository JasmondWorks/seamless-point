"use client";

// context/FormContext.js
import { createContext, useContext, useEffect, useState } from "react";

const initialData = {};
const FormContext = createContext(initialData);

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    amount: 50,
    // selectedPaymentMethod: "debit-card",
  });
  const [formStep, setformStep] = useState(1);

  function incrementFormStep() {
    setformStep((step) => step + 1);
  }
  const addFormData = (data) => {
    setFormData((cur) => ({ ...cur, ...data }));
  };

  console.log(formData);

  return (
    <FormContext.Provider
      value={{
        formData,
        addFormData,
        incrementFormStep,
        formStep,
        setFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context)
    throw new Error("You tried to use FormContext outside FormProvider");

  return context;
}
