"use client";

import AddWithdrawalAccount from "@/app/_components/AddWithdrawalAccount";
import Spinner from "@/app/_components/Spinner";
import SpinnerFull from "@/app/_components/SpinnerFull";
import WithdrawalForm from "@/app/_components/WithdrawalForm";
import { getUser } from "@/app/_lib/actions";
import { showToast } from "@/app/_lib/toast";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Withdraw() {
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBankDetails() {
      setIsLoading(true);
      const res = await getUser();
      setBankDetails(res?.user?.bankDetails ?? {});
      setIsLoading(false);
    }

    fetchBankDetails();
  }, []);

  useEffect(() => {
    if (Object.keys(bankDetails).length === 0) setShowAddAccount(true);
  }, [Object.keys(bankDetails).length]);

  function handleHideAddAccount() {
    setShowAddAccount(false);
  }
  function handleShowAddAccount() {
    setShowAddAccount(true);
  }

  if (isLoading) return <SpinnerFull />;

  if (showAddAccount) {
    return (
      <AddWithdrawalAccount
        onHideAddAccount={handleHideAddAccount}
        bankDetails={bankDetails}
        setBankDetails={setBankDetails}
      />
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">Withdrawal of Funds</h1>
        <WithdrawalForm
          bankDetails={bankDetails}
          onShowAddAccount={handleShowAddAccount}
        />
      </div>
    </div>
  );
}
