"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "cmdk";
import * as Popover from "@radix-ui/react-popover";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import Spinner from "@/app/_components/Spinner";

export interface Option {
  label: string;
  value: string;
}

interface AsyncSearchableSelectProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  fetchOptions: (query: string) => Promise<Option[]>;
  placeholder?: string;
}

export default function AsyncSearchableSelect({
  selectedValue,
  setSelectedValue,
  fetchOptions,
  placeholder = "Select an option...",
}: AsyncSearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Debounce search and fetch options
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.trim()) {
        setLoading(true);
        fetchOptions(searchValue)
          .then(setOptions)
          .finally(() => setLoading(false));
      } else {
        setOptions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, fetchOptions]);

  return (
    <div className="relative w-full">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-expanded={open}
          >
            <span className="truncate">
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </Popover.Trigger>

        <Popover.Content
          sideOffset={4}
          align="start"
          className="z-50 w-[var(--radix-popper-anchor-width)] max-w-[400px] rounded-md border border-gray-200 bg-white p-0 shadow-lg absolute"
          side="bottom"
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              value={searchValue}
              onValueChange={setSearchValue}
              className="h-9 w-full border-b px-3 py-2 text-sm outline-none"
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandGroup className="p-1">
                {loading ? (
                  <div className="flex items-center justify-center px-3 py-3">
                    <Spinner size="small" />
                  </div>
                ) : options.length > 0 ? (
                  options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        setSelectedValue(option.value);
                        setOpen(false);
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <span className="truncate">{option.label}</span>
                      {selectedValue === option.value && (
                        <CheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-100" />
                      )}
                    </CommandItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No results found.
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
