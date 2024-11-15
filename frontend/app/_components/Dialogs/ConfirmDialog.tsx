// components/ConfirmDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/app/_components/ui/dialog"; // Adjust import path as necessary

interface ConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
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
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        <div className="flex justify-end space-x-2">
          <button
            className="btn bg-red-600 text-white"
            onClick={() => {
              onConfirm(); // Trigger onConfirm action when the user clicks confirm
              onOpenChange(false); // Close the dialog after confirming
            }}
          >
            {confirmText}
          </button>
          <button
            className="btn bg-gray-300"
            onClick={() => {
              onCancel(); // Trigger onCancel action when the user clicks cancel
              onOpenChange(false); // Close the dialog after cancelling
            }}
          >
            {cancelText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
