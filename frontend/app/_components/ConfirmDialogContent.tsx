import React, { ReactNode } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/app/_components/ui/dialog"; // Adjust

import Button, { ButtonVariant } from "@/app/_components/Button";
import { AlertCircle } from "lucide-react";
import Badge, { BadgeVariant } from "@/app/_components/Badge";

interface ConfirmDialogProps {
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialogContent({
  onConfirm,
  title = "Are you sure you want to proceed with this action?",
  description = "Are you sure you want to cancel this",
  confirmText = "Yes",
  cancelText = "No",
}: ConfirmDialogProps) {
  return (
    <div>
      <DialogTitle className="flex flex-col items-start gap-5">
        <Badge
          className="!rounded-full !border-[10px] !border-[#fef3f2]"
          variant={BadgeVariant.red}
        >
          <AlertCircle color="red" />
        </Badge>
        <span className="text-xl">{title}</span>
      </DialogTitle>
      <DialogDescription>{description}</DialogDescription>
      <DialogFooter className="grid grid-cols-2 gap-3 mt-5">
        <DialogClose asChild>
          <Button
            variant={ButtonVariant.outline}
            isRoundedLarge
            text={cancelText}
            className="!text-neutral-600 w-full !border-1 border-neutral-200 flex-1"
          />
        </DialogClose>
        <Button
          onClick={onConfirm}
          variant={ButtonVariant.fill}
          isRoundedLarge
          className="bg-red-600 flex-1"
          text={confirmText}
        />
      </DialogFooter>
    </div>
  );
}
