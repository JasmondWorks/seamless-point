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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import Password from "./InputFields/Password";
import DatePicker from "./InputFields/DatePicker";
import FileUpload from "./InputFields/FileUpload";

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
  selectOptions?: string[];
  selectGroupOptions?: { title: string; items: string[] }[];
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
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
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="NG"
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
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.selectOptions && props.selectOptions?.length > 0 ? (
                props.selectOptions
                  ?.map((val) => val[0].toUpperCase() + val.slice(1))
                  .map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))
              ) : (
                <>
                  {
                    <SelectGroup>
                      {props.selectGroupOptions?.map((optionGroup) => (
                        <div key={optionGroup.title}>
                          <SelectLabel className="text-2xl mt-6">
                            {optionGroup.title}
                          </SelectLabel>

                          {optionGroup.items.map((option: string) => (
                            <SelectItem
                              className="text-2xl"
                              value={option}
                              key={option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectGroup>
                  }
                </>
              )}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
    case FormFieldType.FILE:
      return <FileUpload props={props} field={field} />;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, className } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex-1 ${className} !space-y-1`}>
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
