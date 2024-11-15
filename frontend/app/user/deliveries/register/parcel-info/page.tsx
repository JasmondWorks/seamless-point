"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";

import {
  deliverySourceSchema,
  parcelDocumentSchema,
  parcelItemSchema,
} from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CustomDialog from "@/app/_components/Dialogs/CustomDialog";
import { Edit, Plus, PlusSquareIcon, Trash2Icon } from "lucide-react";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Label } from "@/app/_components/ui/label";
import { formatCurrency } from "@/app/_lib/utils";
import ParcelItemsinfo from "@/app/_components/ParcelItemsinfo";
import { ConfirmDialog } from "@/app/_components/Dialogs/ConfirmDialog";

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

export default function ParcelInfo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [selectedParcelType, setSelectedParcelType] = useState("document");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null); // To store the ID of the item to delete
  const [documentDetails, setDocumentDetails] = useState<{
    itemName: string;
    itemDescription: string;
    weight: number;
    quantity: number;
    id?: string;
  } | null>(null);

  console.log(deleteItemId);
  console.log(isConfirmDialogOpen);

  const handleSelectParcelType = (value) => {
    setSelectedParcelType(value);
    console.log("Selected option:", value);
  };
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  const handleRemoveItem = (id: string) => {
    // Set the item to delete and show the confirmation dialog
    setDeleteItemId(id);
    setIsConfirmDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (deleteItemId) {
      // Logic for deleting the item, e.g., call API or update state
      items.map((item) => item.id !== deleteItemId);
      console.log(`Deleting item with ID: ${deleteItemId}`);
      // After deletion, close the confirmation dialog
      setIsConfirmDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  function handleEditItem(item) {
    setSelectedParcelType(item.type);
    setIsDialogOpen(true);
    setDocumentDetails(item);
  }
  function handleUpdateItem(item) {
    setItems(items.map((it) => (item.id === it.id ? item : it)));
  }
  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  const form = useForm<z.infer<typeof deliverySourceSchema>>({
    resolver: zodResolver(deliverySourceSchema),
    // defaultValues: {
    // },
  });

  async function onSubmit(data: z.infer<typeof deliverySourceSchema>) {
    // console.log(data);
    try {
      //   createUser(data);
    } catch (error) {}
  }
  return (
    <div className="max-w-5xl md:pr-20 md:pl-10 xl:pl-20 xl:pr-40">
      <div className="px-5">
        <CustomDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onClose={handleCloseDialog}
            selectedParcelType={selectedParcelType}
            onSelectParcelType={handleSelectParcelType}
            documentDetails={documentDetails}
          />
        </CustomDialog>
      </div>

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
            selectOptions={[]}
            placeholder="Select Packaging"
          />
          <CustomFormField
            className="col-span-2 md:col-span-1"
            label="Currency"
            name="currency"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Nigerian naira"
          />
          <ParcelItemsinfo
            items={items}
            onEditItem={handleEditItem}
            onRemoveItem={handleRemoveItem}
          />
          <button
            className="h-12 col-span-2 w-full bg-white border border-[#f6ac7b] rounded-lg flex items-center justify-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              setIsDialogOpen(true);
              setDocumentDetails(null);
            }}
          >
            <div className="h-5 w-5 bg-[#f6ac7b] rounded-md flex justify-center items-center">
              <Plus color="white" size={14} strokeWidth={3} />
            </div>
            <span className="font-medium text-brandSec">Add Item</span>
          </button>
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
          <PrivacyPolicyBlock />
          <Link
            className="block"
            href="/dashboard/deliveries/register/destination"
          >
            <ButtonFormSubmit text="Continue" />
          </Link>
        </form>
      </Form>
    </div>
  );
}

function DialogContent({
  onClose,
  onAddItem,
  onUpdateItem,
  selectedParcelType,
  onSelectParcelType,
  documentDetails,
}) {
  const isEditing = !!documentDetails; // Check if we are editing or adding
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="font-medium text-xl">
          {isEditing
            ? selectedParcelType[0].toUpperCase() + selectedParcelType.slice(1)
            : "Describe your item"}
        </h3>
        {!isEditing && (
          <RadioGroup
            value={selectedParcelType}
            onValueChange={onSelectParcelType}
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
            {/* Display the selected option */}
          </RadioGroup>
        )}
      </div>
      {selectedParcelType === "item" && (
        <ItemDialogContent
          selectedParcelType={selectedParcelType}
          onAddItem={onAddItem}
          onClose={onClose}
        />
      )}
      {selectedParcelType === "document" && (
        <DocumentDialogContent
          selectedParcelType={selectedParcelType}
          onAddItem={onAddItem}
          onUpdateItem={onUpdateItem}
          onClose={onClose}
          documentDetails={documentDetails}
        />
      )}
    </div>
  );
}

function ItemDialogContent({ onClose, onAddItem, selectedParcelType }) {
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

    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <CustomFormField
            label="Item name"
            name="itemName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="123 main street"
          />
          <CustomFormField
            label="Item Category"
            name="itemCategory"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Apt/unit"
          />
          <CustomFormField
            label="Item sub-category"
            name="itemSubCategory"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="you@company.com"
          />
          {/* <CustomFormField
            label="Select HS Code"
            name="hsCode"
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            placeholder="+234"
          /> */}
          <div className="grid md:grid-cols-3 gap-5 col-span-2">
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

function DocumentDialogContent({
  onClose,
  onAddItem,
  onUpdateItem,
  selectedParcelType,
  documentDetails, // Destructure documentDetails prop
}: {
  onClose: () => void;
  onAddItem: (item: any) => void;
  selectedParcelType: string;
  documentDetails?: {
    itemName: string;
    itemDescription: string;
    weight: number;
    quantity: number;
  };
}) {
  const form = useForm<z.infer<typeof parcelDocumentSchema>>({
    resolver: zodResolver(parcelDocumentSchema),
    defaultValues: documentDetails || {
      itemName: "",
      itemDescription: "",
      weight: 1,
      quantity: 1,
    },
  });

  const isEditing = !!documentDetails; // Check if we are editing or adding

  function onSubmit(data: z.infer<typeof parcelDocumentSchema>) {
    if (!data) return;

    // Prepare the item to be added or edited
    const newItem = {
      ...data,
      id: isEditing ? documentDetails?.id : crypto.randomUUID(), // Keep the same ID when editing
      type: selectedParcelType,
    };

    // Add or update the item
    if (isEditing) {
      // Edit the existing item
      onUpdateItem(newItem);
    } else {
      // Add a new item
      onAddItem(newItem);
    }

    onClose(); // Close the dialog after submit
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
        <ButtonFormSubmit text={isEditing ? "Update" : "Add"} />
      </form>
    </Form>
  );
}
