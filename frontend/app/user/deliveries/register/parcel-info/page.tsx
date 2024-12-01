"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";

import { parcelInfoSchema } from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { useForm } from "react-hook-form";
import ParcelItems from "@/app/_components/ParcelItems";
import { useDeliveryFormStore } from "@/app/_stores/createDeliveryFormStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialItems = [
  {
    id: "1",
    itemName: "Books, books, booksss...",
    quantity: 1,
    weight: 5,
    price: 50_000,
    type: "document",
    itemDescription: "Lengthyyyyyyyyyyyyyyyyyyyyyyyyyyyy...",
  },
  {
    id: "2",
    itemName: "Clothing items",
    itemCategory: "Men's",
    itemSubCategory: "Casual",
    hsCode: "8115543766",
    weight: 3,
    quantity: 7,
    price: 130_000,
    type: "item",
    value: 1,
  },
];
export default function ParcelInfo() {
  const [parcelItems, setParcelItems] = useState(initialItems);

  const router = useRouter();

  const form = useForm<z.infer<typeof parcelInfoSchema>>({
    resolver: zodResolver(parcelInfoSchema),
    // defaultValues: {
    // },
    defaultValues: {},
  });

  // async function onSubmit(data: z.infer<typeof parcelInfoSchema>) {
  //   console.log(data);
  //   try {
  //     //   signupUser(data);
  //   } catch (error) {}
  // }

  async function onSubmit() {
    router.push("/user/deliveries/register/select-carrier");
  }
  function handleSubmit() {
    router.push("/user/deliveries/register/select-carrier");
  }

  return (
    <div className="max-w-5xl md:pr-20 md:pl-10 xl:pl-20 xl:pr-40">
      <h1 className="headline text-center mb-10">Parcel information</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-5"
        >
          <CustomFormField
            className="col-span-2 md:col-span-1"
            label="Select Packaging"
            name="packaging"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            selectOptions={["plastic", "metal"]}
            placeholder="Select Packaging"
          />
          <CustomFormField
            className="col-span-2 md:col-span-1"
            label="Currency"
            name="currency"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            selectOptions={["Nigerian naira (NGN)", "US Dollars (USD)"]}
            placeholder="Nigerian naira"
          />
          <ParcelItems />
          <CustomFormField
            className="col-span-2"
            title="Upload proof of purchase"
            name="proofOfPurchase"
            control={form.control}
            fieldType={FormFieldType.FILE}
          />
          <CustomFormField
            className="col-span-2"
            title="Add a picture of your package on a scale or with a measuring tape"
            name="packageImage"
            control={form.control}
            fieldType={FormFieldType.FILE}
          />
          <div className="flex flex-col gap-y-5 col-span-2">
            <PrivacyPolicyBlock />
            <ButtonFormSubmit onClick={handleSubmit} text="Continue" />
          </div>
        </form>
      </Form>

      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-5"
        ></form>
      </Form> */}
    </div>
  );
}
