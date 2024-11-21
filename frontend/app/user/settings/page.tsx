import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";

import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";

import { deliverySourceSchema, signUpSchema } from "@/app/_lib/validation";
import { Form } from "@/app/_components/ui/form";
import Image from "next/image";
import React, { useState } from "react";
import { AlertCircle, Check, CheckCircle2 } from "lucide-react";
import ChangePasswordForm from "@/app/_components/ChangePasswordForm";
import UpdateUserDetailsForm from "@/app/_components/UpdateUserDetailsForm";
import UserSettingsActions from "@/app/_components/UserSettingsActions";

export default function Settings() {
  // function handleDeleteAccount() {
  //   setDialogContent("account/deleted");
  // }

  return (
    <>
      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
      </Dialog> */}
      <div className="flex justify-between items-center py-3 border-b border-neutral-300">
        <h1 className="headline">Settings</h1>
        <UserSettingsActions />
      </div>
      <Image
        src="/assets/images/profile-image.png"
        alt="profile image"
        width={200}
        height={200}
        className="w-36 aspect-square rounded-full"
      />
      <UpdateUserDetailsForm />
      <h2 className="border-b border-neutral-300 py-3 text-2xl font-bold">
        Change password
      </h2>
      <ChangePasswordForm />
    </>
  );
}
