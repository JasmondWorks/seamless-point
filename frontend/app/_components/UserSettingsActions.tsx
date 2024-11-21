"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/_components/ui/dialog"; // Adjust import path as necessary
import Button, { ButtonVariant } from "@/app/_components/Button";
import Badge, { BadgeVariant } from "./Badge";
import ConfirmDialog from "@/app/_components/Dialogs/ConfirmDialog";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";

export default function UserSettingsActions() {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeletedDialogOpen, setIsDeletedDialogOpen] = useState(false);

  function handleInitiateDeleteAccount() {
    setIsConfirmDialogOpen(true);
  }
  function handleDeleteAccount() {
    // Delete account logic here
    console.log("Account deleted");
    setIsDeletedDialogOpen(true);
  }
  function handleCancel() {
    return;
  }
  return (
    <div className="flex gap-3">
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleDeleteAccount}
        onCancel={handleCancel}
        cancelText="No"
        confirmText="Yes"
        description="Are you sure you want to delete your account? This action cannot be undone."
        title={
          <div className="flex flex-col items-start gap-5">
            <Badge
              className="!rounded-full !border-[10px] !border-[#fef3f2]"
              variant={BadgeVariant.red}
            >
              <AlertCircle color="red" />
            </Badge>
            <span>Delete Account</span>
          </div>
        }
      />
      <AccountDeletedDialog
        isOpen={isDeletedDialogOpen}
        onOpenChange={setIsDeletedDialogOpen}
      />
      <button onClick={handleInitiateDeleteAccount}>
        <Badge variant={BadgeVariant.red}>Delete account</Badge>
      </button>
    </div>
  );
}

function AccountDeletedDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: any;
  onOpenChange: any;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="flex flex-col gap-3 items-start">
          <Badge variant={BadgeVariant.green}>
            <div className="p-1 bg-customGreen rounded-full">
              <Check color="white" />
            </div>
          </Badge>
          <h3 className="text-xl">
            <span>Account Deleted</span>
          </h3>
        </DialogTitle>
        <DialogDescription>
          <span>
            Your account has successfully been deleted. You can return to the
            home page
          </span>
        </DialogDescription>
        <DialogFooter className="flex gap-3 mt-5">
          <Button
            onClick={() => onOpenChange(false)}
            variant={ButtonVariant.fill}
            text="Ok"
            className="flex-1 bg-customGreen"
            isRoundedLarge
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
