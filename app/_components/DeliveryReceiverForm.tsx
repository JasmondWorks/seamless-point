"use client";

import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";

import { deliveryDestinationSchema } from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { useEffect, useReducer } from "react";

import { useRouter } from "next/navigation";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { newDelivery } from "@/app/_lib/types";
import React from "react";
import { getCities, getCountries, getStates } from "@/app/_lib/actions";
import Button, { ButtonVariant } from "@/app/_components/Button";

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

export default function DeliveryReceiverForm({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
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

  const [{ countries, states, cities, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { setValue } = form;

  const selectedCountry = useWatch({
    control: form.control,
    name: "toCountry",
  });
  const selectedState = useWatch({ control: form.control, name: "toState" });
  const selectedCity = useWatch({ control: form.control, name: "toCity" });

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
    if (receiver?.toCountry) fetchStates(receiver.toCountry);
    if (selectedCountry) fetchStates(selectedCountry);
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (receiver?.toCountry && receiver?.toState)
      fetchCities(receiver.toCountry, receiver.toState);

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

      if (stateIsInCountry) setValue("toState", selectedState);
      else setValue("toState", "");
    }
  }
  async function fetchCities(countryCode: string, stateName: string) {
    const state = states?.find((state: any) => state.name === stateName);

    if (!state) return;

    dispatch({ type: "cities/loading" });
    console.log("Fetch start");
    const res = await getCities(countryCode, state.isoCode);

    console.log("Cities", res.data);
    if (res.status === "success") {
      dispatch({ type: "cities/fetched", payload: res.data });

      const selectedCityDetails = res.data.find(
        (city: any) => city.name === selectedCity
      );

      const cityIsInState = res.data.find(
        (city: any) => city.city_id === selectedCityDetails?.city_id
      );

      if (cityIsInState) setValue("toCity", selectedCity);
      else setValue("toCity", "");
    }
  }

  // Form submission
  async function onSubmit(data: z.infer<typeof deliveryDestinationSchema>) {
    if (data) updateReceiver(data);

    console.log(data);
    onSetActivePage("parcel-info");
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
            disabled={isLoading.countries}
            isLoading={isLoading.countries}
            label="Country"
            name="toCountry"
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
            name="toState"
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
            name="toCity"
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
        <div className="flex gap-4 justify-end">
          <Button
            onClick={() => onSetActivePage("sender")}
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
