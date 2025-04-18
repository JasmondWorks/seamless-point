"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token"); // Retrieve token from query params

      if (token) {
        // Process token (e.g., fetch user data)
        console.log("Token:", token);
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        console.error("Login failed");
        router.push("/login"); // Redirect back to login
      }
    };

    handleAuth();
  }, [router]);

  return <div>Processing login...</div>;
}
