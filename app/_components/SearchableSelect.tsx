// components/SearchableSelect.tsx

import React, { useState } from "react";
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
  banksList: any[];
  selectedBankCode: string;
  setSelectedBankCode: (value: string) => void;
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  banksList,
  selectedBankCode,
  setSelectedBankCode,
  onSearchQueryChange,
  searchQuery,
}) => {
  // Filter banks based on search query
  const filteredBanksList = banksList.filter((bank: any) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Select onValueChange={setSelectedBankCode} value={selectedBankCode}>
      <SelectTrigger className="bg-white h-11 relative">
        <SelectValue placeholder="Bank Name" id="bankName" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <div className="p-2">
          <Input
            placeholder="Search for a bank..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="bg-white mb-2"
          />
        </div>
        <SelectGroup>
          {filteredBanksList?.map((bank: any) => (
            <SelectItem key={crypto.randomUUID()} value={bank.code}>
              {bank.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SearchableSelect;
