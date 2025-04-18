// components/ConfirmDialog.tsx
import React from "react";
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

interface ConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string | React.ReactNode;
  description: string;
  confirmText: string;
  cancelText: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText,
  cancelText,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          <h3 className="text-xl">{title}</h3>
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="flex gap-3 mt-5">
          <Button
            onClick={() => {
              onCancel(); // Trigger onCancel action when the user clicks cancel
              onOpenChange(false); // Close the dialog after cancelling
            }}
            variant={ButtonVariant.outline}
            isRoundedLarge
            text={cancelText}
            className="!text-neutral-600 !border-1 border-neutral-200 flex-1"
          />
          <Button
            onClick={() => {
              onConfirm(); // Trigger onConfirm action when the user clicks confirm
              onOpenChange(false); // Close the dialog after confirming
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
