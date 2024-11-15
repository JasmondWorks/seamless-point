"use client";

import Card from "@/app/_components/Card";
import { ArrowDown, ChevronRight, Share } from "lucide-react";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex flex-col ">
      <h1 className="mb-5">
        <strong>Hey "User" - </strong> Let's get you started for today
      </h1>
      <div className="space-y-5">
        <div className="grid lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i} className="bg-white">
              <div className="space-y-3 font-bold">
                <span className="uppercase text-sm text-light">
                  TODAY'S SALES
                </span>
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
        <div className="grid lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }, (_, i) => (
            <Card key={i} className="bg-white">
              <div className="space-y-7">
                <div>
                  <h3 className="font-bold text-lg">Recent Customers</h3>
                  <p className="text-light">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="text-sm space-y-5">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex justify-between gap-5">
                      <div className="flex flex-col space-y-1">
                        <span className="font-bold">Jenny Wilson</span>
                        <span className="text-light">abc@example.com</span>
                      </div>
                      <div className="self-start flex flex-col space-y-1 text-right">
                        <span className="text-bold">Approved</span>
                        <span className="text-light">0811010010</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="gap-5 text-sm font-bold text-light flex items-center">
                  <span>SEE ALL CUSTOMERS</span>
                  <ChevronRight />
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <Card className="bg-white space-y-7">
            <div className="flex justify-between items-center leading-4 gap-20  overflow-auto pb-2">
              <div className="flex gap-8 items-center">
                <h3 className="font-bold text-lg">Sales Report</h3>
                <div className="flex gap-5 items-center font-bold">
                  <div className="border border-neutral-600 p-2 px-3 rounded-lg">
                    12 Months
                  </div>
                  <div className="border border-transparent text-light p-2 px-3 rounded-lg">
                    6 Months
                  </div>
                  <div className="border border-transparent text-light p-2 px-3 rounded-lg">
                    6 Months
                  </div>
                  <div className="border border-transparent text-light p-2 px-3 rounded-lg">
                    6 Months
                  </div>
                </div>
              </div>
              <div className="border border-neutral-600 p-2 px-3 rounded-lg flex items-center">
                <Share size={20} />
                <span>Export PDF</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
