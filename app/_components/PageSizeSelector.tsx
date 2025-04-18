import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

export function PageSizeSelector({
  perPage,
  setPerPage,
}: {
  perPage: number;
  setPerPage: (size: number) => void;
}) {
  return (
    <Select
      onValueChange={(value) => setPerPage(Number(value))}
      defaultValue={String(perPage)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Rows per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
      </SelectContent>
    </Select>
  );
}
