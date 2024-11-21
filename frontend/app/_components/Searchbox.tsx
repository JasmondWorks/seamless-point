import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@/app/_components/ui/input";

export default function Searchbox({ placeholder = "Search..." }) {
  return (
    <div className="relative max-w-80">
      <AiOutlineSearch className="absolute pointer-events-none left-4 bottom-[50%] translate-y-[50%] text-neutral-400 text-xl" />
      <Input
        className="w-full pl-12 min-h-11 rounded-xl"
        type="search"
        placeholder={placeholder}
      />
    </div>
  );
}
