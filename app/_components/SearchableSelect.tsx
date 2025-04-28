"use client";

import * as React from "react";
import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "cmdk";
import * as Popover from "@radix-ui/react-popover";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

interface Bank {
  name: string;
  code: string;
}

interface SearchableSelectProps {
  banks: Bank[];
  selectedItem: string;
  setSelectedItem: (value: string) => void;
  searchQuery?: string;
  onSearchQueryChange?: (value: string) => void;
}

export default function SearchableSelect({
  banks,
  selectedItem,
  setSelectedItem,
  searchQuery,
  onSearchQueryChange,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchQuery || "");

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-expanded={open}
          >
            <span className="truncate">
              {selectedItem
                ? banks.find((bank) => bank.code === selectedItem)?.name
                : "Select a bank..."}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </Popover.Trigger>

        <Popover.Content
          sideOffset={4}
          align="start"
          className="z-50 w-[var(--radix-popper-anchor-width)] max-w-[400px] rounded-md border border-gray-200 bg-white p-0 shadow-lg"
          side="bottom"
        >
          <Command>
            <CommandInput
              placeholder="Search banks..."
              value={searchValue}
              onValueChange={(value) => {
                setSearchValue(value);
                onSearchQueryChange?.(value);
              }}
              className="h-9 w-full border-b px-3 py-2 text-sm outline-none"
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandGroup className="p-1">
                {filteredBanks.length > 0 ? (
                  filteredBanks.map((bank) => (
                    <CommandItem
                      key={bank.code}
                      value={bank.name}
                      onSelect={() => {
                        setSelectedItem(bank.code);
                        setOpen(false);
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <span className="truncate">{bank.name}</span>
                      {selectedItem === bank.code && (
                        <CheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-100" />
                      )}
                    </CommandItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No banks found.
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
