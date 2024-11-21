"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";

import { deliverySourceSchema } from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { useFormContext } from "@/app/_contexts/FormContext";
import { useEffect, useState } from "react";
import { fetchCountries, fetchStatesForCountry } from "@/app/_utils/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeliverySourceForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const router = useRouter();
  const { addFormData, formStep, incrementFormStep } = useFormContext();

  const step = 1;
  const randNum = Math.floor(Math.random() * 5) + 1;

  const form = useForm<z.infer<typeof deliverySourceSchema>>({
    resolver: zodResolver(deliverySourceSchema),
    defaultValues: {
      country: "", // Default: Empty string for required text fields
      state: "", // Default: Empty string for required text fields
      firstname: "", // Default: Empty string
      lastname: "", // Default: Empty string
      city: "", // Default: Empty string
      street: "", // Default: Empty string
      aptUnit: "", // Default: Empty string
      email: "", // Default: Empty string
      phoneNumber: "", // Default: Empty string
      deliveryTitle: "", // Default: Empty string
      summary: "", // Default: Empty string
      instructions: "Leave package at the front door",
      amountOfItems: randNum,
    },
  });

  const { watch } = form;
  const selectedCountry = watch("country");
  //   const selectedState = watch("state");

  // Fetch all countries on mount
  useEffect(() => {
    // if (step !== formStep) return router.push("/user/deliveries/register");

    async function getCountries() {
      const response = await fetchCountries();

      setCountries(response);
    }
    getCountries();
  }, []);

  //  Get states by selected country
  useEffect(() => {
    if (!selectedCountry) return;

    async function getCountryStates() {
      const country = countries.find((c) => c.name === selectedCountry);

      const states = await fetchStatesForCountry(country.isoCode);

      if (!states.length)
        toast.error("No states available for the selected country");

      setStates(states);
    }

    getCountryStates();
  }, [selectedCountry]);

  //   Submit form
  async function onSubmit(data: z.infer<typeof deliverySourceSchema>) {
    console.log(data);
    addFormData(data);

    // incrementFormStep();
    router.push("/user/deliveries/register/destination");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid lg:grid-cols-2 gap-5">
          <CustomFormField
            label="Country"
            name="country"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Country"
            selectOptions={countries.map((country) => country.name)}
          />
          <CustomFormField
            label="State"
            name="state"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="State"
            selectOptions={states.map((state) => state.name)}
          />
          <CustomFormField
            label="First name"
            name="firstname"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="First name"
          />
          <CustomFormField
            label="Last name"
            name="lastname"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Last name"
          />
          <CustomFormField
            className="sm:col-span-2"
            label="City"
            name="city"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Lagos"
          />
          <CustomFormField
            label="Street"
            name="street"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="123, main street"
          />
          <CustomFormField
            label="Apt/unit"
            name="aptUnit"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Apt/unit"
          />
          <CustomFormField
            label="Email"
            name="email"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="you@company.com]"
          />
          <CustomFormField
            label="Phone Number"
            name="phoneNumber"
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            placeholder="+234"
          />
          <CustomFormField
            className="sm:col-span-2"
            label="Delivery Title"
            name="deliveryTitle"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Sofa"
          />
          <CustomFormField
            className="sm:col-span-2"
            label="Summary of what is being delivered (required)"
            name="summary"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
          />
        </div>
        <PrivacyPolicyBlock />
        <ButtonFormSubmit text="Continue" />
      </form>
    </Form>
  );
}
