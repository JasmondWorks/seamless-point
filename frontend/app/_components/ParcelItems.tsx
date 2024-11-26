"use client";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import ParcelItemsList from "@/app/_components/ParcelItemsList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Form } from "@/app/_components/ui/form";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { useFormContext } from "@/app/_contexts/FormContext";
import { parcelDocumentSchema, parcelItemSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    quantity: 7,
    weight: 3,
    price: 130_000,
    type: "item",
  },
];

enum EDialogContent {
  document = "document",
  item = "item",
  parcelItemEditDocument = "PARCEL_EDIT_DOCUMENT",
  parcelItemEditItem = "PARCEL_EDIT_ITEM",
}

export default function ParcelItems() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [parcelItems, setParcelItems] = useState([]);
  const [selectedParcelType, setSelectedParcelType] = useState("document");
  const [selectedDialog, setSelectedDialog] = useState("");
  const [parcelItemEdit, setParcelItemEdit] = useState({});
  const { formData, setFormData } = useFormContext();

  useEffect(() => {
    setFormData({
      ...formData,
      items: parcelItems,
      onEditParcelItem: handleEditParcelItem,
      onRemoveParcelItem: handleRemoveParcelItem,
      onAddParcelItem: handleAddParcelItem,
      onSetParcelEdit: handleSetParcelEdit,
    });
  }, [parcelItems]);

  function handleSetParcelEdit(type, item) {
    setParcelItemEdit({ type, item });
  }

  function handleRemoveParcelItem(id: string) {
    setParcelItems(parcelItems.filter((item) => item.id !== id));
    setIsDialogOpen(false);
  }
  function handleEditParcelItem(id: string, editedItem: any) {
    setParcelItems(
      parcelItems.map((item) => (item.id === id ? editedItem : item))
    );
    setIsDialogOpen(false);
  }
  function handleAddParcelItem(item: any) {
    setParcelItems((prevItems) => [...prevItems, item]);
    setIsDialogOpen(false);
  }

  function handleOpenAddParcelItemDialog() {
    setIsDialogOpen(true);
    setSelectedParcelType(EDialogContent.document);
  }

  return (
    <div className="col-span-2 flex flex-col gap-y-5">
      <ParcelItemsList />
      <button
        className="h-12 col-span-2 w-full bg-white border border-[#f6ac7b] rounded-lg flex items-center justify-center gap-3"
        onClick={(e) => {
          e.preventDefault();
          handleOpenAddParcelItemDialog();
        }}
      >
        <div className="h-5 w-5 bg-[#f6ac7b] rounded-md flex justify-center items-center">
          <Plus color="white" size={14} strokeWidth={3} />
        </div>
        <span className="font-medium text-brandSec">Add Item</span>
      </button>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {!parcelItemEdit.type && (
            <DialogTitle>
              <div className="space-y-2">
                <span className="font-medium text-xl">Describe your item</span>
                <DialogDescription asChild>
                  <RadioGroup
                    value={selectedParcelType}
                    onValueChange={setSelectedParcelType}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="document" id="document" />
                      <Label htmlFor="document">Document</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="item" id="item" />
                      <Label htmlFor="item">Item</Label>
                    </div>
                  </RadioGroup>
                </DialogDescription>
              </div>
            </DialogTitle>
          )}
          {parcelItemEdit.type && (
            <h3 className="font-medium text-xl">
              Update your {parcelItemEdit.type}
            </h3>
          )}
          {selectedParcelType === EDialogContent.document && (
            <DocumentDialogContent />
          )}
          {selectedParcelType === EDialogContent.item && <ItemDialogContent />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DocumentDialogContent() {
  const {
    formData: { onAddParcelItem, items },
  } = useFormContext();

  const form = useForm<z.infer<typeof parcelDocumentSchema>>({
    resolver: zodResolver(parcelDocumentSchema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      weight: 1,
      quantity: 1,
    },
  });

  console.log(items);

  function onSubmit(data) {
    const newItem = { ...data, type: "document", id: crypto.randomUUID() };
    console.log(newItem);
    onAddParcelItem(newItem);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <CustomFormField
            className="col-span-2"
            label="Item name"
            name="itemName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Sofa"
          />
          <CustomFormField
            className="col-span-2"
            label="Item description"
            name="itemDescription"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            placeholder="Detailed description..."
          />
          <CustomFormField
            label="Item weight (kg)"
            name="weight"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="1"
          />
          <CustomFormField
            label="Quantity"
            name="quantity"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="1"
          />
        </div>
        <ButtonFormSubmit text="Continue" />
      </form>
    </Form>
  );
}

function ItemDialogContent() {
  const form = useForm<z.infer<typeof parcelItemSchema>>({
    resolver: zodResolver(parcelItemSchema),
    defaultValues: {
      itemName: "",
      itemCategory: "",
      itemSubCategory: "",
      hsCode: "",
      weight: 1,
      quantity: 1,
      value: 1,
    },
  });

  function onSubmit(data: z.infer<typeof parcelItemSchema>) {
    console.log(data);

    if (!data) return;

    // onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            label="Item name"
            name="itemName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="123 main street"
          />
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            label="Item Category"
            name="itemCategory"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Apt/unit"
          />
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            label="Item sub-category"
            name="itemSubCategory"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="you@company.com"
          />
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            label="Select HS Code"
            name="hsCode"
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            placeholder="+234"
          />
          <div className="grid sm:grid-cols-3 gap-5 col-span-2">
            <CustomFormField
              label="Weight (kg)"
              name="weight"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="1"
            />
            <CustomFormField
              label="Quantity"
              name="quantity"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="1"
            />
            <CustomFormField
              label="Item Value"
              name="value"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="N2, 000"
            />
          </div>
        </div>
        <ButtonFormSubmit text="Continue" />
      </form>
    </Form>
  );
}
