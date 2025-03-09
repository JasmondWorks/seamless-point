"use client";

import React from "react";
import { FormControl } from "../ui/form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

export default function DatePicker({ props, field }: any) {
  const parseToDateObject = (value: any) => {
    if (!value) return null;
    const parsedDate = new Date(value);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  return (
    <div className="relative flex items-center rounded-lg border bg-white h-11 shadow-sm focus-within:ring-1 focus-within:ring-brandSec">
      <FormControl>
        <ReactDatePicker
          showTimeSelect={props.showTimeSelect ?? false}
          showYearDropdown
          dropdownMode="select"
          selected={parseToDateObject(field.value)}
          onChange={(date: Date | null) => field.onChange(date)}
          timeInputLabel="Time:"
          dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
          wrapperClassName="w-full"
          placeholderText={props.placeholder}
          className="bg-transparent text-inherit text-white focus:outline-none text-sm"
          popperClassName="z-50"
          calendarClassName="bg-gray-900 text-white border rounded-lg shadow-lg !w-fit flex"
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            increaseMonth,
          }) => {
            const currentYear = new Date().getFullYear();
            const years = Array.from(
              { length: 100 },
              (_, i) => currentYear - 50 + i
            );

            return (
              <div
                className="flex justify-between items-center p-2 border-gray-200"
                onMouseDown={(e) => e.preventDefault()} // Prevent immediate closing
              >
                <button
                  className="p-1 rounded-md hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    decreaseMonth();
                  }}
                >
                  <ChevronLeft className="text-gray-400" />
                </button>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-lg">
                    {new Date(date).toLocaleString("default", {
                      month: "long",
                    })}
                  </span>
                  <Select
                    onValueChange={(year) => {
                      changeYear(Number(year));
                    }}
                    value={date.getFullYear().toString()} // Use value instead of defaultValue
                  >
                    <SelectTrigger className="w-[80px] border rounded-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      className="border max-h-[200px] overflow-y-auto" // Add scroll for many years
                      onMouseDown={(e) => e.stopPropagation()} // Prevent event bubbling
                    >
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </span>
                <button
                  className="p-1 rounded-md hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    increaseMonth();
                  }}
                >
                  <ChevronRight className="text-gray-400" />
                </button>
              </div>
            );
          }}
        />
      </FormControl>
    </div>
  );
}
