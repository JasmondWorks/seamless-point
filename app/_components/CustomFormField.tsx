"use client";

/* eslint-disable no-unused-vars */
import { Control } from "react-hook-form";

import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";

import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { Textarea } from "./ui/textarea";
import Password from "./InputFields/Password";
import DatePicker from "./InputFields/DatePicker";
import FileInput from "./InputFields/FileInput";
import SelectBox from "@/app/_components/SelectBox";
import { StoredFile } from "@/app/_lib/types";
import Spinner from "@/app/_components/Spinner";
import AsyncSearchableSelect from "@/app/_components/AsyncSearchableSelect";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
  FILE = "file",
  NUMBER = "number",
  ASYNC_SELECT = "asyncSelect",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  title?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  className?: string;
  fetchOptions?: (query: string) => Promise<{ label: string; value: string }[]>;
  selectOptions?: { name: string; value: string; id?: string }[];
  selectGroupOptions?: { title: string; items: string[] }[];
  selectMessage?: string;
  selectValue?: string;
  onChange?: (value: string) => void;
  selectedFile?: StoredFile;
  accept?: string;
  isLoading?: boolean;
  country?: string;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const handleChange = (value: any) => {
    field.onChange(value); // Update field value
    if (props.onChange) {
      props.onChange(value); // Call custom onChange handler
    }
  };

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              disabled={props.disabled}
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.NUMBER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              min={1}
              type={props.fieldType}
              disabled={props.disabled || props.isLoading}
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return <Password field={field} props={props} />;
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            disabled={props.disabled}
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            disabled={props.disabled}
            country={props.country || "NG"}
            coun
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              disabled={props.disabled}
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return <DatePicker props={props} field={field} />;
    // return <BasicDatePicker field={field} props={props} />;
    case FormFieldType.SELECT:
      return (
        <SelectBox
          field={field}
          props={props}
          onChange={(value: string) => handleChange(value)} // Pass onChange to SelectBox
        />
      );
    case FormFieldType.ASYNC_SELECT:
      return (
        <FormControl>
          <AsyncSearchableSelect
            selectedValue={field.value}
            setSelectedValue={(value: string) => handleChange(value)}
            fetchOptions={props.fetchOptions!}
            placeholder={props.placeholder}
          />
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
    case FormFieldType.FILE:
      return <FileInput props={props} field={field} />;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, className, isLoading } = props;

  if (name === "phoneNumber") console.log(props.country);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex-1 ${className} !space-y-1`}>
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <div className="relative">
            {isLoading && (
              <div className="absolute top-[50%] right-[30px] z-[99] translate-y-[-50%] flex items-center">
                <Spinner size="small" />
              </div>
            )}
            <RenderInput field={field} props={props} />
          </div>

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
