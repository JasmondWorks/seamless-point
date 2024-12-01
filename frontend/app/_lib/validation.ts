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
export const updateUserSchema = z
  .object({
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
  firstname: z
    .string({
      required_error: "Please provide a first name",
    })
    .trim()
    .min(1, "Please provide a first name"),
  lastname: z
    .string({
      required_error: "Please provide a last name",
    })
    .trim()
    .min(1, "Please provide a last name"),
  city: z
    .string({
      required_error: "Please provide a city",
    })
    .trim()
    .min(1, "Please provide a city"),
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
  deliveryTitle: z
    .string({
      required_error: "Please provide a delivery title",
    })
    .trim()
    .min(1, "Please provide a delivery title"),
  summary: z
    .string({
      required_error: "Please provide a delivery summary",
    })
    .trim()
    .min(1, "Please provide a delivery summary"),
  // amountOfItems: z.number(),
  // instructions: z
  //   .string({
  //     required_error: "Please provide a delivery summary",
  //   })
  //   .trim()
  //   .min(1, "Please provide a delivery summary"),
});
export const deliveryDestinationSchema = z.object({
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
  toFirstname: z
    .string({
      required_error: "Please provide a first name",
    })
    .trim()
    .min(1, "Please provide a first name"),
  toLastname: z
    .string({
      required_error: "Please provide a last name",
    })
    .trim()
    .min(1, "Please provide a last name"),
  toCity: z
    .string({
      required_error: "Please provide a city",
    })
    .trim()
    .min(1, "Please provide a city"),
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
  toEmail: z
    .string({
      required_error: "Please provide a valid email",
    })
    .trim()
    .email("Please provide a valid email"),
  toPhone: z
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
  itemName: z
    .string({
      required_error: "Please provide an item name",
    })
    .trim()
    .min(1, "Please provide an item name"),
  itemCategory: z
    .string({
      required_error: "Please provide an item category",
    })
    .trim()
    .min(1, "Please provide an item category"),
  itemSubCategory: z
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
    (val) => (val === "" ? 1 : Number(val)), // Convert empty input to 1 as a default
    z.number().min(1, "Weight must be greater than zero")
  ),
  quantity: z.preprocess(
    (val) => (val === "" ? 1 : Number(val)), // Convert empty input to 1 as a default
    z.number().int().min(1, "Quantity must be at least 1")
  ),
  value: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)), // Convert empty input to 0 as a default
    z.number().min(0, "Value cannot be negative")
  ),
});
export const parcelDocumentSchema = z.object({
  itemName: z
    .string({
      required_error: "Please provide an item name",
    })
    .trim()
    .min(1, "Please provide an item name"),
  itemDescription: z
    .string({
      required_error: "Please provide an item description",
    })
    .trim()
    .min(1, "Please provide an item category"),
  weight: z.preprocess(
    (val) => (val === "" ? 1 : Number(val)), // Convert empty input to 1 as a default
    z.number().min(1, "Weight must be greater than zero")
  ),
  quantity: z.preprocess(
    (val) => (val === "" ? 1 : Number(val)), // Convert empty input to 1 as a default
    z.number().int().min(1, "Quantity must be at least 1")
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
      message: `Invalid file. Allowed types: ${allowedMimeTypes.join(
        ", "
      )}, and size must be less than ${(maxFileSize / (1024 * 1024)).toFixed(
        1
      )} MB.`,
    }
  );
export const parcelInfoSchema = z.object({
  packaging: z
    .string({
      required_error: "Please provide an item name",
    })
    .trim()
    .min(1, "Please provide an item name"),
  currency: z
    .string({
      required_error: "Please provide an item name",
    })
    .trim()
    .min(1, "Please provide an item name"),
  proofOfPurchase: createFileSchema(5 * 1024 * 1024, [
    "application/pdf", // PDF
    "image/jpeg", // JPEG
    "image/png", // PNG
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
