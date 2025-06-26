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
        // Step 1: Exchange code for tokens
        const tokenResponse = await fetch("/api/google/token", {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: { "Content-Type": "application/json" },
        });

        let tokenData;
        try {
          tokenData = await tokenResponse.json();
        } catch (jsonErr) {
          throw new Error("Invalid response from token API.");
        }

        if (!tokenResponse.ok) {
          throw new Error(tokenData?.error || "Failed to get access token.");
        }

        if (!tokenData?.access_token) {
          throw new Error("Access token not found in token response.");
        }

        // Step 2: Get user info
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          }
        );

        let userInfo;
        try {
          userInfo = await userInfoResponse.json();
        } catch {
          throw new Error("Invalid user info response.");
        }

        if (!userInfoResponse.ok || !userInfo?.email) {
          throw new Error("Failed to fetch user information.");
        }

        // Step 3: Prepare login payload
        const userDetails = {
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          authType: "google",
        };

        // Step 4: Log the user in
        const userResponse =
          userType === "user"
            ? await signinUser(userDetails)
            : await signinAdmin(userDetails);

        if (userResponse.status !== "success") {
          throw new Error(userResponse?.message || "Login failed.");
        }

        const { user, token } = userResponse;

        login(user, token);
        toast.success("Successfully signed in");
        router.push(
          userType === "user" ? "/user/dashboard" : "/admin/dashboard"
        );
      } catch (error: any) {
        console.error("Login error:", error);
        toast.error(
          error?.message || "An unexpected error occurred during login."
        );
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
