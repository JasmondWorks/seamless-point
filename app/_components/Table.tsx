import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type TableProps<T> = {
  columns: string;
  data: T[];
  renderHead: () => ReactNode;
  renderRow: (item: T, index: number) => ReactNode;
};

export default function Table<T>({
  columns,
  data,
  renderHead,
  renderRow,
}: TableProps<T>) {
  const lastColWidth =
    columns
      .split(" ")
      .at(-1)
      ?.replaceAll("px", "")
      .replaceAll("rem", "")
      .replaceAll("em", "") ?? "0";

  const rowWidth = columns
    .replaceAll("px", "")
    .replaceAll("rem", "")
    .replaceAll("em", "")
    .split(" ")
    .reduce((acc, cur) => acc + Number(cur), 0);

  return (
    <div className="overflow-x-auto whitespace-nowrap text-sm">
      {/* Table Head */}
      <div
        style={{ display: "grid", gridTemplateColumns: columns }}
        className="py-3 gap-5 items-center font-semibold text-neutral-600"
      >
        {renderHead()}
      </div>

      {/* Table Rows */}
      <div>
        {data.map((item: any, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: columns,
              minWidth: `${rowWidth + Number(lastColWidth)}px`,
            }}
            className="py-3 border-t border-neutral-200 gap-5 items-center"
          >
            {renderRow(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
