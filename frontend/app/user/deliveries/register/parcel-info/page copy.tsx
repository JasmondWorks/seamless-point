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
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { currencies, packagingType } from "@/app/_lib/constants";
import { set } from "mongoose";

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
  const parcelDetails = useCreateDeliveryStore((store) => store.parcelDetails);
  console.log(parcelDetails);

  const [parcelItems, setParcelItems] = useState<any[]>(
    parcelDetails?.parcelItems || []
  );
  const [selectedParcelItem, setSelectedParcelItem] = useState<any>(null);
  const addParcelDetails = useCreateDeliveryStore(
    (store) => store.addParcelDetails
  );
  const addpackageImageFile = useCreateDeliveryStore(
    (store) => store.addpackageImageFile
  );

  const router = useRouter();

  const parcelActions = {
    addItem: handleAddParcelItem,
    removeItem: handleRemoveParcelItem,
    editItem: handleEditParcelItem,
    selectItem: handleSelectParcelItem,
  };

  function handleRemoveParcelItem() {
    setParcelItems(
      parcelItems.filter((item: any) => item.id !== selectedParcelItem?.id)
    );
  }
  function handleEditParcelItem(editedItem: any) {
    setParcelItems(
      parcelItems.map((item: any) =>
        item.id === editedItem.id ? editedItem : item
      )
    );
  }
  function handleAddParcelItem(item: any) {
    setParcelItems((prevItems: any) => [...prevItems, item]);
  }
  function handleSelectParcelItem(item: any) {
    setSelectedParcelItem(item);
  }
  const form = useForm<z.infer<typeof parcelInfoSchema>>({
    resolver: zodResolver(parcelInfoSchema),
    defaultValues: parcelDetails || {},
  });

  async function onSubmit(data: z.infer<typeof parcelInfoSchema>) {
    try {
      // Submit logic
      const parcelDetails = {
        parcelItems,
        ...data,
      };

      addParcelDetails(parcelDetails);
      // Navigate to the next page
      router.push("/user/deliveries/register/select-courier");
    } catch (error) {
      console.error(error);
    }
  }
  function handleSubmit() {
    const isValid = form.formState.isValid;
    // if (!isValid) {
    //   toast.error("All fields must be filled");
    //   return;
    // }
    form.handleSubmit(onSubmit)();
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
            name="packagingType"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            selectOptions={packagingType}
            placeholder="Select Packaging"
          />
          <CustomFormField
            className="col-span-2 md:col-span-1"
            label="Currency"
            name="currency"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            selectOptions={currencies.map((currency) => currency.value)}
            // selectValue={
            //   currencies.find(
            //     (currency) => currency.name === parcelDetails?.currency
            //   )?.value
            // }
            placeholder="Nigerian naira"
          />
          <ParcelItems
            parcelItems={parcelItems}
            parcelActions={parcelActions}
            selectedParcelItem={selectedParcelItem}
          />
          <CustomFormField
            className="col-span-2"
            title="Upload proof of purchase"
            name="proofOfPurchase"
            control={form.control}
            fieldType={FormFieldType.FILE}
            addToStore={addpackageImageFile}
            file={form.getValues("proofOfPurchase")}
            fieldName="proofOfPurchase"
          />
          <CustomFormField
            className="col-span-2"
            title="Add a picture of your package on a scale or with a measuring tape"
            name="packageImage"
            control={form.control}
            fieldType={FormFieldType.FILE}
            addToStore={addpackageImageFile}
            file={form.getValues("packageImage")}
            fieldName="packageImage"
          />
          <div className="flex flex-col gap-y-5 col-span-2">
            <PrivacyPolicyBlock />
            <ButtonFormSubmit text="Continue" />
          </div>
        </form>
      </Form>
    </div>
  );
}
