"use client";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import ConfirmDialogContent from "@/app/_components/ConfirmDialogContent";
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

enum EDialogContent {
  parcelEditItem = "parcel_edit_item",
  parcelAddItem = "parcel_add_item",
  parcelRemoveItem = "parcel_remove_item",
}
enum EParcelType {
  document = "document",
  item = "item",
}

export default function ParcelItems() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [parcelItems, setParcelItems] = useState(initialItems);
  const [selectedParcelType, setSelectedParcelType] = useState("document");
  const [selectedParcelItem, setSelectedParcelItem] = useState(null);
  const [selectedDialogContent, setSelectedDialogContent] = useState("");
  const { formData, setFormData } = useFormContext();

  useEffect(() => {
    setFormData({
      ...formData,
      items: parcelItems,
      onEditParcelItem: handleEditParcelItem,
      onRemoveParcelItem: handleRemoveParcelItem,
      onAddParcelItem: handleAddParcelItem,
      onOpenRemoveParcelItemDialog: handleOpenRemoveParcelItemDialog,
      onOpenEditParcelItemDialog: handleOpenEditParcelItemDialog,
      selectedParcelItem,
    });
  }, [parcelItems, selectedParcelItem]);

  // Clear selected parcel item on exit or submission
  useEffect(() => {
    if (selectedDialogContent === EDialogContent.parcelAddItem)
      setSelectedParcelItem(null);
  }, [selectedDialogContent]);

  // Parcel state handlers
  function handleRemoveParcelItem() {
    setParcelItems(
      parcelItems.filter((item) => item.id !== selectedParcelItem.id)
    );
    setIsDialogOpen(false);
  }
  function handleEditParcelItem(editedItem: any) {
    setParcelItems(
      parcelItems.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
    setIsDialogOpen(false);
  }
  function handleAddParcelItem(item: any) {
    setParcelItems((prevItems) => [...prevItems, item]);
    setIsDialogOpen(false);
  }

  // Open dialog content handlers
  function handleOpenAddParcelItemDialog() {
    setIsDialogOpen(true);
    setSelectedParcelType(EParcelType.document);
    setSelectedDialogContent(EDialogContent.parcelAddItem);
  }
  function handleOpenRemoveParcelItemDialog(item) {
    setIsDialogOpen(true);
    setSelectedParcelItem(item);
    setSelectedDialogContent(EDialogContent.parcelRemoveItem);
  }
  function handleOpenEditParcelItemDialog(item) {
    setSelectedParcelItem(item);
    setSelectedDialogContent(EDialogContent.parcelEditItem);
    setIsDialogOpen(true);
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
          {selectedDialogContent === EDialogContent.parcelAddItem && (
            <AddParcelItemDialogContent
              selectedParcelType={selectedParcelType}
              setSelectedParcelType={setSelectedParcelType}
            />
          )}
          {selectedDialogContent === EDialogContent.parcelEditItem && (
            <EditParcelItemDialogContent
              selectedParcelItem={selectedParcelItem}
            />
          )}
          {selectedDialogContent === EDialogContent.parcelRemoveItem && (
            <ConfirmDialogContent onConfirm={handleRemoveParcelItem} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DocumentParcelForm() {
  const {
    formData: { onAddParcelItem, onEditParcelItem, selectedParcelItem },
  } = useFormContext();
  console.log(selectedParcelItem);

  const form = useForm<z.infer<typeof parcelDocumentSchema>>({
    resolver: zodResolver(parcelDocumentSchema),
    defaultValues: selectedParcelItem || {
      itemName: "",
      itemDescription: "",
      weight: "",
      quantity: "",
    },
  });

  function onSubmit(data) {
    const itemDetails = {
      ...data,
      type: "document",
      id: selectedParcelItem ? selectedParcelItem.id : crypto.randomUUID(),
    };
    console.log(itemDetails);

    selectedParcelItem
      ? onEditParcelItem(itemDetails)
      : onAddParcelItem(itemDetails);
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

function ItemParcelForm() {
  const {
    formData: { onAddParcelItem, onEditParcelItem, selectedParcelItem },
  } = useFormContext();
  console.log(selectedParcelItem);

  const form = useForm<z.infer<typeof parcelItemSchema>>({
    resolver: zodResolver(parcelItemSchema),
    defaultValues: selectedParcelItem || {
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
    const itemDetails = {
      ...data,
      type: "item",
      id: selectedParcelItem ? selectedParcelItem.id : crypto.randomUUID(),
    };
    console.log(itemDetails);

    selectedParcelItem
      ? onEditParcelItem(itemDetails)
      : onAddParcelItem(itemDetails);
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

function AddParcelItemDialogContent({
  selectedParcelType,
  setSelectedParcelType,
}) {
  return (
    <div className="flex flex-col gap-y-5">
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
      {selectedParcelType === EParcelType.document && <DocumentParcelForm />}
      {selectedParcelType === EParcelType.item && <ItemParcelForm />}
    </div>
  );
}

function EditParcelItemDialogContent({ selectedParcelItem }) {
  return (
    <div>
      <DialogTitle>
        <span className="font-medium text-xl">
          Update your {selectedParcelItem.type}
        </span>
      </DialogTitle>
      {selectedParcelItem.type === EParcelType.document && (
        <DocumentParcelForm />
      )}
      {selectedParcelItem.type === EParcelType.item && <ItemParcelForm />}
    </div>
  );
}
