/* eslint-disable no-unused-vars */
import { E164Number } from "libphonenumber-js/core";
import ReactDatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";

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
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomSelect from "./CustomSelect";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // Generate years for the select dropdown
  const currentYear = startDate.getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

  const handleYearChange = (year) => {
    const newDate = new Date(startDate);
    newDate.setFullYear(year);
    setStartDate(newDate);
  };

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
      return (
        <div className="flex bg-dark-400 items-center relative">
          <FormControl>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              placeholder={
                isPasswordVisible ? "123abc<>?.!" : props.placeholder
              }
              {...field}
              className="shad-input pr-10"
            />
          </FormControl>
          <button
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              setIsPasswordVisible((cur) => !cur);
            }}
            className="opacity-60 absolute right-0 px-3 cursor-pointer top-0 bottom-0"
          >
            {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>
      );
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
            defaultCountry="US"
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
                props.selectOptions?.map((option) => (
                  <SelectItem className="" key={option} value={option}>
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
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, className } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex-1 ${className}`}>
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
