import { string, z } from "zod";

// Base schema for common fields (sign-in and sign-up)
export const emailSchema = z.object({
  email: z
    .string({
      required_error: "Please provide an email address",
    })
    .trim()
    .email("Please provide a valid email address"),
});
export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Please provide a password",
      })
      .trim()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Please confirm your password",
      })
      .trim()
      .min(8, "Password must be at least 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom", // Specify the type of issue
        path: ["confirmPassword"], // Target confirmPassword field
        message: "Passwords do not match!",
      });
    }
  });
export const changePasswordSchema = z
  .object({
    currPassword: z
      .string({
        required_error: "Please provide your current password",
      })
      .trim()
      .min(8, "Password must be at least 8 characters"),
    password: z
      .string({
        required_error: "Please provide a new password",
      })
      .trim()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Please confirm your new password",
      })
      .trim()
      .min(8, "Password must be at least 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom", // Specify the type of issue
        path: ["confirmPassword"], // Target confirmPassword field
        message: "Passwords do not match!",
      });
    }
  });
export const updateUserSchema = z.object({
  firstName: z
    .string({
      required_error: "Please provide a first name",
    })
    .trim()
    .min(1, "Please provide a first name"),
  lastName: z
    .string({
      required_error: "Please provide a last name",
    })
    .trim()
    .min(1, "Please provide a last name"),
  email: z
    .string({
      required_error: "Please provide a valid email",
    })
    .trim()
    .email("Please provide a valid email"),
  dob: z
    .date({
      required_error: "Please provide a date of birth",
    })
    .refine((value) => value <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),
  gender: z
    .string({
      required_error: "Please select a gender",
    })
    .refine(
      (value) => ["male", "female"].includes(value.trim().toLowerCase()),
      {
        message: "Gender must be 'Male' or 'Female'",
      }
    ),
});

export const baseUserSchema = z.object({
  ...emailSchema.shape,
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(8, "Password must be at least 8 characters"), // Ensure password length
});

// Schema for sign-up with additional fields
export const signUpSchema = baseUserSchema
  .extend({
    firstName: z
      .string({
        required_error: "Please provide a first name",
      })
      .trim()
      .min(1, "Please provide a first name"),
    lastName: z
      .string({
        required_error: "Please provide a last name",
      })
      .trim()
      .min(1, "Please provide a last name"),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .trim()
      .min(10, { message: "Phone number must be at least 10 digits long" })
      .regex(/^\+?\d{10,14}$/, {
        message: "Phone number must be valid and can include a country code",
      }),
    password: z
      .string({
        required_error: "Please provide a password",
      })
      .trim()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Please confirm your password",
      })
      .trim()
      .min(8, "Password must be at least 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom", // Specify the type of issue
        path: ["confirmPassword"], // Target confirmPassword field
        message: "Passwords do not match!",
      });
    }
  });

// Schema for sign-in (email and password only)
export const signInSchema = baseUserSchema;

export const deliverySourceSchema = z.object({
  firstName: z
    .string({
      required_error: "Please provide a first name",
    })
    .trim()
    .min(1, "Please provide a first name"),
  lastName: z
    .string({
      required_error: "Please provide a last name",
    })
    .trim()
    .min(1, "Please provide a last name"),
  street: z
    .string({
      required_error: "Please provide a street",
    })
    .trim()
    .min(1, "Please provide a street"),
  aptUnit: z
    .string({
      required_error: "Please provide an apartment/unit",
    })
    .trim()
    .min(1, "Please provide an apartment/unit"),
  country: z
    .string({
      required_error: "Please provide a country",
    })
    .trim()
    .min(1, "Please provide a country"),
  state: z
    .string({
      required_error: "Please provide a state",
    })
    .trim()
    .min(1, "Please provide a country"),
  city: z
    .string({
      required_error: "Please provide a city",
    })
    .trim()
    .min(1, "Please provide a city"),
  postCode: z
    .string({
      required_error: "Please provide a postcode",
    })
    .trim()
    .min(1, "Please provide a postcode"),
  email: z
    .string({
      required_error: "Please provide a valid email",
    })
    .trim()
    .email("Please provide a valid email"),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits long" }) // Ensuring minimum length
    .regex(/^[+]?\d{10,14}$/, {
      message: "Phone number must be valid and can include a country code",
    }),
  // deliveryTitle: z
  //   .string({
  //     required_error: "Please provide a delivery title",
  //   })
  //   .trim()
  //   .min(1, "Please provide a delivery title"),
  // summary: z
  //   .string({
  //     required_error: "Please provide a delivery summary",
  //   })
  //   .trim()
  //   .min(1, "Please provide a delivery summary"),
});
export const deliveryDestinationSchema = z.object({
  toFirstName: z
    .string({
      required_error: "Please provide a first name",
    })
    .trim()
    .min(1, "Please provide a first name"),
  toLastName: z
    .string({
      required_error: "Please provide a last name",
    })
    .trim()
    .min(1, "Please provide a last name"),
  toStreet: z
    .string({
      required_error: "Please provide a street",
    })
    .trim()
    .min(1, "Please provide a street"),
  toAptUnit: z
    .string({
      required_error: "Please provide an apt/unit",
    })
    .trim()
    .min(1, "Please provide an apt/unit"),
  toCountry: z
    .string({
      required_error: "Please provide a country",
    })
    .trim()
    .min(1, "Please provide a country"),
  toState: z
    .string({
      required_error: "Please provide a state",
    })
    .trim()
    .min(1, "Please provide a country"),
  toCity: z
    .string({
      required_error: "Please provide a city",
    })
    .trim()
    .min(1, "Please provide a city"),

  toPostCode: z
    .string({
      required_error: "Please provide a postcode",
    })
    .trim()
    .min(1, "Please provide a postcode"),
  toEmail: z
    .string({
      required_error: "Please provide a valid email",
    })
    .trim()
    .email("Please provide a valid email"),
  toPhoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits long" }) // Ensuring minimum length
    .regex(/^[+]?\d{10,14}$/, {
      message: "Phone number must be valid and can include a country code",
    }),
});

export const parcelItemSchema = z.object({
  name: z
    .string({
      required_error: "Please provide an item name",
    })
    .trim()
    .min(1, "Please provide an item name")
    .refine((val) => val.split(/\s+/).filter(Boolean).length >= 3, {
      message: "Item name must contain at least three words",
    }),
  category: z
    .string({
      required_error: "Please provide an item category",
    })
    .trim()
    .min(1, "Please provide an item category"),
  subCategory: z
    .string({
      required_error: "Please provide an item subcategory",
    })
    .trim()
    .min(1, "Please provide an item subcategory"),
  hsCode: z
    .string({
      // required_error: "HS code is required",
    })
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits long" }) // Ensuring minimum length
    .regex(/^[+]?\d{10,14}$/, {
      message: "Phone number must be valid and can include a country code",
    }),
  weight: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined; // Default to 1 for empty string
      if (!isNaN(Number(val))) return Number(val); // Convert valid number-like strings to numbers
      return val; // Pass invalid values to Zod for validation
    },
    z
      .number({ invalid_type_error: "Must be a number" }) // Custom message for invalid numbers
      .min(0, "Weight must be at least 0")
  ),
  quantity: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined; // Default to 1 for empty string
      if (!isNaN(Number(val))) return Number(val); // Convert valid number-like strings to numbers
      return val; // Pass invalid values to Zod for validation
    },
    z
      .number({ invalid_type_error: "Must be a number" }) // Custom message for invalid numbers
      .int("Quantity must be an integer")
      .min(1, "Quantity must be at least 1")
  ),

  // quantity must be a number
  value: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined; // Default to 0 for empty string
      if (!isNaN(Number(val))) return Number(val); // Convert valid number-like strings to numbers
      return val; // Pass invalid values to Zod for validation
    },
    z
      .number({ invalid_type_error: "Must be a number" }) // Custom message for invalid numbers
      .int("Value must be an integer")
      .min(1, "Value must be at least 1")
  ),
});
export const parcelDocumentSchema = z.object({
  name: z
    .string({
      required_error: "Please provide an item name",
    })
    .trim()
    .min(1, "Please provide an item name")
    .refine((val) => val.split(/\s+/).filter(Boolean).length >= 3, {
      message: "Item name must contain at least three words",
    }),
  description: z
    .string({
      required_error: "Please provide an item description",
    })
    .trim()
    .min(1, "Please provide an item description"),
  weight: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined; // Default to 1 for empty string
      if (!isNaN(Number(val))) return Number(val); // Convert valid number-like strings to numbers
      return val; // Pass invalid values to Zod for validation
    },
    z
      .number({ invalid_type_error: "Must be a number" }) // Custom message for invalid numbers
      .min(0, "Weight must be at least 0")
  ),
  quantity: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined; // Default to 1 for empty string
      if (!isNaN(Number(val))) return Number(val); // Convert valid number-like strings to numbers
      return val; // Pass invalid values to Zod for validation
    },
    z
      .number({ invalid_type_error: "Must be a number" }) // Custom message for invalid numbers
      .int("Quantity must be an integer")
      .min(1, "Quantity must be at least 1")
  ),
});

const createFileSchema = (maxFileSize: number, allowedMimeTypes: string[]) =>
  z.custom<File>(
    (file) => {
      if (!(file instanceof File)) {
        return false; // Ensure it's a File object
      }

      return (
        file.size <= maxFileSize && // Check file size
        allowedMimeTypes.includes(file.type) // Check MIME type
      );
    },
    {
      message: `Invalid file. Please upload a file of type: ${allowedMimeTypes
        .map((type) => type.split("/")[1].toUpperCase())
        .join(", ")}. Maximum file size allowed is ${(
        maxFileSize /
        (1024 * 1024)
      ).toFixed(1)} MB.`,
    }
  );

export const parcelInfoSchema = z.object({
  packagingType: z
    .string({
      required_error: "Packaging type is required.",
    })
    .trim()
    .min(1, "Please enter a valid packaging type."),
  currency: z
    .string({
      required_error: "Currency is required.",
    })
    .trim()
    .min(1, "Please enter a valid currency."),
  proofOfPurchase: createFileSchema(5 * 1024 * 1024, [
    "application/pdf", // PDF
    "application/msword", // DOC
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  ]),
  packageImage: createFileSchema(2 * 1024 * 1024, [
    "image/jpeg", // JPEG
    "image/png", // PNG
  ]),
});

export const creditCardSchema = z
  .object({
    cardNumber: z
      .string()
      .min(19, "Card number must be 16 digits")
      .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number format is invalid"),
    expiryMonth: z
      .string()
      .min(2, "Month is required")
      .max(2, "Invalid month")
      .regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
    expiryYear: z
      .string()
      .min(2, "Year is required")
      .max(2, "Invalid year")
      .regex(/^\d{2}$/, "Invalid year"),
    cvv: z
      .string()
      .regex(/^\d{3}$/, "Invalid CVV")
      .min(3, "CVV is required"),
  })
  .refine(
    (data) => {
      const { expiryMonth, expiryYear } = data;
      // Custom validation: expiry year should not be in the past
      const currentYear = new Date().getFullYear().toString().slice(-2); // Get last 2 digits of the current year
      if (parseInt(expiryYear) < parseInt(currentYear)) {
        return false;
      }
      return true;
    },
    {
      message: "The date entered has passed",
      path: ["expiryMonth", "expiryYear"],
    }
  );
