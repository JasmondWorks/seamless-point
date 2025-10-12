"use client";

import RecentEntityData from "@/app/_components/RecentEntityData";

export default function RecentEntities({
  data: { deliveries, customers, transactions },
}: any) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <RecentEntityData data={customers} entity="customers" />
      <RecentEntityData data={deliveries} entity="shipments" />
      <div className="col-span-2 xl:col-span-1">
        <RecentEntityData data={transactions} entity="transactions" />
      </div>
    </div>
  );
}
