"use client";

import styles from "./page.module.css";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import { emailSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Form } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { forgotUserPassword } from "@/app/_lib/actions";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/app/_components/CountdownTimer";
import { CountdownToast } from "@/app/_components/CountdownToast";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: z.infer<typeof emailSchema>) {
    setIsLoading(true);
    const res = await forgotUserPassword(email);

    if (res.status === "success") {
      toast.success(
        // "A link has been sent to your email.\nClick on it to reset your password"
        res.message
      );
      form.reset();
    } else {
      toast.error(res.message);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-brandPryLight">
      <main className="h-full flex-1 grid place-items-center">
        <div>
          <h1 className="mb-5 headline text-center">Forgot Your Password?</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`space-y-5 ${styles.formContainer} `}
            >
              <CustomFormField
                label="Email"
                name="email"
                control={form.control}
                fieldType={FormFieldType.INPUT}
                placeholder="johndoe@example.com"
              />
              <p className="text-brandPry opacity-80 text-center">
                We'll send a reset link to your e-mail
              </p>
              <div>
                <ButtonFormSubmit
                  text="RESET PASSWORD"
                  className="!bg-brandPry"
                  isReversed
                  disabled={isLoading}
                />
              </div>
              <Link
                href="/auth/user/login"
                className="block text-center underline text-brandPry opacity-80 font-bold"
              >
                Back To Login
              </Link>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
