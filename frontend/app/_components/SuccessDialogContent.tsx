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
}) {
  return (
    <div>
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
        <DialogClose asChild className="w-full">
          <Button
            variant={ButtonVariant.fill}
            text={confirmText}
            className="flex-1 bg-customGreen w-full"
            isRoundedLarge
          />
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
