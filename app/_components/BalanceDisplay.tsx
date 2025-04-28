"use client";

import { fetchAllCustomers, getUser } from "@/app/_lib/actions";
import { formatCurrency } from "@/app/_lib/utils";
import { cn } from "@/app/_lib/utils";
import { useEffect, useState } from "react";

export default function BalanceDisplay({
  className = "",
}: {
  className?: string;
}) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      const res = await getUser();
      setBalance(res?.user?.balance ?? 0);
    }
    fetchUser();
  }, []);

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
