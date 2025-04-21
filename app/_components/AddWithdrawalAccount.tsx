"use client";

import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  getAccountName,
  getBanksList,
  updateWithdrawalBank,
} from "@/app/_lib/actions";
import SearchableSelect from "@/app/_components/SearchableSelect";
import toast from "react-hot-toast";
import SpinnerFull from "@/app/_components/SpinnerFull";
import Spinner from "@/app/_components/Spinner";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";

const AddWithdrawalAccount = ({
  bankDetails,
  onAccountAdded,
  onEndEditAcc,
}: {
  onAccountAdded: ({}) => void;
  bankDetails: {};
  onEndEditAcc: () => void;
}) => {
  const [isLoadingBanks, setIsLoadingBanks] = useState(false);
  const [isLoadingAccountName, setIsLoadingAccountName] = useState(false);
  const [accountNumber, setAccountNumber] = useState<string>(
    bankDetails.accountNumber
  );
  const [banksList, setBanksList] = useState([]);
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [accountName, setAccountName] = useState("");
  const [accountNameErrorMessage, setAccountNameErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUserAuth();
  const isEditing = Object.keys(bankDetails).length !== 0;

  const handleInputAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  useEffect(() => {
    async function fetchBanksList() {
      let res;

      setIsLoadingBanks(true);

      res = await getBanksList();

      if (res.status === "success") setBanksList(res.data.data);
      if (res.status === "error") toast.error(res.message);

      setIsLoadingBanks(false);
    }
    async function fetchAccountDetails() {}
    fetchBanksList();
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
        setAccountName(res.data.account_name);
        setAccountNameErrorMessage("");
      }

      if (res.status === "error") {
        setAccountNameErrorMessage(res.message);
        setAccountName("");
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
      onAccountAdded(newDetails);
      toast.success(`Account ${isEditing ? "updated" : "added"} succesfully`);
      onEndEditAcc();
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
              banksList={banksList}
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
          {!isLoadingAccountName && accountNameErrorMessage && (
            <p className="font-bold text-red-600">
              <small>{accountNameErrorMessage}</small>
            </p>
          )}
          {!isLoadingAccountName && accountName && (
            <p className="font-bold text-green-600">
              <small>{accountName}</small>
            </p>
          )}

          <ButtonFormSubmit
            className={
              isLoadingAccountName ||
              accountNameErrorMessage ||
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
