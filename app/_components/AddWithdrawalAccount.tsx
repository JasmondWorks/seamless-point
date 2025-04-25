"use client";

import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import React, { useEffect, useState } from "react";

import {
  getAccountName,
  getBanks,
  updateWithdrawalBank,
} from "@/app/_lib/actions";
import SearchableSelect from "@/app/_components/SearchableSelect";
import toast from "react-hot-toast";
import SpinnerFull from "@/app/_components/SpinnerFull";
import Spinner from "@/app/_components/Spinner";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { useRouter, useSearchParams } from "next/navigation";

const AddWithdrawalAccount = ({
  bankDetails,
}: {
  bankDetails: {
    bankName: "";
    accountNumber: "";
    accountName: "";
  };
}) => {
  const [isLoadingBanks, setIsLoadingBanks] = useState(false);
  const [isLoadingAccountName, setIsLoadingAccountName] = useState(false);
  const [accountNumber, setAccountNumber] = useState<string>(
    bankDetails?.accountNumber
  );
  const [banks, setBanks] = useState([]);
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [account, setAccount] = useState({
    name: "",
    error: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedBank = banks.find((bank) => bank.code === selectedBankCode);

  const isEditing = Object.keys(bankDetails).length !== 0;

  const handleInputAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  useEffect(() => {
    async function fetchBanks() {
      let res;

      setIsLoadingBanks(true);

      res = await getBanks();

      if (res.status === "success") setBanks(res.data.data);
      if (res.status === "error") toast.error(res.message);

      setIsLoadingBanks(false);
    }
    async function fetchAccountDetails() {}
    fetchBanks();
    fetchAccountDetails();
  }, []);

  useEffect(() => {
    async function fetchAccountName() {
      setIsLoadingAccountName(true);

      const res = await getAccountName({
        accountNumber,
        bankCode: selectedBankCode,
      });

      console.log(res);

      if (res.status === "success") {
        setAccount({
          name: res.data.account_name,
          error: "",
        });
      }

      if (res.status === "error") {
        setAccount({ name: "", error: res.message });
      }

      setIsLoadingAccountName(false);
    }
    if (accountNumber && selectedBankCode) fetchAccountName();
  }, [accountNumber, selectedBankCode]);

  async function handleAddAccount(e: any) {
    e.preventDefault();

    setIsSubmitting(true);

    const res = await updateWithdrawalBank({
      accountNumber,
      bankCode: selectedBankCode,
    }); // your actual logic here
    const newDetails = res.data?.data?.user?.bankDetails;
    console.log(newDetails);

    if (res.status === "success") {
      toast.success(`Account ${isEditing ? "updated" : "added"} succesfully`);

      const params = new URLSearchParams(searchParams);
      params.set("add-account", "false");
      router.replace(`?${params.toString()}`);
    }

    setIsSubmitting(false);
  }

  if (isLoadingBanks) return <SpinnerFull />;

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">
          {isEditing ? "Update" : "Add"} Withdrawal Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleAddAccount}>
          <div className="space-y-1">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              value={accountNumber}
              onChange={handleInputAccountNumber}
              className="bg-white h-11"
              id="accountNumber"
              type="text"
              placeholder="0123456789"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="bankName">Bank Name</Label>
            <SearchableSelect
              banks={banks}
              selectedBankCode={selectedBankCode}
              setSelectedBankCode={setSelectedBankCode}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          </div>

          {isLoadingAccountName && (
            <div className="flex flex-col">
              <Spinner color="orange" size="medium" />
            </div>
          )}
          {!isLoadingAccountName && account.error && (
            <p className="font-bold text-red-600">
              <small>{account.error}</small>
            </p>
          )}
          {!isLoadingAccountName && account.name && (
            <p className="font-bold text-green-600">
              <small>{account.name}</small>
            </p>
          )}

          <ButtonFormSubmit
            className={
              isLoadingAccountName ||
              account.error ||
              !accountNumber ||
              !selectedBankCode
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : ""
            }
            disabled={isSubmitting}
            text={`${isEditing ? "Update" : "Add"} account`}
          />
        </form>
      </div>
    </div>
  );
};

export default AddWithdrawalAccount;
