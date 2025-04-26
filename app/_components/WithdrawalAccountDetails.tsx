"use client";

import Card from "@/app/_components/Card";
import { useLoader } from "@/app/_contexts/LoaderContext";
import { getUser } from "@/app/_lib/actions";
import { Edit } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const WithdrawalAccountDetails = ({ onShowAddAccount }: any) => {
  const [bankDetails, setBankDetails] = useState<{
    accountName: string;
    accountNumber: string;
    bankName: string;
  }>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });
  const { setIsLoading } = useLoader();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchAccDetails() {
      setIsLoading(true);
      const res = await getUser();

      setBankDetails(res?.user?.bankDetails ?? {});

      setIsLoading(false);
    }

    fetchAccDetails();
  }, []);

  return (
    <Card className="font-medium text-sm">
      <h3 className="pb-1 mb-5 border-b font-bold">Bank details</h3>
      <div className="flex gap-2 items-end justify-between">
        <div className="space-y-2">
          <p>{bankDetails?.accountName}</p>
          <p className="text-2xl font-bold">{bankDetails?.accountNumber}</p>
          <p>{bankDetails?.bankName}</p>
        </div>
        <button onClick={onShowAddAccount}>
          <Edit size={16} />
        </button>
      </div>
    </Card>
  );
};

export default WithdrawalAccountDetails;
