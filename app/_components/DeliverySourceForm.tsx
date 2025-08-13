"use client";

import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import { deliverySourceSchema } from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { useEffect, useReducer, useState } from "react";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { getCities, getCountries, getStates } from "@/app/_lib/actions";

import styles from "./DeliverySourceForm.module.css";
import { cn } from "@/app/_lib/utils";
import Button, { ButtonVariant } from "@/app/_components/Button";
import Badge, { BadgeVariant } from "@/app/_components/Badge";
import { X } from "lucide-react";
import { ActivePage } from "@/app/user/deliveries/register/page";

interface State {
  countries: any;
  states: any;
  cities: any;
  isLoading: { countries: boolean; states: boolean; cities: boolean };
}

const initialState = {
  countries: [],
  states: [],
  cities: [],
  isLoading: { countries: false, states: false, cities: false },
};
function reducer(state: State, action: any) {
  switch (action.type) {
    case "countries/loading":
      return { ...state, isLoading: { ...state.isLoading, countries: true } };
    case "states/loading":
      return { ...state, isLoading: { ...state.isLoading, states: true } };
    case "cities/loading":
      return { ...state, isLoading: { ...state.isLoading, cities: true } };
    case "countries/fetched":
      return {
        ...state,
        countries: action.payload,
        isLoading: { ...state.isLoading, countries: false },
      };
    case "states/fetched":
      return {
        ...state,
        states: action.payload,
        isLoading: { ...state.isLoading, states: false },
      };
    case "cities/fetched":
      return {
        ...state,
        cities: action.payload,
        isLoading: { ...state.isLoading, cities: false },
      };
    default:
      return state;
  }
}

export default function DeliverySourceForm({
  onSetActivePage,
}: {
  onSetActivePage: (page: ActivePage) => void;
}) {
  const sender = useCreateDeliveryStore((store) => store.sender);
  const updateSender = useCreateDeliveryStore((state) => state.updateSender);

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
      ...sender,
    },
  });

  const { setValue, reset, handleSubmit } = form;

  const [{ countries, states, cities, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const selectedCountry = useWatch({ control: form.control, name: "country" });
  const selectedState = useWatch({ control: form.control, name: "state" });
  const selectedCity = useWatch({ control: form.control, name: "city" });

  useEffect(() => {
    async function fetchCountries() {
      dispatch({ type: "countries/loading" });
      const res = await getCountries();

      if (res.status === "success")
        dispatch({ type: "countries/fetched", payload: res.data });
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    if (sender?.country) fetchStates(sender.country);
    if (selectedCountry) fetchStates(selectedCountry);
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (sender?.country && sender?.state)
      fetchCities(sender.country, sender.state);

    if (selectedCountry && selectedState)
      fetchCities(selectedCountry, selectedState);
  }, [selectedState, states]);

  async function fetchStates(countryCode: any) {
    const country = countries?.find(
      (country: any) => country.isoCode === countryCode
    );

    if (!country) return;

    dispatch({ type: "states/loading" });
    const res = await getStates(countryCode);

    if (res.status === "success") {
      dispatch({ type: "states/fetched", payload: res.data });

      const selectedStateDetails = res.data.find(
        (state: any) => state.name === selectedState
      );

      const stateIsInCountry = res.data.find(
        (state: any) => state.state_id === selectedStateDetails?.state_id
      );

      if (stateIsInCountry) setValue("state", selectedState);
      else setValue("state", "");
    }
  }
  async function fetchCities(countryCode: string, stateName: string) {
    const state = states?.find((state: any) => state.name === stateName);

    if (!state) return;

    dispatch({ type: "cities/loading" });
    const res = await getCities(countryCode, state.isoCode);

    if (res.status === "success") {
      dispatch({ type: "cities/fetched", payload: res.data });

      const selectedCityDetails = res.data.find(
        (city: any) => city.name === selectedCity
      );

      const cityIsInState = res.data.find(
        (city: any) => city.city_id === selectedCityDetails?.city_id
      );

      if (cityIsInState) setValue("city", selectedCity);
      else setValue("city", "");
    }
  }

  // Form submission
  async function onSubmit(data: z.infer<typeof deliverySourceSchema>) {
    updateSender(data);
    onSetActivePage("receiver");
  }

  const handleClearFields = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you sure that you want to clear all fields?"
    );
    if (confirm) {
      reset({
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
      }); // Explicitly reset to empty values
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("space-y-5", styles.container)}
      >
        <div className="flex justify-end">
          <button onClick={handleClearFields} type="button">
            <Badge variant={BadgeVariant.red} className="!gap-1 items-center">
              <X size={16} strokeWidth={3} /> Clear all
            </Badge>
          </button>
        </div>
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
            disabled={isLoading.countries}
            isLoading={isLoading.countries}
            label="Country"
            name="country"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Select a country"
            selectOptions={countries?.map((country: any) => ({
              name: country.name,
              value: country.isoCode,
            }))}
          />
          <CustomFormField
            disabled={isLoading.states}
            isLoading={isLoading.states}
            label="State"
            name="state"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Select a state"
            selectOptions={states?.map((state: any) => ({
              name: state.name,
              value: state.name,
            }))}
            selectMessage="Select a country first"
          />
          <CustomFormField
            disabled={isLoading.cities}
            isLoading={isLoading.cities}
            label="City"
            name="city"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Select a city"
            selectOptions={cities?.map((city: any) => ({
              name: city.name,
              value: city.name,
            }))}
            selectMessage="Select a state first"
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
            country={selectedCountry}
          />
        </div>

        <PrivacyPolicyBlock />

        <div className="flex gap-4 justify-end">
          <Button
            onClick={() => onSetActivePage("delivery-type")}
            variant={ButtonVariant.fill}
            className="!bg-[#fde9d7] !text-brandSec"
            text="Previous"
            isRoundedLarge
          />
          <Button
            type="submit"
            variant={ButtonVariant.fill}
            className="!text-white !bg-brandSec"
            text="Continue"
            isRoundedLarge
          />
        </div>
      </form>
    </Form>
  );
}
