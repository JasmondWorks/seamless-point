"use client";

import AddWithdrawalAccount from "@/app/_components/AddWithdrawalAccount";
import SpinnerFull from "@/app/_components/SpinnerFull";
import WithdrawalForm from "@/app/_components/WithdrawalForm";
import { getUser } from "@/app/_lib/actions";
import { useEffect, useState } from "react";

export default function Withdraw() {
  const [bankDetails, setBankDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingAcc, setIsEditingAcc] = useState(false);

  console.log("Editing: ", isEditingAcc);

  useEffect(() => {
    async function fetchBalance() {
      try {
        setIsLoading(true);
        const res = await getUser();
        setBankDetails(res?.user?.bankDetails ?? {});
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBalance();
  }, []);

  function handleEditAcc() {
    setIsEditingAcc(true);
  }
  function handleEndEditAcc() {
    setIsEditingAcc(false);
  }

  if (isLoading) return <SpinnerFull />;

  if (Object.keys(bankDetails).length === 0 || isEditingAcc) {
    return (
      <AddWithdrawalAccount
        bankDetails={bankDetails}
        onEndEditAcc={handleEndEditAcc}
        onAccountAdded={(newDetails) => {
          setIsLoading(true); // Show spinner briefly
          setTimeout(() => {
            setBankDetails(newDetails);
            setIsLoading(false);
          }, 500); // Adjust this delay to taste
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">Withdrawal of Funds</h1>
        <WithdrawalForm onEditAccount={handleEditAcc} />
      </div>
    </div>
  );
}
