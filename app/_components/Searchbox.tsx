import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@/app/_components/ui/input";
import { ChangeEvent } from "react";
import clsx from "clsx";

interface Props {
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
}

export default function Searchbox({
  placeholder = "Search...",
  onChange,
  value = "",
  className = "",
}: Props) {
  return (
    <div className={clsx("relative max-w-80", className)}>
      <AiOutlineSearch className="absolute pointer-events-none left-4 bottom-[50%] translate-y-[50%] text-neutral-400 text-xl" />
      <Input
        onChange={onChange}
        value={value}
        className="w-full pl-12 min-h-11 rounded-xl"
        type="search"
        placeholder={placeholder}
      />
    </div>
  );
}
