// app/auth/callback/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signinAdmin, signinUser } from "@/app/_lib/actions";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { login } = useUserAuth();
  const requestKeyRef = useRef<string | null>(null);

  const code = searchParams.get("code") ?? "";
  const state = searchParams.get("state") ?? "";

  useEffect(() => {
    const requestKey = code && state ? `${code}:${state}` : "invalid";

    if (requestKeyRef.current === requestKey) {
      return;
    }
    requestKeyRef.current = requestKey;

    if (!code || !state) {
      toast.error("Invalid request.");
      setLoading(false);
      router.replace("/auth/user/login");
      return;
    }

    let decodedState: string;
    try {
      decodedState = decodeURIComponent(state);
    } catch {
      toast.error("Invalid request.");
      setLoading(false);
      router.replace("/auth/user/login");
      return;
    }

    let parsedState: { userType?: string };
    try {
      parsedState = JSON.parse(decodedState);
    } catch {
      toast.error("Invalid request.");
      setLoading(false);
      router.replace("/auth/user/login");
      return;
    }

    const userType =
      parsedState.userType === "admin"
        ? "admin"
        : parsedState.userType === "user"
        ? "user"
        : null;

    if (!userType) {
      toast.error("Invalid request.");
      setLoading(false);
      router.replace("/auth/user/login");
      return;
    }

    // let isActive = true;

    const fetchTokens = async () => {
      try {
        const tokenResponse = await fetch("/api/google/token", {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: { "Content-Type": "application/json" },
        });

        let tokenData;
        try {
          tokenData = await tokenResponse.json();

          console.log("token data", tokenData);
        } catch {
          throw new Error("Invalid response from token API.");
        }

        if (!tokenResponse.ok) {
          throw new Error(tokenData?.error || "Failed to get access token.");
        }

        if (!tokenData?.access_token) {
          throw new Error("Access token not found in token response.");
        }

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

          console.log("user", userInfo);
        } catch {
          throw new Error("Invalid user info response.");
        }

        if (!userInfoResponse.ok || !userInfo?.email) {
          throw new Error("Failed to fetch user information.");
        }

        const userDetails = {
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          authType: "google",
        };

        console.log("b4 api call");
        const userResponse =
          userType === "user"
            ? await signinUser(userDetails)
            : await signinAdmin(userDetails);
        console.log("after api call");

        if (userResponse.status !== "success") {
          throw new Error(userResponse?.message || "Login failed.");
        }

        const { user, token } = userResponse;

        console.log("logged in user", user);
        console.log("logged in user's token", token);

        return;
        // if (!isActive) {
        //   console.log("returned right here");
        //   return;
        // }

        login(user, token);
        toast.success("Successfully signed in");
        router.push(
          userType === "user" ? "/user/dashboard" : "/admin/dashboard"
        );
      } catch (error: any) {
        // if (!isActive) {
        //   return;
        // }

        console.error("Login error:", error);
        toast.error(
          error?.message || "An unexpected error occurred during login."
        );
        router.replace(
          userType === "user" ? "/auth/user/login" : "/auth/admin/login"
        );
      } finally {
        // if (isActive) {
        setLoading(false);
        // }
      }
    };

    fetchTokens();

    // return () => {
    //   isActive = false;
    // };
  }, [code, state, router, login]);

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
