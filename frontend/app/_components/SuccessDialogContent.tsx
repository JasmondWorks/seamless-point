import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Button, { ButtonVariant } from "@/app/_components/Button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Check } from "lucide-react";
import React from "react";

export default function SuccessDialogContent({
  title = "Successful",
  description = "",
  confirmText = "Ok",
  onConfirmSuccess,
}: {
  title?: string;
  description?: string;
  confirmText?: string;
  onConfirmSuccess?: () => void;
}) {
  return (
    <div>
      <DialogTitle className="flex flex-col gap-3 items-start">
        <Badge variant={BadgeVariant.green}>
          <div className="p-1 bg-customGreen rounded-full">
            <Check color="white" />
          </div>
        </Badge>
        <span className="text-xl">{title}</span>
      </DialogTitle>
      <DialogDescription>{description}</DialogDescription>
      <DialogFooter className="mt-5">
        {!onConfirmSuccess && (
          <DialogClose asChild className="w-full">
            <Button
              variant={ButtonVariant.fill}
              text={confirmText}
              className="flex-1 bg-customGreen w-full"
              isRoundedLarge
            />
          </DialogClose>
        )}
        {onConfirmSuccess && (
          <Button
            onClick={onConfirmSuccess}
            variant={ButtonVariant.fill}
            text={confirmText}
            className="flex-1 bg-customGreen w-full"
            isRoundedLarge
          />
        )}
      </DialogFooter>
    </div>
  );
}
