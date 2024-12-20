import { ECurrency } from "@/app/_lib/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Dec')
    day: "numeric", // numeric day of the month (e.g., '30')
    hour: "numeric", // numeric hour (e.g., '9')
    minute: "numeric", // numeric minute (e.g., '42')
    hour12: true, // 12-hour format (e.g., 'PM')
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  return formattedDateTime;
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export function capitalise(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function capitalizeWords(string: string, separator: string = " ") {
  return string
    .split(separator)
    .map((word) => capitalise(word))
    .join(" ");
}

export function formatCurrency(
  amount: number,
  currency: ECurrency = ECurrency.NGN
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function getLocalStorageKey(baseKey: string) {
  const appUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "defaultAppUrl";
  // Hash or sanitize appUrl if necessary
  const sanitizedUrl = appUrl.replace(/[^a-zA-Z0-9]/g, "_"); // Replace special characters with underscores
  return `${sanitizedUrl}_${baseKey}`;
}

export function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      // If the script is executed during SSR, avoid running it
      resolve(false);
      return;
    }

    if (document.getElementById("paystack-js")) {
      resolve(true); // Script is already loaded
      return;
    }

    const script = document.createElement("script");
    script.id = "paystack-js";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve(true); // Script loaded successfully
    script.onerror = () => reject(false); // Failed to load
    document.body.appendChild(script);
  });
}

// export function loadPaystackScript(callback: () => void) {
//   if (document.getElementById("paystack-script")) {
//     callback(); // If already loaded, invoke the callback
//     return;
//   }

//   const script = document.createElement("script");
//   script.id = "paystack-script";
//   script.src = "https://js.paystack.co/v1/inline.js";
//   script.async = true;
//   script.onload = callback;

//   document.body.appendChild(script);
// }
