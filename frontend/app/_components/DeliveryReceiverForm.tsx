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
import { useEffect, useState } from "react";
import {
  fetchCitiesForState,
  fetchCountries,
  fetchStatesForCountry,
} from "@/app/_utils/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDeliveryFormStore } from "@/app/_stores/createDeliveryFormStore";

export default function DeliveryReceiverForm() {
  const receiver = useDeliveryFormStore((store) => store.receiver);

  const form = useForm<z.infer<typeof deliveryDestinationSchema>>({
    resolver: zodResolver(deliveryDestinationSchema),
    defaultValues: receiver || {
      toCountry: "", // Default: Empty string for required text fields
      toState: "", // Default: Empty string for required text fields
      toFirstname: "", // Default: Empty string
      toLastname: "", // Default: Empty string
      toCity: "", // Default: Empty string
      toStreet: "", // Default: Empty string
      toAptUnit: "", // Default: Empty string
      toEmail: "", // Default: Empty string
      toPhone: "", // Default: Empty string
    },
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const router = useRouter();
  const updateReceiver = useDeliveryFormStore((state) => state.updateReceiver);

  const { watch } = form;
  const selectedCountryName = watch("toCountry");
  const selectedStateName = watch("toState");

  // Fetch countries once
  useEffect(() => {
    async function loadCountries() {
      const response = await fetchCountries();
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
      const country = countries.find((c) => c.name === selectedCountryName);

      if (country) {
        const response = await fetchStatesForCountry(country.isoCode);
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
      const country = countries.find((c) => c.name === selectedCountryName);
      const state = states.find((s) => s.name === selectedStateName);

      if (country && state) {
        const response = await fetchCitiesForState(
          country.isoCode,
          state.isoCode
        );
        setCities(response);

        if (response.length === 0) toast.error("No cities available.");
      }
    }

    loadCities();
  }, [selectedStateName, selectedCountryName, states]);

  // Form submission
  async function onSubmit(data: z.infer<typeof deliveryDestinationSchema>) {
    updateReceiver(data);

    console.log(data);
    router.push("/user/deliveries/register/parcel-info");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid lg:grid-cols-2 gap-5">
          <CustomFormField
            label="Country"
            name="toCountry"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Country"
            selectOptions={countries.map((country) => country.name)}
          />
          <CustomFormField
            label="State"
            name="toState"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="State"
            selectOptions={states.map((state) => state.name)}
          />
          <CustomFormField
            label="Receiver's first name"
            name="toFirstname"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Receiver's first name"
          />
          <CustomFormField
            label="Receiver's last name"
            name="toLastname"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Receiver's last name"
          />
          {/* <CustomFormField
            className="md:col-span-2"
            label="Receiver's city"
            name="toCity"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Lagos"
          /> */}
          <CustomFormField
            label="Receiver's city"
            name="toCity"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="City"
            selectOptions={cities.map((city) => city.name)}
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
            className="md:col-span-2"
            label="Email"
            name="toEmail"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="you@company.com]"
          />
          <CustomFormField
            className="md:col-span-2"
            label="Receiver's phone number"
            name="toPhone"
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
