import Card from "@/app/_components/Card";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

const initialStats = [
  { name: "today's sales", amount: 12_000, percentDiff: -34 },
  { name: "total sales", amount: 200_000, percentDiff: 28 },
  { name: "total orders", amount: 12_789, percentDiff: 22 },
  { name: "total customers", amount: 10_567, percentDiff: -16 },
];

export default function StatsCards() {
  return (
    <div className="grid lg:grid-cols-4 gap-5">
      {initialStats.map((stat) => (
        <Card key={stat.name} className="bg-white">
          <div className="space-y-3 font-bold">
            <span className="uppercase text-sm font-medium text-muted">{stat.name}</span>
            <div className="flex justify-between items-end">
              <span className="text-2xl !leading-none">N12,000</span>
              {stat.percentDiff > 0 ? (
                <div className="text-xs text-green-500 flex gap-1">
                  <span>+{stat.percentDiff}%</span>
                  <ArrowUp size={12} />
                </div>
              ) : stat.percentDiff < 0 ? (
                <div className="text-xs text-red-500 flex gap-1">
                  <span>{stat.percentDiff}%</span>
                  <ArrowDown size={12} />
                </div>
              ) : (
                <div className="text-xs text-green-500 flex">
                  <span>{stat.percentDiff}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
