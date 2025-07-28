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
import Spinner from "@/app/_components/Spinner";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import SpinnerFull from "@/app/_components/SpinnerFull";
import { showToast } from "@/app/_lib/toast";

type Bank = {
  code: string;
  name: string;
};

type AccountInfo = {
  name: string;
  error: string;
};

const AddWithdrawalAccount = ({
  bankDetails,
  onHideAddAccount,
  setBankDetails,
}: any) => {
  // Loading states
  const [loading, setLoading] = useState({
    banks: false,
    accountName: false,
    submitting: false,
  });

  // Form data
  const [formData, setFormData] = useState({
    accountNumber: bankDetails?.accountNumber || "",
    selectedBankCode: "",
    searchQuery: "",
    banks: [] as Bank[],
    account: {
      name: "",
      error: "",
    } as AccountInfo,
  });

  const isEditing = Object.keys(bankDetails).length !== 0;
  const formattedSelectedBankCode = formData.selectedBankCode.split("-")[0];

  const handleInputAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, accountNumber: e.target.value }));
  };

  useEffect(() => {
    showToast("Please add your bank details to proceed", "info");

    async function fetchBanks() {
      setLoading((prev) => ({ ...prev, banks: true }));

      try {
        const res = await getBanks();

        if (res.status === "success") {
          const uniqueBanks = res.data.data.map((bank: Bank, idx: number) => ({
            ...bank,
            code: `${bank.code}-${idx}`,
          }));

          const bankCodeIndex = uniqueBanks.findIndex(
            (bank: Bank) => bank.code.split("-")[0] === bankDetails.bankCode
          );

          setFormData((prev) => ({
            ...prev,
            banks: uniqueBanks,
            selectedBankCode: Object.keys(bankDetails).length
              ? `${bankDetails.bankCode}-${bankCodeIndex}`
              : "",
          }));
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Failed to fetch banks");
      } finally {
        setLoading((prev) => ({ ...prev, banks: false }));
      }
    }
    fetchBanks();
  }, []);

  useEffect(() => {
    async function fetchAccountName() {
      if (
        !formData.accountNumber ||
        !formData.selectedBankCode ||
        formData.accountNumber.length < 6
      )
        return;

      setLoading((prev) => ({ ...prev, accountName: true }));
      setFormData((prev) => ({ ...prev, account: { name: "", error: "" } }));

      try {
        const res = await getAccountName({
          accountNumber: formData.accountNumber,
          bankCode: formattedSelectedBankCode,
        });

        if (res.status === "success") {
          setFormData((prev) => ({
            ...prev,
            account: { name: res.data.account_name, error: "" },
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            account: { name: "", error: res.message },
          }));
        }
      } catch (error) {
        setFormData((prev) => ({
          ...prev,
          account: { name: "", error: "Failed to fetch account name" },
        }));
      } finally {
        setLoading((prev) => ({ ...prev, accountName: false }));
      }
    }

    fetchAccountName();
  }, [formData.accountNumber, formData.selectedBankCode]);

  async function handleAddAccount(e: React.FormEvent) {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, submitting: true }));

    try {
      const res = await updateWithdrawalBank({
        accountNumber: formData.accountNumber,
        bankCode: formattedSelectedBankCode,
      });

      if (res.status === "success") {
        setBankDetails(res.data?.data?.user?.bankDetails);
        toast.success(
          `Account ${isEditing ? "updated" : "added"} successfully`
        );
        onHideAddAccount();
      } else {
        toast.error(`Account could not be ${isEditing ? "updated" : "added"}`);
      }
    } catch (error) {
      toast.error("An error occurred while processing your request");
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  }

  if (loading.banks) {
    return <SpinnerFull />;
  }

  console.log(loading.submitting);

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold text-center">
          {isEditing ? "Update" : "Add"} Withdrawal Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleAddAccount}>
          <div className="space-y-1">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              value={formData.accountNumber}
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
              banks={formData.banks}
              selectedItem={formData.selectedBankCode}
              setSelectedItem={(value) =>
                setFormData((prev) => ({ ...prev, selectedBankCode: value }))
              }
              searchQuery={formData.searchQuery}
              onSearchQueryChange={(value) =>
                setFormData((prev) => ({ ...prev, searchQuery: value }))
              }
            />
          </div>

          {loading.accountName && (
            <div className="flex flex-col">
              <Spinner color="orange" size="small" />
            </div>
          )}
          {!loading.accountName && formData.account.error && (
            <p className="font-bold text-red-600">
              <small>{formData.account.error}</small>
            </p>
          )}
          {!loading.accountName && formData.account.name && (
            <p className="font-bold text-green-600">
              <small>{formData.account.name}</small>
            </p>
          )}

          <div className="mt-5">
            <ButtonFormSubmit
              className={
                loading.accountName ||
                formData.account.error ||
                !formData.accountNumber ||
                !formData.selectedBankCode
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : ""
              }
              disabled={loading.submitting}
              text={
                loading.submitting ? (
                  <span className="flex items-center gap-2">
                    {isEditing ? "Updating" : "Adding"} account{" "}
                    <Spinner color="text" size="small" />
                  </span>
                ) : (
                  `${isEditing ? "Update" : "Add"} account`
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWithdrawalAccount;
