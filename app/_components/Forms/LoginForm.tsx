"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import { FaApple, FaChevronRight } from "react-icons/fa";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { baseUserSchema } from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import { loginAdmin, loginUser } from "@/app/_lib/actions";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";

import { GoogleLoginButton } from "@/app/_components/GoogleLoginButton";

export default function LoginForm({
  userType = "user",
}: {
  userType: "user" | "admin";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUserAuth();

  const router = useRouter();

  console.log(isLoading);

  const form = useForm<z.infer<typeof baseUserSchema>>({
    resolver: zodResolver(baseUserSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit", // Optional: Change to "all" for real-time validation
  });

  function onLogin(user: any, token: any) {
    switch (userType) {
      case "user":
        login(user, token);
        router.push("/user/dashboard");
        break;
      case "admin":
        login(user, token);
        router.push("/admin/dashboard");
        break;
      default:
        break;
    }
  }

  async function onSubmit(data: z.infer<typeof baseUserSchema>) {
    console.log(data);
    console.log(userType);

    setIsLoading(true);
    const response =
      userType === "user" ? await loginUser(data) : await loginAdmin(data);

    if (response.status === "success") {
      const { user, token } = response;
      onLogin(user, token);
      toast.success("Login successful");
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-10 sm:px-16 py-8 space-y-8"
      >
        <div className="flex gap-4 justify-center flex-wrap lg:flex-nowrap">
          <GoogleLoginButton userType={userType} />

          <Button
            disabled
            onClick={(e) => e.preventDefault()}
            className="text-sm !px-3"
            variant={ButtonVariant.neutralDark}
          >
            <FaApple size="30" />
            <span>Sign in with Apple</span>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-16 bg-neutral-300"></span>
          <span className="whitespace-nowrap">or sign in with</span>
          <span className="h-[1px] w-16 bg-neutral-300"></span>
        </div>
        <div className="space-y-5">
          <CustomFormField
            label="Email Address"
            name="email"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="johndoe@example.com"
          />
          <CustomFormField
            label="Password"
            name="password"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            placeholder="Password"
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="rememberMe"
            label="Remember Me"
          />
          <Link
            href="/auth/user/forgot-password"
            className="inline-block text-brandSec font-medium"
          >
            Forgot Password?
          </Link>
        </div>
        <div>
          <ButtonFormSubmit
            text="Sign in"
            isReversed
            icon={<FaChevronRight />}
            disabled={isLoading}
          />
          {userType === "user" && (
            <p className="mt-5 flex items-center justify-center leading-snug gap-2">
              Don't have an account?{" "}
              <Link href={`/auth/${userType}/signup`}>
                <Button
                  variant={ButtonVariant.link}
                  className="underline !py-0 !h-0"
                  text="Sign up now"
                />
              </Link>
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
