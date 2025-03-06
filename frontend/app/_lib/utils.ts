import { BadgeVariant } from "@/app/_components/Badge";
import { supabase } from "@/app/_lib/supabase";
import { ECurrency, Parcel } from "@/app/_lib/types";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { type ClassValue, clsx } from "clsx";
import { toast } from "react-hot-toast";
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

export function capitalise(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function capitalizeWords(string: string, separator: string = " ") {
  return string
    .split(separator)
    .map((word) => capitalise(word))
    .join(" ");
}

type CurrencyFormatOptions = {
  currency?: string;
  notation?: "standard" | "compact";
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  compactDisplay?: "short" | "long";
};

export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions = {}
) {
  const {
    currency = "NGN",
    notation = "compact",
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    compactDisplay = "short",
  } = options;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    minimumFractionDigits,
    maximumFractionDigits,
    compactDisplay,
  }).format(amount);
}

export function getLocalStorageKey(key: string) {
  const appUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "defaultAppUrl";
  // Hash or sanitize appUrl if necessary
  const sanitizedUrl = appUrl.replace(/[^a-zA-Z0-9]/g, "_"); // Replace special characters with underscores
  return `${sanitizedUrl}_${key}`;
}

export function getUserId() {
  if (typeof window === "undefined") {
    // If called on the server, return null
    return null;
  }

  try {
    const user = JSON.parse(
      localStorage.getItem(getLocalStorageKey("user")) || "{}"
    );
    return user?._id || null; // Return null if no user ID is found
  } catch (error) {
    console.error("Error accessing user:", error);
    return null;
  }
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

export function formatDeliveries(deliveries: any) {
  return deliveries?.map((delivery: any) => ({
    ...delivery,
    sender: {
      firstName: delivery.firstName,
      lastName: delivery.lastName,
      street: delivery.street,
      aptUnit: delivery.aptUnit,
      country: delivery.country,
      state: delivery.state,
      city: delivery.city,
      postCode: delivery.postCode,
      email: delivery.email,
      phoneNumber: delivery.phoneNumber,
    },
    receiver: {
      toFirstName: delivery.toFirstName,
      toLastName: delivery.toLastName,
      toStreet: delivery.toStreet,
      toAptUnit: delivery.toAptUnit,
      toCountry: delivery.toCountry,
      toState: delivery.toState,
      toCity: delivery.toCity,
      toPostCode: delivery.toPostCode,
      toEmail: delivery.toEmail,
      toPhoneNumber: delivery.toPhoneNumber,
    },
    trackingId: delivery.trackingId.split("-")[0],
    dispatch: delivery.dispatch,
    courier: delivery.courier,
    status: delivery.status,
    createdAt: delivery.createdAt,
    amount: delivery.amount,
    parcelDetails: {
      parcelItems: delivery.parcelItems,
      packagingType: delivery.packagingType,
      packageImage: delivery.packageImage,
      proofOfPurchase: delivery.proofOfPurchase,
      currency: delivery.currency,
    },
  }));
}

export function getBadgeStyle(tag: string): BadgeVariant | null {
  switch (tag) {
    case "completed":
      return BadgeVariant.blue;
    case "uncompleted":
    case "pending":
      return BadgeVariant.orange;
    case "ongoing":
    case "unconfirmed":
      return BadgeVariant.neutralDark;
    case "cancelled":
    case "failed":
      return BadgeVariant.red;
    case "delivered":
      return BadgeVariant.green;
    default:
      return null;
  }
}
export function getPackageSenderReceiver(
  packageData: any,
  prefix: string = ""
) {
  const fields = [
    "firstName",
    "lastName",
    "street",
    "aptUnit",
    "country",
    "state",
    "city",
    "postCode",
    "email",
    "phoneNumber",
  ];

  const details: { [key: string]: any } = {};

  fields.forEach((field) => {
    const key = prefix
      ? `${prefix}${field.charAt(0).toUpperCase()}${field.slice(1)}`
      : field; // Add prefix for receiver fields, use camelCase for sender fields

    details[key] = packageData[key]; // Use the constructed key for both access and assignment
  });

  return details;
}

export function getParcelDetails(packageData: any) {
  return {
    parcelItems: packageData.parcelItems,
    packagingType: packageData.packagingType,
    currency: packageData.currency,
    // proofOfPurchase: package.proofOfPurchase,
  };
}
console.log("Selected code is empty, no modifications can be made.");
console.log("Entire code file has been analyzed for potential log additions.");
console.log("No specific logs were requested, default logs will be added.");
console.log("Please note that excessive logging can impact performance.");
console.log("Logs will be added at the beginning of each function.");
console.log("Example log: 'Function [functionName] has been called.'");

export function getParcelTotalAmount(parcelDetails: any) {
  return parcelDetails?.parcelItems.reduce(
    (acc: number, item: Parcel) => acc + (item?.value * item?.quantity || 0),
    0
  );
}

export function getParcelTotalWeight(parcelDetails: any) {
  return parcelDetails.parcelItems.reduce(
    (acc: number, item: Parcel) => acc + (item?.weight || 0),
    0
  );
}

export function getStoreState(store: any, excludeFields: string[] = []) {
  const state = store.getState();

  // Filter out any properties that are functions or are in the excludeFields array
  const dataVariables = Object.keys(state).reduce((acc: any, key: any) => {
    if (typeof state[key] !== "function" && !excludeFields.includes(key)) {
      acc[key] = state[key];
    }
    return acc;
  }, {});

  return dataVariables;
}

export function getNewDeliveryData() {
  const storeObj = useCreateDeliveryStore;
  const state = getStoreState(storeObj, ["step"]);

  return state;
}

export async function uploadFile(
  file: File,
  bucket: string,
  fileClassification?: string
): Promise<string | null> {
  try {
    // Generate a unique path for the file within the bucket
    const folder = getUserId(); // Example folder name
    const uniqueFileName = `${Date.now()}-${file.name}`; // Ensure a unique file name
    const path = `${folder}/${uniqueFileName}`; // Full path in the bucket

    console.log("File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
    // Upload the file to the specified bucket and path
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600", // Cache for 1 hour
        upsert: true, // Replace file if it already exists
      });

    if (error) {
      console.error("File upload error:", error.message);
      toast.error(error.message);
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    if (!publicUrlData) {
      console.error("Error generating public URL");
      toast.error("Error generating public URL");
      return null;
    }

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error("Error uploading file:", err);
    toast.error(
      fileClassification
        ? `Error uploading ${fileClassification} ${
            file.type.startsWith("image") ? "image" : "file"
            // file.type.split("/")[0]
          }`
        : "Error uploading file"
    );
    return null;
  }
}
// export async function getSuperbaseMedia(bucketName) {
//   const {data, error} = await supabase.storage.from(bucketName).list(getUserId + '/', {
//     limit: 10,
//   })
// }

export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
export function base64ToFile(
  base64String: string,
  fileName: string = "defaultName.jpg"
) {
  if (!base64String) return undefined;

  const [prefix, base64Data] = base64String.split(",");
  const byteCharacters = atob(base64Data);
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);

  // const contentType = prefix.match(/:(.*?);/)[1];
  const matchResult = prefix.match(/:(.*?);/);

  // Safely check if matchResult exists
  if (!matchResult || !matchResult[1]) {
    throw new Error(
      "Invalid prefix format: content type could not be extracted."
    );
  }

  const contentType = matchResult[1];
  const fileBlob = new Blob([byteArray], { type: contentType });

  return new File([fileBlob], fileName, { type: contentType });
}
