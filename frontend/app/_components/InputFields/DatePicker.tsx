"use client";

import React from "react";
import { FormControl } from "../ui/form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomSelect from "../CustomSelect";

export default function DatePicker({ props, field }) {
  const parseToDateObject = (value) => {
    if (!value) return null; // Handle empty value
    const parsedDate = new Date(value);
    return isNaN(parsedDate.getTime()) ? null : parsedDate; // Return null if invalid
  };

  return (
    <div className="flex rounded-md border border-dark-500 bg-dark-400">
      <FormControl>
        <ReactDatePicker
          showTimeSelect={props.showTimeSelect ?? false}
          showYearDropdown
          dropdownMode="select"
          selected={parseToDateObject(field.value)} // Convert field.value to Date
          onChange={(date: Date | null) => field.onChange(date)} // Pass selected date back to form
          timeInputLabel="Time:"
          dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
          wrapperClassName="date-picker"
          placeholderText={props.placeholder} // Set the placeholder text for the calendar input
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
              <div className="flex justify-between items-center p-2">
                <button
                  className="text-neutral-500"
                  onClick={(e) => {
                    e.preventDefault();
                    decreaseMonth();
                  }}
                >
                  <ChevronLeft />
                </button>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-xl">
                    {new Date(date).toLocaleString("default", {
                      month: "long",
                    })}
                  </span>
                  <CustomSelect
                    value={date.getFullYear()}
                    onChange={(year: number) => changeYear(Number(year))}
                    options={years}
                  />
                </span>
                <button
                  className="text-neutral-500"
                  onClick={(e) => {
                    e.preventDefault();
                    increaseMonth();
                  }}
                >
                  <ChevronRight />
                </button>
              </div>
            );
          }}
        />
      </FormControl>
    </div>
  );
}
