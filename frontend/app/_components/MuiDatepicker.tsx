"use client";

import * as React from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";

export default function MuiDatePicker({ field }) {
  return (
    <div className="text-inherit">
      <LocalizationProvider dateAdapter={AdapterDateFns} className="w-full">
        <MUIDatePicker
          value={field.value || null}
          onChange={(newValue) => field.onChange(newValue)}
          openTo="day" // Opens the calendar directly
          views={["year", "month", "day"]} // Enables separate popovers for each
          format="PPP"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "inherit",
              width: "100%",
            },
            "& .MuiSvgIcon-root": {
              color: "inherit",
            },
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
