// components/ConfirmDialog.tsx
import React, { ReactNode, SetStateAction } from "react";
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
import { Check } from "lucide-react";
import Badge, { BadgeVariant } from "@/app/_components/Badge";

interface ConfirmDialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  triggerEl?: ReactNode;
  isOpen?: boolean | undefined;
  onOpenChange?: (isOpen: boolean) => void;
}

const SuccessDialog: React.FC<ConfirmDialogProps> = ({
  triggerEl, // Content for the trigger (button or custom UI)
  title = "Delivery cancelled",
  description = "Your delivery has successfully been cancelled, you can return to the home page",
  confirmText = "Ok",
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>{triggerEl}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex flex-col gap-3 items-start">
          <Badge variant={BadgeVariant.green}>
            <div className="p-1 bg-customGreen rounded-full">
              <Check color="white" />
            </div>
          </Badge>
          <h3 className="text-xl">
            <span>{title}</span>
          </h3>
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="mt-5">
          <DialogClose className="w-full">
            <Button
              variant={ButtonVariant.fill}
              text={confirmText}
              className="flex-1 bg-customGreen w-full"
              isRoundedLarge
            />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
