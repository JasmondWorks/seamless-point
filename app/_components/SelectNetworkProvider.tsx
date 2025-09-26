import { DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { NetworkProvider } from "@/app/_lib/types";
import Image from "next/image";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function SelectNetworkProvider({
  selectedProvider,
}: {
  selectedProvider: NetworkProvider;
}) {
  return (
    <DropdownMenuTrigger>
      <div className="flex items-center gap-1">
        <div>
          {selectedProvider ? (
            <Image
              src={selectedProvider?.logoSrc}
              width={70}
              height={70}
              className="w-8 aspect-square"
              alt="Provider logo"
            />
          ) : (
            <span>Select a provider</span>
          )}
        </div>
        <IoMdArrowDropdown />
      </div>
    </DropdownMenuTrigger>
  );
}
