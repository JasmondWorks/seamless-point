// components/ConfirmDialog.tsx
import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/app/_components/ui/dialog"; // Adjust import path as necessary
import Button, { ButtonVariant } from "@/app/_components/Button";
import { AlertCircle } from "lucide-react";
import Badge, { BadgeVariant } from "@/app/_components/Badge";

interface ConfirmDialogProps {
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  triggerEl: ReactNode;
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isLoading,
  triggerEl, // Content for the trigger (button or custom UI)
  onConfirm,
  title = "Are you sure you want to proceed with this action?",
  description = "Are you sure you want to cancel this",
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <Dialog>
      <DialogTrigger>{triggerEl}</DialogTrigger>
      <DialogContent>
        <Badge
          className="!rounded-full w-fit !border-[10px] !border-[#fef3f2]"
          variant={BadgeVariant.red}
        >
          <AlertCircle color="red" />
        </Badge>
        <DialogTitle className="flex flex-col text-xl items-start gap-5">
          {title}
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="grid grid-cols-2 gap-3 mt-5">
          <DialogClose>
            <Button
              variant={ButtonVariant.outline}
              isRoundedLarge
              text={cancelText}
              className="!text-neutral-600 w-full !border-1 border-neutral-200 flex-1"
            />
          </DialogClose>
          <Button
            disabled={isLoading}
            onClick={() => {
              onConfirm();
              // !isLoading && setOpen(false);
            }}
            variant={ButtonVariant.fill}
            isRoundedLarge
            className="bg-red-600 flex-1"
            text={confirmText}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
