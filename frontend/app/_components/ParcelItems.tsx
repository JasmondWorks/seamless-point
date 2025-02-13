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
import { itemCategory } from "@/app/_lib/constants";
import { parcelDocumentSchema, parcelItemSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum EDialogContent {
  parcelEditItem = "parcel_edit_item",
  parcelAddItem = "parcel_add_item",
  parcelRemoveItem = "parcel_remove_item",
}
enum EParcelType {
  document = "document",
  item = "item",
}

export default function ParcelItems({
  parcelItems,
  parcelActions,
  selectedParcelItem,
}: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedParcelType, setSelectedParcelType] = useState("document");
  const [selectedDialogContent, setSelectedDialogContent] = useState("");
  const { addItem, removeItem, editItem, selectItem } = parcelActions;

  function handleAddParcelItem(item: any) {
    addItem(item);
    setIsDialogOpen(false);
  }
  function handleEditParcelItem(item: any) {
    editItem(item);
    setIsDialogOpen(false);
  }
  function handleRemoveParcelItem() {
    console.log(selectedParcelItem);
    removeItem(selectedParcelItem);
    setIsDialogOpen(false);
  }
  // Clear selected parcel item on exit or submission
  useEffect(() => {
    if (selectedDialogContent === EDialogContent.parcelAddItem)
      parcelActions.selectItem(null);
  }, [selectedDialogContent]);

  // Parcel state handlers

  // Open dialog content handlers
  function handleOpenAddParcelItemDialog() {
    setIsDialogOpen(true);
    setSelectedParcelType(EParcelType.document);
    setSelectedDialogContent(EDialogContent.parcelAddItem);
  }
  function handleOpenRemoveParcelItemDialog(item: any) {
    setIsDialogOpen(true);
    selectItem(item);
    setSelectedDialogContent(EDialogContent.parcelRemoveItem);
  }
  function handleOpenEditParcelItemDialog(item: any) {
    selectItem(item);
    setSelectedDialogContent(EDialogContent.parcelEditItem);
    setIsDialogOpen(true);
  }

  return (
    <div className="col-span-2 flex flex-col gap-y-5">
      <ParcelItemsList
        items={parcelItems}
        onOpenEditParcelItemDialog={handleOpenEditParcelItemDialog}
        onOpenRemoveParcelItemDialog={handleOpenRemoveParcelItemDialog}
        parcelActions={parcelActions}
      />
      <button
        className="h-12 col-span-2 w-full bg-white border border-[#f6ac7b] rounded-lg flex items-center justify-center gap-3"
        onClick={(e: any) => {
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
              onAddParcelItem={handleAddParcelItem}
            />
          )}
          {selectedDialogContent === EDialogContent.parcelEditItem && (
            <EditParcelItemDialogContent
              selectedParcelItem={selectedParcelItem}
              onEditParcelItem={handleEditParcelItem}
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

function DocumentParcelForm({
  onAddParcelItem,
  onEditParcelItem,
  selectedParcelItem,
}: {
  onAddParcelItem?: (item: any) => void;
  onEditParcelItem?: (item: any) => void;
  selectedParcelItem?: any;
}) {
  const form = useForm<z.infer<typeof parcelDocumentSchema>>({
    resolver: zodResolver(parcelDocumentSchema),
    defaultValues: selectedParcelItem || {
      name: "",
      description: "",
      weight: "",
      quantity: "",
    },
  });

  function onSubmit(data: z.infer<typeof parcelDocumentSchema>) {
    const itemDetails = {
      ...data,
      type: "document",
      id: selectedParcelItem ? selectedParcelItem.id : crypto.randomUUID(),
    };
    console.log(itemDetails);

    selectedParcelItem
      ? onEditParcelItem?.(itemDetails)
      : onAddParcelItem?.(itemDetails);
  }

  function handleNestedFormSubmit(event: React.FormEvent) {
    // Prevent the outer form submission by stopping propagation
    event.stopPropagation();
    form.handleSubmit(onSubmit)(event); // Trigger the inner form submission
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleNestedFormSubmit} // Use custom submit handler
        className="space-y-5"
      >
        <div className="grid grid-cols-2 gap-5">
          <CustomFormField
            className="col-span-2"
            label="Item name"
            name="name"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Sofa"
          />
          <CustomFormField
            className="col-span-2"
            label="Item description"
            name="description"
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

function ItemParcelForm({
  onAddParcelItem,
  onEditParcelItem,
  selectedParcelItem,
}: {
  onAddParcelItem?: (item: any) => void;
  onEditParcelItem?: (item: any) => void;
  selectedParcelItem?: any;
}) {
  const form = useForm<z.infer<typeof parcelItemSchema>>({
    resolver: zodResolver(parcelItemSchema),
    defaultValues: selectedParcelItem || {
      name: "",
      category: "",
      subCategory: "",
      hsCode: "",
      weight: "",
      quantity: "",
      value: "",
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
      ? onEditParcelItem?.(itemDetails)
      : onAddParcelItem?.(itemDetails);
  }

  function handleNestedFormSubmit(event: React.FormEvent) {
    // Prevent the outer form submission
    event.stopPropagation();
    form.handleSubmit(onSubmit)(event); // Trigger the inner form submission
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleNestedFormSubmit} // Use custom submit handler
        className="space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            label="Item name"
            name="name"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="123 main street"
          />
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            label="Item Category"
            name="category"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            selectOptions={itemCategory}
            placeholder="Select a category"
          />
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            label="Item sub-category"
            name="subCategory"
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
              placeholder="5"
            />
            <CustomFormField
              label="Quantity"
              name="quantity"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="10"
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
  onAddParcelItem,
}: any) {
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
                <RadioGroupItem value="item" id="item" />
                <Label htmlFor="item">Item</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="document" id="document" />
                <Label htmlFor="document">Document</Label>
              </div>
            </RadioGroup>
          </DialogDescription>
        </div>
      </DialogTitle>
      {selectedParcelType === EParcelType.document && (
        <DocumentParcelForm onAddParcelItem={onAddParcelItem} />
      )}
      {selectedParcelType === EParcelType.item && (
        <ItemParcelForm onAddParcelItem={onAddParcelItem} />
      )}
    </div>
  );
}

function EditParcelItemDialogContent({
  selectedParcelItem,
  onEditParcelItem,
}: any) {
  return (
    <div>
      <DialogTitle>
        <span className="font-medium text-xl">
          Update your {selectedParcelItem.type}
        </span>
      </DialogTitle>
      {selectedParcelItem.type === EParcelType.document && (
        <DocumentParcelForm
          onEditParcelItem={onEditParcelItem}
          selectedParcelItem={selectedParcelItem}
        />
      )}
      {selectedParcelItem.type === EParcelType.item && (
        <ItemParcelForm
          onEditParcelItem={onEditParcelItem}
          selectedParcelItem={selectedParcelItem}
        />
      )}
    </div>
  );
}
