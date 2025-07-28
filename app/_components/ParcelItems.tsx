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
import { getCategories } from "@/app/_lib/actions";
import { parcelDocumentSchema, parcelItemSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
  const [selectedParcelType, setSelectedParcelType] = useState(
    EParcelType.item
  );
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
      itemDescription: "",
      weight: "",
      quantity: "",
    },
  });

  function onSubmit(data: z.infer<typeof parcelDocumentSchema>) {
    const itemDetails = {
      ...data,
      type: "document",
      name: data.description,
      id: selectedParcelItem ? selectedParcelItem.id : crypto.randomUUID(),
    };

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
        <div className="grid grid-cols-2 gap-5 gap-y-3">
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
            fieldType={FormFieldType.NUMBER}
            placeholder="1"
          />
          <div className="grid sm:grid-cols-3 gap-5 col-span-2">
            <CustomFormField
              label="Length (cm)"
              name="length"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="E.g 5cm"
            />
            <CustomFormField
              label="Width (cm)"
              name="width"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="E.g 5cm"
            />
            <CustomFormField
              label="Height (cm)"
              name="height"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="E.g 5cm"
            />
          </div>
        </div>
        <ButtonFormSubmit text="Continue" />
      </form>
    </Form>
  );
}

type SubCategory = {
  name: string;
  hsCodes: { label: string; hsCode: string }[];
};

type Category = {
  name: string;
  subcategories: SubCategory[];
};

interface ItemParcelFormProps {
  onAddParcelItem?: (item: any) => void;
  onEditParcelItem?: (item: any) => void;
  selectedParcelItem?: any;
}

function ItemParcelForm({
  onAddParcelItem,
  onEditParcelItem,
  selectedParcelItem,
}: ItemParcelFormProps) {
  const form = useForm<z.infer<typeof parcelItemSchema>>({
    resolver: zodResolver(parcelItemSchema),
    defaultValues: selectedParcelItem
      ? {
          description: selectedParcelItem.description || "",
          category: selectedParcelItem.category || "",
          subCategory: selectedParcelItem.subCategory || "",
          hsCode: selectedParcelItem.hsCode || "",
          weight: selectedParcelItem.weight || "",
          quantity: selectedParcelItem.quantity || "",
          value: selectedParcelItem.value || "",
          length: selectedParcelItem.length || "",
          width: selectedParcelItem.width || "",
          height: selectedParcelItem.height || "",
        }
      : {
          description: "",
          category: "",
          subCategory: "",
          hsCode: "",
          weight: "",
          quantity: "",
          value: "",
          length: "",
          width: "",
          height: "",
        },
  });

  console.log(selectedParcelItem);

  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [hsCodes, setHsCodes] = useState<{ label: string; hsCode: string }[]>(
    []
  );

  // Watch category and subcategory fields
  const selectedCategory = useWatch({
    control: form.control,
    name: "category",
  });
  const selectedSubCategory = useWatch({
    control: form.control,
    name: "subCategory",
  });

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoadingCategories(true);
        const res = await getCategories();
        if (res.status === "success" && res.data?.data?.categories) {
          setCategories(res.data.data.categories);
        } else {
          console.error("Failed to fetch categories:", res);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  // Update form when selectedParcelItem changes
  useEffect(() => {
    if (selectedParcelItem) {
      form.reset({
        description: selectedParcelItem.description || "",
        category: selectedParcelItem.category || "",
        subCategory: selectedParcelItem.subCategory || "",
        hsCode: selectedParcelItem.hsCode || "",
        weight: selectedParcelItem.weight || "",
        quantity: selectedParcelItem.quantity || "",
        value: selectedParcelItem.value || "",
        length: selectedParcelItem.length || "",
        width: selectedParcelItem.width || "",
        height: selectedParcelItem.height || "",
      });
    }
  }, [selectedParcelItem, form]);

  // Update subcategories when selectedCategory or categories change
  useEffect(() => {
    if (!selectedCategory) {
      setSubCategories([]);
      setHsCodes([]);
      form.setValue("subCategory", "");
      form.setValue("hsCode", "");
      return;
    }

    const matchedCategory = categories.find(
      (cat) => cat.name === selectedCategory
    );
    const newSubCategories = matchedCategory?.subcategories ?? [];
    setSubCategories(newSubCategories);

    // Reset subCategory and hsCode only if current subCategory is invalid
    const currentSubCategory = form.getValues("subCategory");
    if (
      currentSubCategory &&
      !newSubCategories.some((sub) => sub.name === currentSubCategory)
    ) {
      form.setValue("subCategory", "");
      form.setValue("hsCode", "");
      setHsCodes([]);
    }
  }, [selectedCategory, categories, form]);

  // Update HS codes when selectedSubCategory or subCategories change
  useEffect(() => {
    if (!selectedSubCategory) {
      setHsCodes([]);
      form.setValue("hsCode", "");
      return;
    }

    const matchedSubCategory = subCategories.find(
      (sub) => sub.name === selectedSubCategory
    );
    const newHsCodes = matchedSubCategory?.hsCodes ?? [];
    setHsCodes(newHsCodes);

    // Reset hsCode only if current hsCode is invalid
    const currentHsCode = form.getValues("hsCode");
    if (
      currentHsCode &&
      !newHsCodes.some((hs) => hs.hsCode === currentHsCode)
    ) {
      form.setValue("hsCode", "");
    }
  }, [selectedSubCategory, subCategories, form]);

  // Memoized select options for performance
  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        name: category.name,
        value: category.name,
      })),
    [categories]
  );

  const subCategoryOptions = useMemo(
    () =>
      subCategories.map((subcat) => ({
        name: subcat.name,
        value: subcat.name,
      })),
    [subCategories]
  );

  const hsCodeOptions = useMemo(
    () => hsCodes.map((item) => ({ name: item.label, value: item.hsCode })),
    [hsCodes]
  );

  function onSubmit(data: z.infer<typeof parcelItemSchema>) {
    const itemDetails = {
      ...data,
      type: "item",
      name: data.itemDescription,
      id: selectedParcelItem ? selectedParcelItem.id : crypto.randomUUID(),
    };

    selectedParcelItem
      ? onEditParcelItem?.(itemDetails)
      : onAddParcelItem?.(itemDetails);
  }

  function handleNestedFormSubmit(event: React.FormEvent) {
    event.stopPropagation();
    form.handleSubmit(onSubmit)(event);
  }

  // Debugging logs
  useEffect(() => {
    console.log("selectedCategory:", selectedCategory);
    console.log("subCategories:", subCategories);
    console.log("hsCodes:", hsCodes);
  }, [selectedCategory, subCategories, hsCodes]);

  return (
    <Form {...form}>
      <form onSubmit={handleNestedFormSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5 gap-y-3">
          <CustomFormField
            className="col-span-2"
            label="Item description"
            name="description"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="E.g., Electronics"
          />
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            disabled={isLoadingCategories || !categories.length}
            isLoading={isLoadingCategories}
            label="Item Category"
            name="category"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            placeholder="Select a category"
            selectOptions={categoryOptions}
          />
          <CustomFormField
            className="col-span-2 sm:col-span-1"
            label="Item sub-category"
            name="subCategory"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            selectOptions={subCategoryOptions}
            placeholder="Select a sub category"
            disabled={!selectedCategory || !subCategories.length}
          />
          <CustomFormField
            className="col-span-2"
            label="HS code"
            name="hsCode"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            selectOptions={hsCodeOptions}
            placeholder="Select an HS code"
            disabled={!selectedSubCategory || !hsCodes.length}
          />
          <div className="grid sm:grid-cols-3 gap-5 col-span-2">
            <CustomFormField
              label="Weight (kg)"
              name="weight"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="E.g., 5kg"
            />
            <CustomFormField
              label="Quantity"
              name="quantity"
              control={form.control}
              fieldType={FormFieldType.NUMBER}
              placeholder="E.g., 5"
            />
            <CustomFormField
              label="Item Value"
              name="value"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="E.g., N5000"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-5 col-span-2">
            <CustomFormField
              label="Length (cm)"
              name="length"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="E.g., 5cm"
            />
            <CustomFormField
              label="Width (cm)"
              name="width"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="E.g., 5cm"
            />
            <CustomFormField
              label="Height (cm)"
              name="height"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="E.g., 5cm"
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
  console.log(selectedParcelType);

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
