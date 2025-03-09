"use client";

import { useGoogleLogin } from "@react-oauth/google";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";

import { FaApple, FaChevronRight, FaGoogle } from "react-icons/fa";

import Button, { ButtonVariant } from "@/app/_components/Button";
import { signUpSchema } from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import { signinUser, signupUser } from "@/app/_lib/actions";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GoogleLoginButton } from "@/app/_components/GoogleLoginButton";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, user } = useUserAuth();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "+234",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    // console.log(data);

    setIsLoading(true);
    const response = await signupUser(data);

    if (response.status === "success") {
      const { user, token } = response;
      login(user, token);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (user) toast.success("Successfully signed up");
  }, [user]);

  return (
    <div
      className="rounded-lg"
      style={{ boxShadow: "0 0 7px rgba(0 0 0 /.12)" }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-10 sm:px-16 py-8 space-y-8"
        >
          <div className="flex gap-4 justify-center flex-wrap lg:flex-nowrap">
            <GoogleLoginButton />
            <Button
              disabled
              className="text-sm !px-3"
              variant={ButtonVariant.neutralDark}
            >
              <FaApple size="30" />
              <span>Sign up with Apple</span>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-16 bg-neutral-300"></span>
            <span className="whitespace-nowrap">or sign up with</span>
            <span className="h-[1px] w-16 bg-neutral-300"></span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <CustomFormField
              label="First Name"
              name="firstName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="John"
            />
            <CustomFormField
              label="Last Name"
              name="lastName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Doe"
            />
            <CustomFormField
              className="md:col-span-2"
              label="Email Address"
              name="email"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="johndoe@example.com"
            />
            <CustomFormField
              className="md:col-span-2"
              label="Phone Number"
              name="phoneNumber"
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              placeholder="Phone number"
            />
            <CustomFormField
              className="md:col-span-2"
              label="Create Password"
              name="password"
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
              placeholder="at least 8 characters"
            />
            <CustomFormField
              className="md:col-span-2"
              label="Confirm Password"
              name="confirmPassword"
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
            />
          </div>
          <div>
            <ButtonFormSubmit
              disabled={isLoading}
              text="Sign up"
              isReversed
              icon={<FaChevronRight />}
            />
            <p className="mt-5 flex items-center justify-center leading-snug gap-2">
              Already have an account?{" "}
              <Link href="/auth/user/login">
                <Button
                  variant={ButtonVariant.link}
                  className="underline px-0 py-0"
                  text="Login here"
                />
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
