"use client";

import { useState } from "react";
import { FormControl } from "@/app/_components/ui/form";
import { toast } from "react-hot-toast";
import Select from "react-select";

type Option = {
  name: string;
  value: string;
  id?: string;
};

type GroupOption = {
  title: string;
  items: string[];
};

type Props = {
  field: any; // From React Hook Form
  props: {
    disabled?: boolean;
    selectValue?: string;
    placeholder?: string;
    selectOptions?: Option[];
    selectGroupOptions?: GroupOption[];
    selectMessage?: string;
  };
  onChange: (value: string) => void;
};

export default function SelectBox({ field, props, onChange }: Props) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    field.value
  );

  // Map selectOptions to React Select format
  const options = props.selectOptions
    ? props.selectOptions.map((opt: Option) => ({
        label: opt.name[0].toUpperCase() + opt.name.slice(1),
        value: opt.value,
      }))
    : props.selectGroupOptions
    ? props.selectGroupOptions.map((group: GroupOption) => ({
        label: group.title,
        options: group.items.map((item: string) => ({
          label: item[0].toUpperCase() + item.slice(1),
          value: item,
        })),
      }))
    : [];

  const handleChange = (selectedOption: any) => {
    const value = selectedOption ? selectedOption.value : "";
    field.onChange(value);
    onChange(value);
    setSelectedValue(value);
  };

  return (
    <FormControl>
      <Select
        options={options}
        value={options
          .flatMap((opt: any) => (opt.options ? opt.options : opt))
          .find((opt: any) => opt.value === (field.value || props.selectValue))}
        onChange={handleChange}
        placeholder={props.placeholder || "--Select an option--"}
        isDisabled={props.disabled}
        isClearable={true}
        isSearchable={true}
        classNamePrefix="shad"
        noOptionsMessage={() => props.selectMessage || "No options available"}
        onMenuOpen={() => {
          if (
            !props.selectOptions?.length &&
            !props.selectGroupOptions?.length
          ) {
            toast.error(props.selectMessage || "Select an option");
          }
        }}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "hsl(var(--input))",
            borderRadius: "0.375rem",
            padding: "0.5rem",
            backgroundColor: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            boxShadow:
              "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "hsl(var(--background))",
            borderRadius: "0.375rem",
            marginTop: "0.25rem",
            zIndex: 50,
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected
              ? "hsl(var(--primary))"
              : isFocused
              ? "hsl(var(--primary)/0.1)"
              : "hsl(var(--background))",
            color: isSelected
              ? "hsl(var(--primary-foreground))"
              : "hsl(var(--foreground))",
            padding: "0.5rem 1rem",
          }),
          placeholder: (base) => ({
            ...base,
            color: "hsl(var(--muted-foreground))",
          }),
          singleValue: (base) => ({
            ...base,
            color: "hsl(var(--foreground))",
          }),
          input: (base) => ({
            ...base,
            color: "hsl(var(--foreground))",
          }),
        }}
      />
    </FormControl>
  );
}
