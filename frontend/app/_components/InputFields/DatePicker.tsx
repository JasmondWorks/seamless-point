"use client";

import React, { useState } from "react";
import { FormControl } from "../ui/form";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  // Generate years for the select dropdown
  const currentYear = startDate.getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

  const handleYearChange = (year) => {
    const newDate = new Date(startDate);
    newDate.setFullYear(year);
    setStartDate(newDate);
  };

  return (
    <div className="flex rounded-md border border-dark-500 bg-dark-400">
      {/* <Image
    src="/assets/icons/calendar.svg"
    height={24}
    width={24}
    alt="user"
    className="ml-2"
  /> */}
      <FormControl>
        <ReactDatePicker
          showTimeSelect={props.showTimeSelect ?? false}
          // showMonthDropdown // Enables month dropdown
          showYearDropdown // Enables year dropdown
          dropdownMode="select" // Optional: uses a select dropdown instead of scrolling
          selected={field.value}
          onChange={(date: Date) => field.onChange(date)}
          timeInputLabel="Time:"
          dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
          wrapperClassName="date-picker"
          placeholderText={props.placeholder} // Set the placeholder text for the calendar input
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            increaseMonth,
          }) => (
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
                {/* Month displayed as static text */}
                <span className="font-semibold text-xl">
                  {new Date(date).toLocaleString("default", {
                    month: "long",
                  })}
                </span>
                {/* Year dropdown */}
                {/* <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) =>
                changeYear(Number(value))
              }
              className="bg-white border border-gray-300 rounded-md p-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brandSec transition duration-150 ease-in-out"
            >
              {years.map((year) => (
                <option
                  className="bg-white text-black p-2 hover:bg-gray-200"
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select> */}
                <CustomSelect
                  value={date.getFullYear()}
                  onChange={(year) => changeYear(Number(year))}
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
          )}
        />
      </FormControl>
    </div>
  );
}
