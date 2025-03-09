"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePicker({ field, props }: any) {
  const [selected, setSelected] = React.useState<Date | undefined>(
    field.value ? new Date(field.value) : undefined
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left font-normal border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
        >
          {selected ? format(selected, "PPP") : "Select a date"}
          <CalendarIcon className="ml-2 h-4 w-4 text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-gray-700 bg-gray-900 text-white rounded-lg shadow-lg">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(date) => {
            setSelected(date);
            field.onChange(date);
          }}
          className="p-3"
          modifiersClassNames={{
            selected: "bg-primary text-white rounded-md",
            today: "font-bold text-primary",
          }}
          fromYear={1950}
          toYear={2050}
        />
      </PopoverContent>
    </Popover>
  );
}
