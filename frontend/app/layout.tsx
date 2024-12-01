import type { Metadata } from "next";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Toaster } from "react-hot-toast";
import { UserAuthProvider } from "@/app/_contexts/UserAuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  return (
    <html
      lang="en"
      className="scroll-smooth text-[85%] md:text[90%] lg:text-[95%]"
      style={{ scrollBehavior: "smooth" }}
    >
      <body className={`antialiased overflow-x-hidden no-scrollbar`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
        >
          <UserAuthProvider>{children}</UserAuthProvider>
        </GoogleOAuthProvider>
        <Toaster
          toastOptions={{
            success: {
              duration: 3000,
              style: { background: "#4CAF50", color: "#fff" },
            },
            error: {
              duration: 5000,
              style: { background: "#F44336", color: "#fff" },
            },
            loading: {
              duration: 3000,
              style: { background: "#FF9800", color: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
