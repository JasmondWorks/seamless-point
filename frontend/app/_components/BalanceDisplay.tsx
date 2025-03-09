import { getUser } from "@/app/_lib/actions";
import { formatCurrency } from "@/app/_lib/utils";
import clsx from "clsx";
import React from "react";

export default async function BalanceDisplay({ className = "" }) {
  const res = await getUser();
  console.log("BalanceDisplay", res?.user?.balance);

  return (
    <div
      style={{
        background:
          "white url('/assets/images/naira-illustration.png') no-repeat right center/ contain",
      }}
      className={clsx(
        "text-neutral-700 relative p-5 card w-full sm:w-fit sm:min-w-[350px] md:min-w-[550px]",
        className
      )}
    >
      <h3 className="text-lg font-bold leading-none">BALANCE</h3>
      <p className="text-5xl lg:text-6xl font-bold lg:font-medium leading-none py-[0.5em] whitespace-normal">
        {formatCurrency(res?.user?.balance)}
      </p>
    </div>
  );
}
