import { useRouter } from "next/navigation";

interface GoogleLoginOptions {
  clientId: string;
  redirectUri: string;
  userType?: "user" | "admin";
}

export const useGoogleRedirectLogin = ({
  clientId,
  redirectUri,
  userType = "user",
}: GoogleLoginOptions) => {
  const redirectToGoogleLogin = () => {
    const state = JSON.stringify({ userType });
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile email&state=${encodeURIComponent(
      state
    )}`;
    window.location.href = url;
  };

  return { redirectToGoogleLogin };
};
