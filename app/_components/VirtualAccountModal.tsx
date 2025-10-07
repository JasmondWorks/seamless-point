"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import Badge, { BadgeVariant } from "@/app/_components/Badge";
import { deleteVirtualAccount, getVirtualAccount } from "@/app/_lib/actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { formatCurrency } from "@/app/_lib/utils";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import { getUser } from "@/app/_lib/actions-v1";

interface VirtualAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onAccountDeleted?: () => void;
}

export default function VirtualAccountModal({
  isOpen,
  onClose,
  amount,
  onAccountDeleted,
}: VirtualAccountModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [virtualAccount, setVirtualAccount] = useState<{
    accountNumber: string;
    accountName: string;
    bankName: string;
    bankCode: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    async function fetchVirtualAccount() {
      setIsLoading(true);
      const res = await getUser();
      setIsLoading(false);

      if (res.status === "success") setVirtualAccount(res.user.virtualAccount);
    }
    fetchVirtualAccount();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete this virtual account?")) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await deleteVirtualAccount();

      if (response.status === "success") {
        toast.success("Virtual account deleted successfully");
        onClose();
        onAccountDeleted?.();
      } else {
        toast.error(response.message || "Failed to delete virtual account");
      }
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error("Failed to delete virtual account");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Virtual Account Details
            {/* <Badge variant={BadgeVariant.green} text="Active" /> */}
          </DialogTitle>
          <DialogDescription>
            Transfer money to this account to fund your wallet instantly
          </DialogDescription>
        </DialogHeader>

        {isLoading && <DataFetchSpinner />}

        {!isLoading && (
          <>
            <p className="font-bold text-3xl my-2 text-center">
              {formatCurrency(amount)}
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Account Number
                  </span>
                  <span className="font-mono text-lg font-bold">
                    {virtualAccount?.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Account Name
                  </span>
                  <span className="font-medium text-right">
                    {virtualAccount?.accountName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Bank
                  </span>
                  <span className="font-medium">
                    {virtualAccount?.bankName}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <Badge variant={BadgeVariant.red}>
                  Please send the exact amount
                </Badge>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Funds transferred to this account will
                  be automatically credited to your wallet.
                </p>
              </div>
              <Button
                href="/user/dashboard"
                className="w-full"
                variant={ButtonVariant.fill}
              >
                I've transferred
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
