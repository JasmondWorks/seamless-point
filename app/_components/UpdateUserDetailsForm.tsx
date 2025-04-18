"use client";

import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Form } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button, { ButtonVariant } from "./Button";
import toast from "react-hot-toast";
import { updateUser } from "@/app/_lib/actions";
import { updateUserSchema } from "@/app/_lib/validation";
import Spinner from "@/app/_components/Spinner";

export default function UpdateUserDetailsForm({ user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(user);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: new Date(),
      email: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset(user);
  }, [user]);

  async function onSubmit(data: z.infer<typeof updateUserSchema>) {
    const updatedUserInfo = { ...data, dob: data.dob.toDateString() };

    // Submit user data
    setIsSubmitting(true);
    const res = await updateUser(updatedUserInfo);
    setIsSubmitting(false);
    // Update form data when user is updated

    if (res.status === "success") {
      reset({
        firstName: res.user.firstName || "",
        lastName: res.user.lastName || "",
        email: res.user.email || "",
        gender: res.user.gender || "",
        dob: res.user.dob || "",
      });
      toast.success(res.message);
    } else {
      toast.error(res.message);
      console.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="lg:grid space-y-5 lg:grid-cols-2 gap-5 lg:space-y-0">
          <CustomFormField
            label="First name"
            name="firstName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="John"
          />
          <CustomFormField
            label="Last name"
            name="lastName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Doe"
          />
          <CustomFormField
            label="Date of birth"
            name="dob"
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            placeholder="dd/mm/yyyy"
          />
          <CustomFormField
            disabled
            label="Gender"
            name="gender"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Male or Female"
            selectOptions={["Male", "Female"]}
          />
          <CustomFormField
            className="col-span-2"
            label="Email"
            name="email"
            disabled
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="you@company.com"
          />
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          variant={ButtonVariant.fill}
          text={
            isSubmitting ? (
              <span className="flex items-center gap-2">
                Saving{" "}
                <Spinner color="text" size="small" className="!w-5 !h-5" />
              </span>
            ) : (
              "Save"
            )
          }
          className="bg-customGreen text-white"
          isRoundedLarge
        />
      </form>
    </Form>
  );
}
