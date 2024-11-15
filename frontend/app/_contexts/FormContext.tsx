"use client";

// context/FormContext.js
import { createContext, useContext, useState } from "react";

const initialData = {};
const FormContext = createContext(initialData);

export const useFormContext = () => useContext(FormContext);

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    step1Data: {},
    step2Data: {},
    // add more steps or shared data as needed
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}
