import AdminDashboardData from "@/app/_components/AdminDashboardData";
import Button, { ButtonVariant } from "@/app/_components/Button";
import Card from "@/app/_components/Card";

import Username from "@/app/_components/Username";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex flex-col ">
      <h1 className="mb-5">
        <strong>
          Hey <Username userType="admin" /> -{" "}
        </strong>{" "}
        Let's get you started for today
      </h1>
      <div className="space-y-5">
        <AdminDashboardData />
        <div>
          <Card className="bg-white space-y-7">
            <div className="flex justify-between items-center leading-4 gap-20 overflow-auto whitespace-nowrap">
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
                    4 Months
                  </div>
                  <div className="border border-transparent text-light p-2 px-3 rounded-lg">
                    3 Months
                  </div>
                </div>
              </div>
              <Button
                text="Export PDF"
                variant={ButtonVariant.outline}
                className="border-neutral-300 !p-3 text-neutral-700"
                isRoundedLarge
                icon={
                  <svg
                    width={12}
                    height={13}
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.99992 5.33373V8.9701M5.99992 8.9701L3.99992 7.15191M5.99992 8.9701L7.99992 7.15191M9.33325 12.0004H2.66659C1.93021 12.0004 1.33325 11.4577 1.33325 10.7883V2.30343C1.33325 1.63399 1.93021 1.09131 2.66659 1.09131H6.39044C6.56725 1.09131 6.73682 1.15516 6.86185 1.26882L10.4713 4.55016C10.5963 4.66382 10.6666 4.81797 10.6666 4.97871V10.7883C10.6666 11.4577 10.0696 12.0004 9.33325 12.0004Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
