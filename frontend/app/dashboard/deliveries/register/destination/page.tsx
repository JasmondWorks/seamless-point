"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

import { deliverySourceSchema, signUpSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions";
import PrivacyPolicyBlock from "@/app/dashboard/components/PrivacyPolicyBlock";
import ButtonFormSubmit from "@/components/ButtonFormSubmit";
import Link from "next/link";

export default function SignUp() {
  const form = useForm<z.infer<typeof deliverySourceSchema>>({
    resolver: zodResolver(deliverySourceSchema),
    // defaultValues: {
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phone: "",
    //   password: "",
    //   confirmPassword: "",
    // },
  });

  async function onSubmit(data: z.infer<typeof deliverySourceSchema>) {
    // console.log(data);
    try {
      //   createUser(data);
    } catch (error) {}
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="headline text-center mb-10">
        Where are you delivering to?
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="lg:grid space-y-5 lg:grid-cols-2 gap-5 lg:space-y-0">
            <CustomFormField
              label="Country"
              name="country"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Country"
            />
            <CustomFormField
              label="State"
              name="state"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="State"
            />
            <CustomFormField
              label="Receiver's first name"
              name="firstName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Receiver's first name"
            />
            <CustomFormField
              label="Receiver's last name"
              name="lastName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Receiver's last name"
            />
            <CustomFormField
              className="col-span-2"
              label="Receiver's city"
              name="city"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Lagos"
            />
            <CustomFormField
              label="Receiver's Street"
              name="street"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="123, main street"
            />
            <CustomFormField
              label="Receiver's Apt/unit"
              name="unit"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Apt/unit"
            />
            <CustomFormField
              className="col-span-2"
              label="Email"
              name="email"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="you@company.com]"
            />
            <CustomFormField
              className="col-span-2"
              label="Receiver's phone number"
              name="phone"
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              placeholder="+234"
            />
          </div>
          <PrivacyPolicyBlock />
          <Link href="/dashboard/deliveries/success">
            <ButtonFormSubmit text="Continue" />
          </Link>
        </form>
      </Form>
    </div>
  );
}
