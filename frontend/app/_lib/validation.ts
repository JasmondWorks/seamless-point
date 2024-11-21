import { z } from "zod";

// Base schema for common fields (sign-in and sign-up)
export const emailSchema = z.object({
  email: z
    .string({
      required_error: "Please provide an email address",
    })
    .email("Please provide a valid email address"),
});
export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Please provide a password",
      })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Please confirm your password",
      })
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
      .min(8, "Password must be at least 8 characters"),
    password: z
      .string({
        required_error: "Please provide a new password",
      })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Please confirm your new password",
      })
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
      .min(1, "Please provide a first name"),
    lastName: z
      .string({
        required_error: "Please provide a last name",
      })
      .min(1, "Please provide a last name"),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .min(10, { message: "Phone number must be at least 10 digits long" })
      .regex(/^\+?\d{10,14}$/, {
        message: "Phone number must be valid and can include a country code",
      }),
    password: z
      .string({
        required_error: "Please provide a password",
      })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Please confirm your password",
      })
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
    .min(8, "Password must be at least 8 characters"), // Ensure password length
});

// Schema for sign-up with additional fields
export const signUpSchema = baseUserSchema
  .extend({
    firstName: z
      .string({
        required_error: "Please provide a first name",
      })
      .min(1, "Please provide a first name"),
    lastName: z
      .string({
        required_error: "Please provide a last name",
      })
      .min(1, "Please provide a last name"),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .min(10, { message: "Phone number must be at least 10 digits long" })
      .regex(/^\+?\d{10,14}$/, {
        message: "Phone number must be valid and can include a country code",
      }),
    password: z
      .string({
        required_error: "Please provide a password",
      })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Please confirm your password",
      })
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
      required_error: "Please provide a first country",
    })
    .min(1, "Please provide a country"),
  firstName: z
    .string({
      required_error: "Please provide a first name",
    })
    .min(1, "Please provide a first name"),
  lastName: z
    .string({
      required_error: "Please provide a last name",
    })
    .min(1, "Please provide a last name"),
  city: z
    .string({
      required_error: "Please provide a city",
    })
    .min(1, "Please provide a city"),
  street: z
    .string({
      required_error: "Please provide a street",
    })
    .min(1, "Please provide a street"),
  unit: z
    .string({
      required_error: "Please provide an apartment/unit",
    })
    .min(1, "Please provide an apartment/unit"),
  email: z
    .string({
      required_error: "Please provide a valid email",
    })
    .email("Please provide a valid email"),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, { message: "Phone number must be at least 10 digits long" }) // Ensuring minimum length
    .regex(/^[+]?\d{10,14}$/, {
      message: "Phone number must be valid and can include a country code",
    }),
  deliveryTitle: z
    .string({
      required_error: "Please provide a delivery title",
    })
    .min(1, "Please provide a delivery title"),
  amountOfItems: z.number({
    required_error: "Please specify the amount of items",
  }),
  deliverySummary: z
    .string({
      required_error: "Please provide a delivery summary",
    })
    .min(1, "Please provide a delivery summary"),
});

export const parcelItemSchema = z.object({
  itemName: z
    .string({
      required_error: "Please provide an item name",
    })
    .min(1, "Please provide an item name"),
  itemCategory: z
    .string({
      required_error: "Please provide an item category",
    })
    .min(1, "Please provide an item category"),
  itemSubCategory: z
    .string({
      required_error: "Please provide an item subcategory",
    })
    .min(1, "Please provide an item subcategory"),
  hsCode: z
    .string({
      // required_error: "HS code is required",
    })
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
    .min(1, "Please provide an item name"),
  itemDescription: z
    .string({
      required_error: "Please provide an item description",
    })
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
