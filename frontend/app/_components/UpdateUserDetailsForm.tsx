"use client";

import styles from "./ResetPasswordForm.module.css";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import { changePasswordSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Form } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa";
import { z } from "zod";
import Navbar from "@/app/_components/Navbar";
import Link from "next/link";
import toast from "react-hot-toast";
import { changeUserPassword } from "@/app/_lib/actions";
import { useUserAuth } from "../_contexts/UserAuthContext";
import Button, { ButtonVariant } from "./Button";

export default function UpdateUserDetailsForm() {
  const [isDialogOpen, setisDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof changePasswordSchema>) {
    console.log(data);
    try {
      //   signupUser(data);
    } catch (error) {}
  }

  function handleUpdateAccount() {
    setIsDialogOpen(true);
    setDialogContent("account/updated");
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
            placeholder="Deo"
          />
          <CustomFormField
            label="Date of birth"
            name="dateOfBirth"
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            placeholder="dd/mm/yyyy"
          />
          <CustomFormField
            label="Gender"
            name="gender"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Male, Female"
          />
          <CustomFormField
            className="col-span-2"
            label="Email"
            name="email"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="you@company.com]"
          />
        </div>
        <Button
          onClick={handleUpdateAccount}
          variant={ButtonVariant.fill}
          text="Save"
          className="bg-customGreen text-white"
          isRoundedLarge
        />
      </form>
    </Form>
  );
}
