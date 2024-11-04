"use client";

// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Badge, { BadgeVariant } from "@/components/Badge";
import Button, { ButtonVariant } from "@/components/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

import { deliverySourceSchema, signUpSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import React, { useState } from "react";
import { AlertCircle, Check, CheckCircle2 } from "lucide-react";

export default function Settings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  useState(false);
  const form = useForm<z.infer<typeof deliverySourceSchema>>({
    resolver: zodResolver(deliverySourceSchema),
    // defaultValues: {
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phone: "",
    //   password: "",
    //   confirmPassword: "",
    // },
  });

  async function onSubmit(data: z.infer<typeof deliverySourceSchema>) {
    // console.log(data);
    try {
      //   createUser(data);
    } catch (error) {}
  }
  function handleInitiateAccountDelete() {
    setIsDialogOpen(true);
    setDialogContent("account/initiate-delete");
  }
  function handleDeleteAccount() {
    setDialogContent("account/deleted");
  }
  function handleUpdateAccount() {
    setIsDialogOpen(true);
    setDialogContent("account/updated");
  }
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="space-y-3">
            <DialogTitle className="flex flex-col items-start gap-5">
              {dialogContent === "account/initiate-delete" && (
                <>
                  <Badge variant={BadgeVariant.red}>
                    <AlertCircle color="red" />
                  </Badge>
                  <span>Delete Account</span>
                </>
              )}
              {dialogContent === "account/deleted" && (
                <>
                  <Badge variant={BadgeVariant.green}>
                    <div className="p-1 bg-customGreen rounded-full">
                      <Check color="white" />
                    </div>
                  </Badge>
                  <span>Account Deleted</span>
                </>
              )}
              {dialogContent === "account/updated" && (
                <>
                  <Badge variant={BadgeVariant.green}>
                    <div className="p-1 bg-customGreen rounded-full">
                      <Check color="white" />
                    </div>
                  </Badge>
                  <span>Account details updated</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {dialogContent === "account/initiate-delete" && (
                <span>
                  Are you sure you want to delete your account? The action
                  cannot be undone
                </span>
              )}
              {dialogContent === "account/deleted" && (
                <span>
                  Your account has successfully been deleted. You can return to
                  the home page
                </span>
              )}
              {dialogContent === "account/updated" && (
                <span>Your account details have successfully been updated</span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-5">
            {dialogContent === "account/initiate-delete" && (
              <>
                <Button
                  variant={ButtonVariant.outline}
                  isRoundedLarge
                  text="No"
                  className="!text-neutral-400 border-neutral-200 flex-1"
                />
                <Button
                  onClick={handleDeleteAccount}
                  variant={ButtonVariant.fill}
                  isRoundedLarge
                  className="bg-red-600 flex-1"
                  text="Yes"
                />
              </>
            )}
            {dialogContent === "account/deleted" && (
              <Button
                variant={ButtonVariant.fill}
                text="Ok"
                className="flex-1 bg-customGreen"
                isRoundedLarge
              />
            )}
            {dialogContent === "account/updated" && (
              <Button
                variant={ButtonVariant.fill}
                text="Ok"
                className="flex-1 bg-customGreen"
                isRoundedLarge
              />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between items-center py-3 border-b border-neutral-300">
        <h1 className="headline">Settings</h1>
        <button onClick={handleInitiateAccountDelete}>
          <Badge variant={BadgeVariant.red}>Delete account</Badge>
        </button>
      </div>
      <Image
        src="/assets/images/profile-image.png"
        alt="profile image"
        width={200}
        height={200}
        className="w-36 aspect-square rounded-full"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="lg:grid space-y-5 lg:grid-cols-2 gap-5 lg:space-y-0">
            <CustomFormField
              label="First name"
              name="firstName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="John"
            />
            <CustomFormField
              label="Last name"
              name="lastName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Deo"
            />
            <CustomFormField
              label="Date of birth"
              name="dateOfBirth"
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              placeholder="dd/mm/yyyy"
            />
            <CustomFormField
              label="Gender"
              name="gender"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Male, Female"
            />
            <CustomFormField
              className="col-span-2"
              label="Email"
              name="email"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="you@company.com]"
            />
          </div>
          <Button
            onClick={handleUpdateAccount}
            variant={ButtonVariant.fill}
            text="Save"
            className="bg-customGreen text-white"
            isRoundedLarge
          />
        </form>
      </Form>
      <h2 className="border-b border-neutral-300 py-3 text-2xl font-bold">
        Change password
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="lg:grid space-y-5 lg:grid-cols-2 gap-5 lg:space-y-0">
            <CustomFormField
              className="col-span-2"
              label="Current password"
              name="currentPassword"
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
            />
            <CustomFormField
              label="New password"
              name="newPassword"
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
            />
            <CustomFormField
              label="Confirm new password"
              name="confirmNewPassword"
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
            />
          </div>
          <Button
            variant={ButtonVariant.fill}
            text="Save"
            className="bg-customGreen text-white"
            isRoundedLarge
          />
        </form>
      </Form>
    </>
  );
}
