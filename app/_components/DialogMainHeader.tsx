import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import React from "react";
import { IoIosClose } from "react-icons/io";

export default function DialogMainHeader({
  title = "Title",
  subtitle = "Subtitle",
}) {
  return (
    <DialogHeader>
      <div className="flex justify-between items-center">
        <div className="text-left flex flex-col gap-y-1">
          <DialogTitle>
            <span className="text-xl font-bold">{title}</span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-muted">{subtitle}</span>
          </DialogDescription>
        </div>
        <DialogClose>
          <IoIosClose className="text-4xl bg-red-600 rounded-full text-white" />
        </DialogClose>
      </div>
    </DialogHeader>
  );
}
