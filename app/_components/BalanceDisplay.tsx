// "use client";

import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import { getUser } from "@/app/_lib/actions";
import { formatCurrency } from "@/app/_lib/utils";
import { cn } from "@/app/_lib/utils";
// import { useEffect, useState } from "react";

export default async function BalanceDisplay({
  className = "",
}: {
  className?: string;
}) {
  // const [balance, setBalance] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const res = await getUser();
  const balance = res?.user?.balance ?? 0;

  // useEffect(() => {
  //   async function fetchBalance() {
  //     setIsLoading(true);
  //     const res = await getUser();
  //     setIsLoading(false);
  //     setBalance(res?.user?.balance ?? 0);
  //   }
  //   fetchBalance();
  // }, []);

  // if (isLoading) return <DataFetchSpinner />;

  return (
    <div
      style={{
        background:
          "white url('/assets/images/naira-illustration.png') no-repeat right center/ contain",
      }}
      className={cn("text-neutral-700 relative p-5 card", className)}
    >
      <h3 className="text-lg font-bold leading-none">BALANCE</h3>
      <p className="text-5xl lg:text-6xl font-bold lg:font-medium leading-none py-[0.5em] whitespace-normal">
        {formatCurrency(balance)}
      </p>
    </div>
  );
}
