"use client";

import styles from "./ResetPasswordForm.module.css";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import { resetPasswordSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Form } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa";
import { z } from "zod";
import Navbar from "@/app/_components/Navbar";
import Link from "next/link";
import toast from "react-hot-toast";
import { resetUserPassword } from "@/app/_lib/actions";
import { useUserAuth } from "../_contexts/UserAuthContext";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({
  resetToken,
}: {
  resetToken: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUserAuth();
  const router = useRouter();
  console.log(resetToken);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    const { password, confirmPassword } = data;

    setIsLoading(true);
    const res = await resetUserPassword(password, confirmPassword, resetToken);
    if (res.status === "success") {
      toast.success(res.message);
      router.push("/auth/user/login");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-5 ${styles.formContainer} `}
      >
        <CustomFormField
          label="New Password"
          name="password"
          control={form.control}
          fieldType={FormFieldType.PASSWORD}
          placeholder="at least 8 characters"
        />
        <CustomFormField
          label="Confirm Password"
          name="confirmPassword"
          control={form.control}
          fieldType={FormFieldType.PASSWORD}
        />

        <div>
          <ButtonFormSubmit
            text="UPDATE PASSWORD"
            className="!bg-brandPry"
            isReversed
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
}
