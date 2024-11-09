import { z } from "zod";

// Base schema for common fields (sign-in and sign-up)
export const baseUserSchema = z.object({
  email: z
    .string({
      required_error: "Please provide a valid email",
    })
    .email("Please provide a valid email"), // Validate email format
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
      .min(1, "Please provide a first name"), // Ensure first name is not empty
    lastName: z
      .string({
        required_error: "Please provide a last name",
      })
      .min(1, "Please provide a last name"), // Ensure last name is not empty
    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .min(10, { message: "Phone number must be at least 10 digits long" }) // Ensuring minimum length
      .regex(/^[+]?\d{10,14}$/, {
        message: "Phone number must be valid and can include a country code",
      }),
    confirmPassword: z
      .string({
        required_error: "Please confirm your password",
      })
      .min(8, "Password must be at least 8 characters"), // Ensure confirmPassword meets the password length rule
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
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
