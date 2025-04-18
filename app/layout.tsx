import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { UserAuthProvider } from "@/app/_contexts/UserAuthContext";
import { IsClientCtxProvider } from "@/app/is-client-ctx";
import QueryProvider from "@/app/_lib/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  return (
    <html
      lang="en"
      // className="scroll-smooth text-[85%] md:text-[90%] lg:text-[95%]"
      className="scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        {/* Favicon setup */}
        <link rel="icon" href="/assets/images/favicon/" />
        <link
          rel="icon"
          href="/assets/images/favicon/favicon.ico"
          sizes="any"
        />
        <link
          rel="icon"
          href="/assets/images/favicon/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/assets/images/favicon/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/images/favicon/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/images/favicon/android-chrome-192x192.png"
          sizes="192x192"
        />
        <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />

        {/* Other meta tags for iOS, Android, etc. */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`antialiased overflow-x-hidden no-scrollbar`}>
        <QueryProvider>
          <IsClientCtxProvider>
            <UserAuthProvider>{children}</UserAuthProvider>
          </IsClientCtxProvider>
        </QueryProvider>
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
