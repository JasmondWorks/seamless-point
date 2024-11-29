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

export function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
