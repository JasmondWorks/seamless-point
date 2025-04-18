import Card from "@/app/_components/Card";
import { formatCurrency } from "@/app/_lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RecentEntityData({ data, entity }) {
  console.log(data);
  return (
    <Card className="bg-white">
      <div className="space-y-7 flex flex-col justify-between h-full overflow-x-auto">
        <div className="flex-1 space-y-7">
          <div>
            <h3 className="font-bold text-xl capitalize">Recent {entity}</h3>
          </div>
          <div className="text-sm space-y-5">
            {data.map((obj: any) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(200px, 1fr) auto",
                }}
                key={obj._id}
                className="grid gap-5 w-full"
              >
                <div className="flex flex-col space-y-1">
                  <span className="font-bold">
                    {obj.firstName} {obj.lastName}
                    {(!obj.firstName || !obj.lastName) && "N/A"}
                  </span>
                  <span className="text-light">{obj.email}</span>
                </div>
                <div className="self-start flex flex-col space-y-1 text-right">
                  <RecentEntityDesc entity={entity} obj={obj} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link
          href={`/admin/${entity}`}
          className="gap-1 text-xs tracking-wider font-bold text-light inline-flex items-center"
        >
          <span className="uppercase">SEE ALL {entity}</span>
          <ChevronRight className="w-5" />
        </Link>
      </div>
    </Card>
  );
}

function RecentEntityDesc({ entity, obj }: { entity: any; obj: any }) {
  switch (entity) {
    case "customers":
      return (
        <span className="text-muted">
          {obj.phoneNumber}
          {!obj.phoneNumber && "N/A"}
        </span>
      );
    case "shipments":
      return (
        <div>
          <p className="capitalize">{obj.status}</p>
          <p className="text-muted">{obj.toState}</p>
        </div>
      );
    case "transactions":
      return (
        <div>
          <p>{formatCurrency(obj.amount, "ngn")}</p>
          <p className="text-muted capitalize">{obj.transactionType}</p>
        </div>
      );

    default:
      break;
  }
}
