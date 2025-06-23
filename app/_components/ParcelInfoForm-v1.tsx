import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { useState } from "react";

import { Form } from "@/app/_components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import ParcelItems from "@/app/_components/ParcelItems";
import { currencies, packagingType } from "@/app/_lib/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { parcelInfoSchema } from "@/app/_lib/validation";

import { useForm } from "react-hook-form";
import { base64ToFile, fileToBase64 } from "@/app/_lib/utils";
import toast from "react-hot-toast";
import Button, { ButtonVariant } from "@/app/_components/Button";

export default function ParcelInfoForm({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
  const [selectedParcelItem, setSelectedParcelItem] = useState<any>(null);

  const parcelDetails = useCreateDeliveryStore((store) => store.parcelDetails);
  const parcelDetailsCopy = { ...parcelDetails };
  delete parcelDetailsCopy.parcelItems;

  const [parcelItems, setParcelItems] = useState<any[]>(
    parcelDetails?.parcelItems || []
  );

  console.log(parcelItems);

  // const biggestLength = parcelItems.reduce(
  //   (biggest, item) =>
  //     item.length > biggest ? (biggest = item.length) : biggest,
  //   parcelItems[0]?.length
  // );
  // const biggestWidth = parcelItems.reduce(
  //   (biggest, item) =>
  //     item.width > biggest ? (biggest = item.width) : biggest,
  //   parcelItems[0]?.width
  // );
  // const biggestHeight = parcelItems.reduce(
  //   (biggest, item) =>
  //     item.height > biggest ? (biggest = item.height) : biggest,
  //   parcelItems[0]?.height
  // );

  // console.log("Biggest Length", biggestLength);
  // console.log("Biggest Width", biggestWidth);
  // console.log("Biggest Height", biggestHeight);

  console.log("Parcel items", parcelItems);
  const form = useForm<z.infer<typeof parcelInfoSchema>>({
    resolver: zodResolver(parcelInfoSchema),
    defaultValues: {
      ...parcelDetailsCopy,
      packageImage: parcelDetailsCopy?.packageImage?.base64File
        ? base64ToFile(
            parcelDetailsCopy.packageImage.base64File,
            parcelDetailsCopy.packageImage.name || "defaultName.jpg"
          )
        : undefined,
      proofOfPurchase: parcelDetailsCopy?.proofOfPurchase?.base64File
        ? base64ToFile(
            parcelDetailsCopy.proofOfPurchase.base64File,
            parcelDetailsCopy.proofOfPurchase.name || "defaultName.pdf"
          )
        : undefined,
    },
  });
  // const addParcelFile = useCreateDeliveryStore((store) => store.addParcelFile);
  const addParcelDetails = useCreateDeliveryStore(
    (store) => store.addParcelDetails
  );

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

  async function onSubmit(data: z.infer<typeof parcelInfoSchema>) {
    console.log("submitting...");
    if (!parcelItems.length)
      return toast.error("Please add at least one parcel item");

    let parcelDetails = data;

    if (data.packageImage && data.proofOfPurchase) {
      try {
        const base64packageImage = await fileToBase64(data.packageImage);
        const base64proofOfPurchase = await fileToBase64(data.proofOfPurchase);

        if (base64packageImage && base64proofOfPurchase) {
          parcelDetails = {
            ...data,
            packageImage: {
              base64File: base64packageImage,
              name: data.packageImage.name,
            },
            proofOfPurchase: {
              base64File: base64proofOfPurchase,
              name: data.proofOfPurchase.name,
            },
            parcelItems,
          };

          addParcelDetails(parcelDetails);
          // Navigate to the next page
          onSetActivePage("select-rate");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
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
          selectOptions={packagingType.map((type) => ({
            name: type,
            value: type,
          }))}
          placeholder="Select Packaging"
        />
        <CustomFormField
          className="col-span-2 md:col-span-1"
          label="Currency"
          name="currency"
          control={form.control}
          fieldType={FormFieldType.SELECT}
          selectOptions={currencies.map((currency) => ({
            name: currency.value,
            value: currency.value,
          }))}
          placeholder="E.g Nigerian naira"
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
          selectedFile={parcelDetailsCopy?.proofOfPurchase}
          accept=".pdf,.doc,.docx"
        />
        <CustomFormField
          className="col-span-2"
          title="Add a picture of your package on a scale or with a measuring tape"
          name="packageImage"
          control={form.control}
          fieldType={FormFieldType.FILE}
          selectedFile={parcelDetailsCopy?.packageImage}
          accept="image/jpeg, image/png"
        />
        <div className="flex flex-col gap-y-5 col-span-2">
          <PrivacyPolicyBlock />
          {/* <ButtonFormSubmit text="Continue" /> */}
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => onSetActivePage("receiver")}
              variant={ButtonVariant.fill}
              className="!bg-[#fde9d7] !text-brandSec"
              text="Previous"
              isRoundedLarge
            />

            <Button
              type="submit"
              variant={ButtonVariant.fill}
              className="!text-white !bg-brandSec"
              text="Continue"
              isRoundedLarge
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
