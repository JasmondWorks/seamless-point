import Button, { ButtonVariant } from "@/app/_components/Button";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import SelectNetworkProvider from "@/app/_components/SelectNetworkProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/app/_components/ui/dropdown-menu";
import { getUser, topUpAirtime } from "@/app/_lib/actions";
import { commonAirtimeAmounts, networkProviders } from "@/app/_lib/constants";
import { NetworkProvider } from "@/app/_lib/types";
import { formatCurrency } from "@/app/_lib/utils";
import { ngPhoneNumberSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ChevronRight, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";

type BuyAirtimeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "browse" | "confirm";

const schema = z.object({
  phoneNumber: ngPhoneNumberSchema,
  amount: z.coerce
    .number()
    .refine((v) => Number.isFinite(v), { message: "Amount is required" }) // handle "" -> NaN
    .pipe(z.number().min(100, { message: "Min NGN 100" })),
});

type BuyAirtimeForm = z.infer<typeof schema>;

export default function BuyAirtimeModal({
  open,
  onOpenChange,
}: BuyAirtimeModalProps) {
  const [step, setStep] = useState<Step>("browse");
  const [selectedProvider, setSelectedProvider] =
    useState<NetworkProvider | null>(null);
  const [isSelectProviderDropdownOpen, setIsSelectProviderDropdownOpen] =
    useState(false);
  const [data, setData] = useState({
    provider: { name: "", logoSrc: "" } as NetworkProvider,
    recipient: "",
    amount: 0,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<BuyAirtimeForm>({
    defaultValues: {
      phoneNumber: "",
      amount: "" as unknown as number,
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const amount = useWatch({ control, name: "amount" }) as number;
  const phone = useWatch({ control, name: "phoneNumber" }) as string;

  useEffect(() => {
    setSelectedProvider(null);
  }, [open]);

  function handleSelectProvider(n: NetworkProvider) {
    setSelectedProvider(n);
    setIsSelectProviderDropdownOpen(false);
  }

  function onSubmit(data: BuyAirtimeForm) {
    setData({
      provider: selectedProvider as NetworkProvider,
      recipient: data.phoneNumber,
      amount: data.amount,
    });
    setStep("confirm");
  }
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          {step === "browse" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-1">
                <DialogHeader>
                  <DialogTitle>Buy Airtime</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-sm">
                  Browse all packages
                </DialogDescription>
              </div>
              <div className="rounded-lg p-4 border space-y-6">
                {/* Provider and number selection */}
                <div className="grid grid-cols-[auto_1fr] items-center">
                  <div>
                    <DropdownMenu
                      open={isSelectProviderDropdownOpen}
                      onOpenChange={setIsSelectProviderDropdownOpen}
                    >
                      <SelectNetworkProvider
                        selectedProvider={selectedProvider!}
                      />
                      <DropdownMenuContent>
                        <div className="divide-y divide-neutral-200">
                          {networkProviders.map((n) => (
                            <div
                              key={n.name}
                              onClick={() => handleSelectProvider(n)}
                              className="cursor-pointer hover:bg-neutral-200 p-2"
                            >
                              {n.name}
                            </div>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-col">
                    <input
                      {...register("phoneNumber")}
                      type="tel"
                      placeholder="Phone number"
                      className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec"
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-500 text-xs">
                        {errors.phoneNumber.message as string}
                      </span>
                    )}
                  </div>
                </div>
                {/* Packages */}
                <div>
                  <h4 className="text-sm mb-2 font-bold text-muted">
                    Top up Airtime
                  </h4>
                  <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {commonAirtimeAmounts.map((amount) => {
                      return (
                        <div
                          className="bg-brandSecLight p-2 rounded-md font-bold text-center text-sm cursor-pointer"
                          onClick={() =>
                            setValue("amount", amount, {
                              shouldValidate: true,
                            })
                          }
                        >
                          {formatCurrency(amount)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Enter Amount */}
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <span>₦</span>
                  <div className="flex flex-col">
                    <input
                      {...register("amount", {
                        valueAsNumber: true,
                        required: true,
                        min: 5000,
                      })}
                      type="number"
                      placeholder="Amount"
                      className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec"
                    />
                    {errors.amount && (
                      <span className="text-red-500 text-xs">
                        {errors.amount.message as string}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={
                  Object.keys(errors).length > 0 ||
                  !amount ||
                  !phone ||
                  !selectedProvider
                }
                className="w-full"
                variant={ButtonVariant.fill}
              >
                Next
              </Button>
            </form>
          )}
          {step === "confirm" && (
            <ConfirmPurchaseContent
              {...data}
              onCloseModal={() => onOpenChange(false)}
              provider={selectedProvider as NetworkProvider}
              amount={amount}
              setStep={setStep}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ConfirmPurchaseContent({
  setStep,
  provider,
  amount,
  recipient,
  onCloseModal,
}: {
  setStep: (step: Step) => void;
  provider: NetworkProvider;
  amount: number;
  recipient: string;
  onCloseModal?: () => void;
}) {
  const [balance, setBalance] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const userRes = await getUser();

      setisLoading(false);

      if (userRes.status === "success") {
        setBalance(userRes.user.balance);
        return;
      } else {
        toast.error(userRes.message);
      }
    }
    fetchUser();
  }, []);

  console.log(provider, recipient, amount);

  async function handleSubmit() {
    // API expects lowercase provider name
    const providerName = provider.name.toLowerCase();
    const payload = {
      amount,
      provider: providerName,
      recipient: "08011111111", // change to actual recipient later
    };
    console.log(payload);

    try {
      setIsSubmitting(true);

      const response = await topUpAirtime(payload);

      console.log(response);

      setIsSubmitting(false);

      if (response.status === "success") {
        toast.success("Airtime purchase successful");
        onCloseModal && onCloseModal();
        return;
      } else {
        toast.error(response.message || "Airtime purchase failed");
        // onCloseModal && onCloseModal();
        return;
      }
    } catch (error) {}
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Buy Airtime</DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-sm">
        Confirm purchase
      </DialogDescription>

      {isLoading ? (
        <DataFetchSpinner />
      ) : (
        <>
          <div className="rounded-lg p-4 border space-y-6">
            <div className="text-xl text-brandSec font-bold text-center">
              {formatCurrency(amount)}
            </div>
            <div className="text-sm space-y-3">
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Amount</h4>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">To</h4>
                <span className="font-medium">{recipient}</span>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Provider</h4>
                <div className="font-medium flex items-center gap-2">
                  <span>{provider.name}</span>
                  <Image
                    width={50}
                    height={50}
                    src={provider.logoSrc}
                    alt="provider"
                    className="w-6 aspect-square"
                  />
                </div>
              </div>
            </div>
            <div className="bg-brandSecLight rounded-md p-3 text-sm">
              {amount > balance && (
                <span className="text-red-500 text-xs font-bold block">
                  Insufficient balance
                </span>
              )}
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-neutral-700 flex items-center gap-2">
                  <Wallet size={18} />
                  <div>
                    <span className="mr-1">Wallet</span>
                    <span className="font-bold">
                      ({formatCurrency(balance)})
                    </span>
                  </div>
                </h4>
                <Button
                  href="/user/deposit"
                  variant={ButtonVariant.link}
                  className="!text-sm !p-0 !py-0"
                >
                  Deposit <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <Button
              className="w-full !border-brandSec !text-brandSec"
              variant={ButtonVariant.outline}
              onClick={() => setStep("browse")}
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={amount > balance || isSubmitting}
              className="w-full"
              variant={ButtonVariant.fill}
            >
              {isSubmitting ? "Buying Airtime..." : "Buy Airtime"}
            </Button>
          </div>
        </>
      )}
    </>
  );
}
