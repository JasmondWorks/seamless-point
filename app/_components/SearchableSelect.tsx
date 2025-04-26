import { useRef, useEffect, useState } from "react";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface SearchableSelectProps {
  banks: any[];
  selectedItem: string;
  setSelectedItem: (value: string) => void;
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  banks,
  selectedItem,
  setSelectedItem,
  onSearchQueryChange,
  searchQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectContentRef = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(true);

  // Focus the input when the SelectContent opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsInputFocused(true);
    }
  }, []);

  // Filter banks based on search query
  const filteredBanksList = banks.filter((bank: any) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const codeSet = new Set();
  filteredBanksList.forEach((bank) => {
    if (codeSet.has(bank.code)) {
      console.warn("Duplicate code found:", bank.code);
    } else {
      codeSet.add(bank.code);
    }
  });

  // Handle keydown events in the input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent Radix UI typeahead behavior while typing in the input
    e.stopPropagation();

    // Allow specific keys to interact with the Select component
    if (e.key === "Tab" || e.key === "Escape") {
      // Move focus to the Select options for navigation
      setIsInputFocused(false);
      if (selectContentRef.current) {
        const firstOption = selectContentRef.current.querySelector(
          "[data-radix-select-item]"
        ) as HTMLElement;
        if (firstOption) {
          firstOption.focus();
        }
      }
    } else if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      // Optionally prevent arrow keys from navigating while typing
      e.preventDefault();
    } else if (e.key === "Enter") {
      // Prevent Enter from selecting an option while typing
      e.preventDefault();
    }
  };

  // Handle focus on the input
  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Prevent clicks on the input from closing the dropdown
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    handleInputFocus();
  };

  return (
    <Select onValueChange={setSelectedItem} value={selectedItem}>
      <SelectTrigger className="bg-white h-11 relative">
        <SelectValue placeholder="Bank Name" id="bankName" />
      </SelectTrigger>
      <SelectContent
        className="max-h-80 overflow-hidden"
        ref={selectContentRef}
      >
        <div className="grid grid-rows-[auto_1fr] max-h-60">
          {/* Search Input (Fixed Height: auto) */}
          <div className="p-2 bg-white">
            <Input
              ref={inputRef}
              placeholder="Search for a bank..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              className="bg-white"
            />
          </div>
          {/* Scrollable Options (Takes Remaining Height) */}
          <div className="overflow-y-auto">
            <SelectGroup>
              {filteredBanksList?.map((bank: any, idx: number) => (
                <SelectItem key={idx} value={bank.code}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
};

export default SearchableSelect;
