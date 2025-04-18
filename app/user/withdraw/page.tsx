import React from "react";
import WithdrawalForm from "@/app/_components/WithdrawalForm";

export default function Withdraw() {
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">Withdrawal of Funds</h1>
        <WithdrawalForm />
      </div>
    </div>
  );
}
