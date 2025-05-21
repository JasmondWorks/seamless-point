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

  const code = searchParams.get("code") ?? "";
  const state = searchParams.get("state") ?? "";

  useEffect(() => {
    if (!state && !code) {
      toast.error("Invalid request.");
      setLoading(false);
    }

    // Step 1: Extract userType from state (encoded JSON object)
    const { userType }: { userType: "user" | "admin" } = JSON.parse(
      decodeURIComponent(state)
    );

    console.log(userType);

    // Step 2: Fetch tokens using the authorization code
    const fetchTokens = async () => {
      try {
        const tokenResponse = await fetch("/api/google/token", {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const tokenData = await tokenResponse.json();

        // if (tokenData.error) toast.error(tokenData.error);

        console.log("token data", tokenData);

        if (!tokenData.access_token) throw new Error("Couldn't log in");

        // Step 3: Fetch user info using the access token
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          }
        );

        const userInfo = await userInfoResponse.json();

        console.log(userInfo);

        if (!userInfo.email) throw new Error("User information not found.");

        // Step 4: Process user data and login

        const userDetails = {
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          authType: "google",
        };

        // Sign in based on userType (user/admin)
        const userResponse =
          userType === "user"
            ? await signinUser(userDetails)
            : await signinAdmin(userDetails);
        const { user, token } = userResponse;

        if (userResponse.status !== "success")
          throw new Error(userResponse?.message || "Login failed.");

        login(user, token);
        toast.success("Successfully signed in");
        router.push(
          userType === "user" ? "/user/dashboard" : "/admin/dashboard"
        );
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "An error occurred during login.");
        router.push(`/auth/${userType}/login`);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
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
