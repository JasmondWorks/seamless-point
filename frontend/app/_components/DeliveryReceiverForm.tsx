"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";

import { deliveryDestinationSchema } from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { newDelivery } from "@/app/_lib/types";
import { useLocationData } from "@/app/_hooks/useLocationData";
import React from "react";

export default function DeliveryReceiverForm() {
  const receiver = useCreateDeliveryStore(
    (store: newDelivery) => store.receiver
  );
  console.log(receiver);

  const userId = useCreateDeliveryStore((state) => state.userId);
  console.log(userId);

  const form = useForm<z.infer<typeof deliveryDestinationSchema>>({
    resolver: zodResolver(deliveryDestinationSchema),
    defaultValues: {
      toFirstName: "", // Default: Empty string
      toLastName: "", // Default: Empty string
      toStreet: "", // Default: Empty string
      toAptUnit: "", // Default: Empty string
      toCountry: "", // Default: Empty string for required text fields
      toState: "", // Default: Empty string for required text fields
      toCity: "", // Default: Empty string
      toPostCode: "",
      toEmail: "", // Default: Empty string
      toPhoneNumber: "", // Default: Empty string
      ...receiver, // Default: Empty string
    },
  });

  const router = useRouter();
  const updateReceiver = useCreateDeliveryStore(
    (state) => state.updateReceiver
  );

  const {
    countries,
    states,
    cities,
    loadCities,
    loadStates,
    onCountryChange,
    onStateChange,
  } = useLocationData(false);
  const isMounting = useRef(true); // Track component mounting

  const { watch, setValue } = form;
  const selectedCountryName = watch("toCountry");
  const selectedStateName = watch("toState");

  // // Clear selected state and cities when country changes
  // useEffect(() => {
  //   setValue("toState", ""); // Clear state
  //   setValue("toCity", ""); // Clear city
  // }, [selectedCountryName, setValue]);

  // // Clear selected city when state changes
  // useEffect(() => {
  //   setValue("toCity", ""); // Clear city
  // }, [selectedStateName, setValue]);

  // Fetch states for selected country
  useEffect(() => {
    loadStates(selectedCountryName);
  }, [selectedCountryName, countries]);

  // Fetch cities for selected state
  useEffect(() => {
    loadCities(selectedCountryName, selectedStateName);
  }, [selectedStateName, states]);

  // Mark as mounted after the first render
  useEffect(() => {
    isMounting.current = false;
  }, []);

  // Form submission
  async function onSubmit(data: z.infer<typeof deliveryDestinationSchema>) {
    if (data) updateReceiver(data);

    console.log(data);
    router.push("/user/deliveries/register/parcel-info");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid lg:grid-cols-2 gap-5">
          <CustomFormField
            label="Receiver's first name"
            name="toFirstName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Receiver's first name"
          />
          <CustomFormField
            label="Receiver's last name"
            name="toLastName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Receiver's last name"
          />
          <CustomFormField
            label="Receiver's Street"
            name="toStreet"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="123, main street"
          />
          <CustomFormField
            label="Receiver's Apt/unit"
            name="toAptUnit"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Apt/unit"
          />
          <CustomFormField
            label="Country"
            name="toCountry"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Country"
            selectOptions={countries.map((country: any) => country.name)}
            onChange={(selectedCountryName) =>
              onCountryChange(selectedCountryName, setValue)
            }
          />

          <CustomFormField
            label="State"
            name="toState"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="State"
            selectOptions={states.map((state: any) => state.name)}
            selectMessage="Select a country first"
            onChange={(selectedStateName) =>
              onStateChange(selectedCountryName, selectedStateName, setValue)
            }
          />
          <CustomFormField
            label="Receiver's city"
            name="toCity"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="City"
            selectOptions={cities.map((city: any) => city.name)}
            selectMessage="Select a state first"
          />

          <CustomFormField
            label="Postcode"
            name="toPostCode"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Example: 10001"
          />
          <CustomFormField
            label="Email"
            name="toEmail"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="you@company.com"
          />
          <CustomFormField
            label="Receiver's phone number"
            name="toPhoneNumber"
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            placeholder="+234"
          />
        </div>
        <PrivacyPolicyBlock />
        <ButtonFormSubmit text="Continue" />
      </form>
    </Form>
  );
}
