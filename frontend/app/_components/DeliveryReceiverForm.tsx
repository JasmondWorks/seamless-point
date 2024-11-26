"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";

import {
  deliveryDedeliveryDestinationSchema,
  stinationSchema,
  signUpSchema,
  deliveryDestinationSchema,
} from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import { createDelivery, signupUser } from "@/app/_lib/actions";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import Link from "next/link";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { useFormContext } from "@/app/_contexts/FormContext";
import { useEffect, useState } from "react";
import { fetchCountries, fetchStatesForCountry } from "@/app/_utils/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";

export default function DeliveryReceiverForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const router = useRouter();

  const { addFormData, formStep, incrementFormStep, formData } =
    useFormContext();
  const { user } = useUserAuth();

  const step = 2;

  const form = useForm<z.infer<typeof deliveryDestinationSchema>>({
    resolver: zodResolver(deliveryDestinationSchema),
    defaultValues: {
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

  const { watch } = form;
  const selectedCountry = watch("toCountry");
  //   const selectedState = watch("state");

  useEffect(() => {
    // if (step !== formStep)
    //   return router.push("/user/deliveries/register/source");

    async function getCountries() {
      const response = await fetchCountries();

      setCountries(response);
    }
    getCountries();
  }, []);

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

  async function onSubmit(data: z.infer<typeof deliveryDestinationSchema>) {
    // console.log(data);
    addFormData(data);
    router.push('/user/deliveries/parcel-info');
    // const newFormData = { ...formData, ...data };
    // console.log(newFormData);

    // const { summary, ...newDelivery } = newFormData;
    // newDelivery.pickupAddress = `${newDelivery.aptUnit} ${newDelivery.street}`;
    // newDelivery.streetNumber = `123`;
    // newDelivery.user = user.id;
    // newDelivery.status = "unconfirmed";

    // try {
    //   const response = await createDelivery(newDelivery);
    //   console.log(response);
    //   router.push(
    //     `/user/deliveries/success/?trackingNum=${response.trackingId}`
    //   );
    // } catch (error: any) {
    //   toast.error(error.message);
    //   console.error(error.message);
    // }

    // incrementFormStep();
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
          <CustomFormField
            className="md:col-span-2"
            label="Receiver's city"
            name="toCity"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Lagos"
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
