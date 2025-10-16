"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/app/_components/Spinner";
import { getUser } from "@/app/_lib/actions";

export default function BankDetailsDisplay() {
  const [loading, setLoading] = useState(true);
  const [bankDetails, setBankDetails] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await getUser();

        if (!mounted) return;

        if (res?.status === "success") {
          setBankDetails(res?.user?.bankDetails ?? null);
        } else {
          toast.error(res?.message || "Failed to load bank details");
        }
      } catch (err) {
        toast.error("Failed to load bank details");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Spinner />;

  if (!bankDetails) return <p className="text-sm text-muted">No bank details available.</p>;

  const { bankName, accountNumber } = bankDetails;

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-muted">Bank</div>
      <div className="font-medium">{bankName || "-"}</div>

      <div className="text-sm text-muted mt-2">Account number</div>
      <div className="font-medium">{accountNumber || "-"}</div>
    </div>
  );
}
