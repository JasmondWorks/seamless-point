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
import { useEffect, useState } from "react";
import {
  fetchCitiesForState,
  fetchCountries,
  fetchStatesForCountry,
} from "@/app/_utils/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { useLocationData } from "@/app/_hooks/useLocationData";
import SpinnerFull from "@/app/_components/SpinnerFull";

export default function DeliverySourceForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const sender = useCreateDeliveryStore((store) => store.sender);
  const deliveryType = useCreateDeliveryStore((store) => store.deliveryType);
  const step = useCreateDeliveryStore((store) => store.step);

  const form = useForm<z.infer<typeof deliverySourceSchema>>({
    resolver: zodResolver(deliverySourceSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      street: "",
      aptUnit: "",
      country: "",
      state: "",
      city: "",
      postCode: "",
      email: "",
      phoneNumber: "",
      // deliveryTitle: "",
      // summary: "",
      ...sender, // Override with Zustand state
    },
  });

  const router = useRouter();
  const updateSender = useCreateDeliveryStore((state) => state.updateSender);

  // const {
  //   countries,
  //   states,
  //   cities,
  //   fetchStates,
  //   fetchCities,
  //   // isLocationDataLoading,
  // } = useLocationData();

  const { watch, setValue } = form;
  const selectedCountryName = watch("country");
  const selectedStateName = watch("state");

  // Clear selected state and cities when country changes
  useEffect(() => {
    if (selectedCountryName) {
      setValue("state", ""); // Clear state
      setValue("city", ""); // Clear city
    }
  }, [selectedCountryName, setValue]);

  // Clear selected city when state changes
  useEffect(() => {
    if (selectedStateName) {
      setValue("city", ""); // Clear city
    }
  }, [selectedStateName, setValue]);

  // Fetch countries once
  useEffect(() => {
    async function loadCountries() {
      const response: any = await fetchCountries();
      setCountries(response);
    }
    loadCountries();
  }, []);

  // Fetch states for selected country
  useEffect(() => {
    if (!selectedCountryName) {
      setStates([]); // Clear states when no country is selected
      return;
    }

    async function loadStates() {
      const country: any = countries.find(
        (c: any) => c.name === selectedCountryName
      );

      if (country) {
        const response: any = await fetchStatesForCountry(country.isoCode);
        setStates(response);

        if (response.length === 0) toast.error("No states available.");
      }
    }

    loadStates();
    setCities([]); // Clear cities when country changes
  }, [selectedCountryName, countries]);

  // Fetch cities for selected state
  useEffect(() => {
    if (!selectedStateName) {
      setCities([]); // Clear cities when no state is selected
      return;
    }

    async function loadCities() {
      const country: any = countries.find(
        (c: any) => c.name === selectedCountryName
      );
      const state = states.find((s: any) => s.name === selectedStateName);

      if (country && state) {
        const response: any = await fetchCitiesForState(
          country.isoCode,
          state.isoCode
        );
        setCities(response);

        if (response.length === 0) toast.error("No cities available.");
      }
    }

    loadCities();
  }, [selectedStateName, states]);

  // Form submission
  async function onSubmit(data: z.infer<typeof deliverySourceSchema>) {
    if (data) updateSender(data);
    console.log(data);

    router.push("/user/deliveries/register/receiver");
  }

  // if (isLocationDataLoading) return <SpinnerFull />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid lg:grid-cols-2 gap-5">
          <CustomFormField
            label="First name"
            name="firstName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="First name"
          />
          <CustomFormField
            label="Last name"
            name="lastName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Last name"
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
            label="Country"
            name="country"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Country"
            selectOptions={countries?.map((country: any) => country.name)}
          />
          <CustomFormField
            label="State"
            name="state"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="State"
            selectOptions={states?.map((state: any) => state.name)}
          />
          <CustomFormField
            label="City"
            name="city"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="City"
            selectOptions={cities.map((city: any) => city.name)}
          />
          <CustomFormField
            label="Postcode"
            name="postCode"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Example: 10001"
          />
          <CustomFormField
            label="Email"
            name="email"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="you@company.com"
          />
          <CustomFormField
            label="Phone Number"
            name="phoneNumber"
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
