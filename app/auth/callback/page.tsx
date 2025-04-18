// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signinAdmin, signinUser } from "@/app/_lib/actions";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { login } = useUserAuth();

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    if (state && code) {
      // Step 1: Extract userType from state (encoded JSON object)
      const { userType }: { userType: "user" | "admin" } = JSON.parse(
        decodeURIComponent(state)
      );

      console.log(userType);

      // Step 2: Fetch tokens using the authorization code
      const fetchTokens = async () => {
        try {
          const response = await fetch("/api/google/token", {
            method: "POST",
            body: JSON.stringify({ code }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          console.log(data);
          if (data?.access_token) {
            // Step 3: Fetch user info using the access token
            const userInfoResponse = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: {
                  Authorization: `Bearer ${data.access_token}`,
                },
              }
            );

            const userInfo = await userInfoResponse.json();

            console.log(userInfo);

            // Step 4: Process user data and login
            if (userInfo?.email) {
              const userDetails = {
                email: userInfo.email,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
                authType: "google",
              };

              // Sign in based on userType (user/admin)
              const response =
                userType === "user"
                  ? await signinUser(userDetails)
                  : await signinAdmin(userDetails);
              const { user, token } = response;

              console.log(response);

              if (response?.status === "success") {
                login(user, token);
                router.push(
                  userType === "user" ? "/user/dashboard" : "/admin/dashboard"
                );
              } else {
                throw new Error(response?.message || "Login failed.");
              }
            } else {
              throw new Error("User information not found.");
            }
          } else {
            throw new Error(
              "Failed to exchange authorization code for tokens."
            );
          }
        } catch (error) {
          console.error(error);
          // toast.error("An error occurred during login.");
          router.push(`/auth/${userType}/login`);
        } finally {
          setLoading(false);
        }
      };

      fetchTokens();
    } else {
      toast.error("Invalid request.");
      setLoading(false);
    }
  }, [code, state, router]);

  if (loading) {
    return (
      <main className="py-10 text-center">
        <h1 className="font-bold text-lg">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="py-10 text-center">
      <h1 className="font-bold text-lg">Redirecting...</h1>
    </main>
  );
};

export default GoogleCallback;
