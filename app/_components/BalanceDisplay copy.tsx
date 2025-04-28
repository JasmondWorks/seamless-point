"use client";

import { getUser } from "@/app/_lib/actions";
import { formatCurrency } from "@/app/_lib/utils";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import Spinner from "@/app/_components/Spinner";

export default function BalanceDisplay({
  className = "",
}: {
  className?: string;
}) {
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBalance() {
      setIsLoading(true);
      const res = await getUser();

      setBalance(res?.user?.balance ?? 0);

      setIsLoading(false);
    }

    fetchBalance();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
        <Spinner />
      </div>
    );
  }

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
        {formatCurrency(balance)}
      </p>
    </div>
  );
}
