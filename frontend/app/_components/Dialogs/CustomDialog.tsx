// components/CustomDialog.js

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/app/_components/ui/dialog"; // Adjust the import path as necessary

const CustomDialog = ({
  isOpen = false,
  onOpenChange,
  title = "",
  description = "",
  children,
  triggerText = "",
  closeText = "",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="btn">{triggerText}</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {/* Render custom content */}
        <div className={`${title || description ? "py-4" : ""}`}>
          {children}
        </div>
        <DialogClose asChild>
          <button className="btn">{closeText}</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
