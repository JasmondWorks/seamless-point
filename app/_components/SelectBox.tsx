"use client";

import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/app/_components/ui/select";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { FormControl } from "@/app/_components/ui/form";

type Props = {
  field: any;
  props: any;
  onChange: (value: string) => void;
};
export default function SelectBox({ field, props, onChange }: Props) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    field.value
  );

  function handleValueChange(value: string) {
    field.onChange(value);
    onChange(value);
    setSelectedValue(value);
  }

  return (
    <Select
      disabled={props.disabled}
      value={field.value || props.selectValue}
      onValueChange={handleValueChange}
    >
      <FormControl>
        <SelectTrigger
          onMouseDown={(event) => {
            event.stopPropagation();

            if (!props.selectOptions?.length) {
              event.preventDefault();
              toast.error(props.selectMessage || "Select an option");
            }
          }}
          className={`shad-select-trigger`}
        >
          {!props.selectOptions?.length ? (
            <p className="text-muted">
              {props.selectMessage || "No options available"}
            </p>
          ) : (
            <SelectValue
              placeholder={props.placeholder || "--Select an option--"}
            />
          )}
        </SelectTrigger>
      </FormControl>
      <SelectContent className="shad-select-content">
        {props.selectOptions && props.selectOptions.length > 0
          ? props.selectOptions
              // .map((val) => val[0].toUpperCase() + val.slice(1))
              .map(
                ({
                  name,
                  value,
                  id,
                }: {
                  name: string;
                  value: string;
                  id: string;
                }) => (
                  <SelectItem key={id || value} value={value}>
                    {name[0].toUpperCase() + name.slice(1)}
                  </SelectItem>
                )
              )
          : props.selectGroupOptions &&
            props.selectGroupOptions.length > 0 &&
            props.selectGroupOptions.map((group: any) => (
              <SelectGroup key={group.title}>
                <SelectLabel className="text-2xl mt-6">
                  {group.title}
                </SelectLabel>
                <>
                  {group.items.map((item: any) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </>
              </SelectGroup>
            ))}
      </SelectContent>
    </Select>
  );
}
