import Card from "@/app/_components/Card";
import { ArrowDown } from "lucide-react";
import React from "react";

export default function StatsCards() {
  return (
    <div className="grid lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }, (_, i) => (
        <Card key={i} className="bg-white">
          <div className="space-y-3 font-bold">
            <span className="uppercase text-sm text-light">TODAY'S SALES</span>
            <div className="flex justify-between items-end">
              <span className="text-2xl !leading-none">N12,000</span>
              <div className="text-xs text-green-500 flex">
                <span>+36%</span>
                <ArrowDown size={15} />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
