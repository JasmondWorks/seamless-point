import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { creditCardSchema } from "@/app/_lib/validation";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { useRef, useState } from "react";

type CreditCardFormData = z.infer<typeof creditCardSchema>;

export const CreditCardForm = ({ onSubmit, cardDetails = "" }) => {
  const form = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: cardDetails?.cardNumber || "0187 8179 8176 1891",
      expiryMonth: cardDetails?.expiryMonth || "05",
      expiryYear: cardDetails?.expiryYear || "24",
      cvv: cardDetails?.cvv || "339",
    },
  });

  const yearInputRef = useRef<HTMLInputElement | null>(null);
  const monthInputRef = useRef<HTMLInputElement | null>(null);

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Card Number */}
          <FormField
            name="cardNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 !space-y-1 col-span-2">
                <FormLabel>CARD NUMBER</FormLabel>
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      onChange={(e) =>
                        field.onChange(formatCardNumber(e.target.value))
                      }
                      className="shad-input border-0 !focus-visible:ring-0"
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-error" />
              </FormItem>
            )}
          />

          {/* Expiry Date */}
          {/* Expiry Date with Single Border */}
          <div className="flex-1 !space-y-1">
            {/* Expiry Date Inputs */}
            <FormLabel>EXPIRY</FormLabel>
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
              {/* Expiry Month */}
              <FormField
                name="expiryMonth"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        ref={(el) => {
                          field.ref(el);
                          monthInputRef.current = el; // Set ref for focus control
                        }}
                        placeholder="MM"
                        maxLength={2}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          field.onChange(value);
                          if (value.length === 2) {
                            yearInputRef.current?.focus(); // Focus the year field when month is filled
                          }
                        }}
                        className="shad-input border-0 !focus-visible:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Expiry Year */}
              <FormField
                name="expiryYear"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        ref={(el) => {
                          field.ref(el);
                          yearInputRef.current = el; // Set ref for focus control
                        }}
                        placeholder="YY"
                        maxLength={2}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && field.value === "") {
                            monthInputRef.current?.focus(); // Focus back to month when deleting year
                          }
                        }}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          field.onChange(value);
                          if (value.length === 0) {
                            monthInputRef.current?.focus(); // Focus back to month when year is empty
                          }
                        }}
                        className="shad-input border-0 !focus-visible:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Show single error message for expiry fields */}
            {(form.formState.errors.expiryMonth ||
              form.formState.errors.expiryYear) && (
              <FormMessage>
                {form.formState.errors.expiryMonth?.message ||
                  form.formState.errors.expiryYear?.message ||
                  "Invalid expiry date"}
              </FormMessage>
            )}
          </div>

          {/* CVV */}
          <FormField
            name="cvv"
            control={form.control}
            render={({ field }) => (
              <FormItem className={`flex-1 !space-y-1`}>
                <FormLabel>CVV</FormLabel>
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="123"
                      maxLength={3}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                      className="shad-input border-0"
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-error" />
              </FormItem>
            )}
          />
        </div>
        <ButtonFormSubmit text="I UNDERSTAND" />
      </form>
    </Form>
  );
};
