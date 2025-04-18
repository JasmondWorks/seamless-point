"use client";

import { useGoogleLogin } from "@react-oauth/google";

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
import { loginUser, signinUser } from "@/app/_lib/actions";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, user } = useUserAuth();

  const form = useForm<z.infer<typeof baseUserSchema>>({
    resolver: zodResolver(baseUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userDetailsResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        if (userDetailsResponse.ok) {
          const userInfo = await userDetailsResponse.json();
          console.log(userInfo); // Logs the user info

          const userDetails = {
            email: userInfo.email,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
            authType: "google",
          };

          const response = await signinUser(userDetails);
          const { user, token } = response;

          setIsLoading(false);
          login(user, token);
          router.push("/user/dashboard");
        } else {
          console.error(
            "Failed to fetch user info:",
            userDetailsResponse.status,
            userDetailsResponse.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error(error.message);
      }
    },
    scope: "profile email",
  });

  async function onSubmit(data: z.infer<typeof baseUserSchema>) {
    console.log(data);

    try {
      const res = await loginUser(data);
      const { user, token } = res;

      login(user, token);
      router.push("/user/dashboard");
    } catch (error: any) {
      console.log(error);

      if (error.message === "fetch failed")
        toast.error("Error: Check your internet connection");
      else toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user) toast.success("Successfully signed in");
  }, [user]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-10 sm:px-16 py-8 space-y-8"
      >
        <div className="flex gap-4 justify-center flex-wrap lg:flex-nowrap">
          <Button
            onClick={(e) => {
              // e.preventDefault();
              // googleLogin();
            }}
            className="text-sm !px-3"
            variant={ButtonVariant.neutralLight}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width={24} height={24} fill="#E7EAEE" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.04 12.2614C23.04 11.4459 22.9668 10.6618 22.8309 9.90912H12V14.3575H18.1891C17.9225 15.795 17.1123 17.013 15.8943 17.8284V20.7139H19.6109C21.7855 18.7118 23.04 15.7637 23.04 12.2614Z"
                fill="#4285F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9999 23.4998C15.1049 23.4998 17.7081 22.47 19.6108 20.7137L15.8942 17.8282C14.8644 18.5182 13.5472 18.9259 11.9999 18.9259C9.00467 18.9259 6.46945 16.903 5.56513 14.1848H1.72308V17.1644C3.61536 20.9228 7.50445 23.4998 11.9999 23.4998Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.758 5.20455 12.0001C5.20455 11.2421 5.33523 10.5051 5.56523 9.81506V6.83551H1.72318C0.944318 8.38801 0.5 10.1444 0.5 12.0001C0.5 13.8557 0.944318 15.6121 1.72318 17.1646L5.56523 14.1851Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9999 5.07386C13.6883 5.07386 15.2042 5.65409 16.396 6.79364L19.6944 3.49523C17.7029 1.63955 15.0997 0.5 11.9999 0.5C7.50445 0.5 3.61536 3.07705 1.72308 6.83545L5.56513 9.815C6.46945 7.09682 9.00468 5.07386 11.9999 5.07386Z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign in with Google</span>
          </Button>

          <Button
            // onClick={(e) => e.preventDefault()}
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
            isLoading={isLoading}
          />
          <p className="mt-5 flex items-center justify-center leading-snug gap-2">
            Don't have an account?{" "}
            <Link href="/auth/user/signup">
              <Button
                variant={ButtonVariant.link}
                className="underline !py-0 !h-0"
                text="Sign up now"
              />
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

