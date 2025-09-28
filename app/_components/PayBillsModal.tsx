import Button, { ButtonVariant } from "@/app/_components/Button";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";

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
import {
  buyElectricity,
  buyTvPlan,
  getTvPlans,
  getUser,
  verifyElectricityRecipient,
  verifyTvCardDetails,
} from "@/app/_lib/actions";
import {
  billPaymentTabs,
  commonElectricityAmounts,
  electricityProviders,
  tvProviders,
} from "@/app/_lib/constants";
import { ElectricityProvider, TvPlan, TvProvider } from "@/app/_lib/types";
import {
  capitalise,
  cn,
  formatCurrency,
  searchArrayOfObjs,
} from "@/app/_lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Wallet } from "lucide-react";
import Image from "next/image";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";

type PayBillsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type BillPaymentType = "Tv" | "Electricity";

type BillData = {
  // TV fields
  cardDetails?: any | null;
  cardNumber?: string;
  tvPlan?: TvPlan | null;
  // Electricity fields
  customerDetails?: any | null;
  recipient?: string;
  type?: "prepaid" | "postpaid";
  amount?: number;
  // Common
  provider: TvProvider | ElectricityProvider | null;
  phoneNumber?: string;
};

const TvContext = createContext<{
  data: BillData;
  onAddData: (object: Partial<BillData>) => void;
  onGoBack: () => void;
  onCloseModal: () => void;
}>({
  data: {
    cardDetails: null,
    provider: null,
    cardNumber: "",
    tvPlan: null,
    phoneNumber: "",
  },
  onAddData: (object: Partial<BillData>) => {},
  onGoBack: () => {},
  onCloseModal: () => {},
});
const ElectricityContext = createContext<{
  data: BillData;
  onAddData: (object: Partial<BillData>) => void;
  onGoBack: () => void;
  onCloseModal: () => void;
}>({
  data: {
    customerDetails: null,
    recipient: "",
    type: "prepaid",
    amount: 0,
    provider: null,
    phoneNumber: "",
  },
  onAddData: (object: Partial<BillData>) => {},
  onGoBack: () => {},
  onCloseModal: () => {},
});

export default function PayBillsModal({
  open,
  onOpenChange,
}: PayBillsModalProps) {
  const [selectedTab, setSelectedTab] = useState<BillPaymentType>("Tv");

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay Bills</DialogTitle>
          </DialogHeader>

          <div className="w-fit mx-auto mt-4 mb-2 flex flex-nowrap gap-1 p-1 bg-muted rounded-lg">
            {billPaymentTabs.map((tabName) => (
              <button
                type="button"
                key={tabName}
                onClick={() => setSelectedTab(tabName)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md transition-colors flex-shrink-0",
                  selectedTab === tabName
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {capitalise(tabName)}
              </button>
            ))}
          </div>

          {selectedTab === "Electricity" && (
            <ElectricityContent onCloseModal={() => onOpenChange(false)} />
          )}
          {selectedTab === "Tv" && (
            <TvContent onCloseModal={() => onOpenChange(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ElectricityContent({ onCloseModal }: { onCloseModal: () => void }) {
  const [data, setData] = useState<BillData>({
    customerDetails: null,
    provider: null,
    recipient: "",
    type: "prepaid",
    amount: 0,
    phoneNumber: "",
  });
  const [step, setStep] = useState<"browse" | "confirm">("browse");

  function handleAddData(object: Partial<BillData>) {
    setData((prev) => ({ ...prev, ...object }));
    setStep("confirm");
  }

  return (
    <ElectricityContext.Provider
      value={{
        data,
        onAddData: handleAddData,
        onGoBack: () => setStep("browse"),
        onCloseModal,
      }}
    >
      {step === "browse" && <SelectElectricityPlan />}
      {step === "confirm" && <ConfirmPurchaseElectricityContent />}
    </ElectricityContext.Provider>
  );
}

function TvContent({ onCloseModal }: { onCloseModal: () => void }) {
  const [data, setData] = useState<BillData>({
    cardDetails: null,
    provider: null,
    cardNumber: "",
    tvPlan: null,
  });
  const [step, setStep] = useState<"browse" | "confirm">("browse");

  function handleAddData(object: Partial<BillData>) {
    setData((prev) => ({ ...prev, ...object }));
    setStep("confirm");
  }

  return (
    <TvContext.Provider
      value={{
        data,
        onAddData: handleAddData,
        onGoBack: () => setStep("browse"),
        onCloseModal,
      }}
    >
      {step === "browse" && <SelectTvPlan />}
      {step === "confirm" && <ConfirmPurchaseTvPlanContent />}
    </TvContext.Provider>
  );
}

function SelectTvPlan() {
  const [isSelectTvProviderDropdownOpen, setIsSelectTvProviderDropdownOpen] =
    useState(false);
  const [selectedTvProvider, setSelectedTvProvider] = useState<TvProvider>(
    () => tvProviders.find((provider) => provider.name === "Dstv")!
  );
  const [cardNumber, setCardNumber] = useState("");
  const [isLoadingTvPlans, setIsLoadingTvPlans] = useState(false);
  const [tvPlans, setTvPlans] = useState<TvPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTvPlan, setSelectedTvPlan] = useState<TvPlan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onAddData } = useContext(TvContext);
  const [verifiedError, setVerifiedError] = useState(null);

  const filteredTvPlans = searchArrayOfObjs(tvPlans, searchTerm);

  useEffect(() => {
    fetchTvPlans();
  }, [selectedTvProvider]);

  const fetchTvPlans = async () => {
    setIsLoadingTvPlans(true);
    const res = await getTvPlans(selectedTvProvider.name.toLowerCase());
    const list: any[] = res?.data?.data ?? res?.data ?? [];

    if (res.status === "success") setTvPlans(list);
    else toast.error(res.message ?? "Failed to load tv plans");

    setIsLoadingTvPlans(false);
  };
  function handleSelectTvProvider(provider: TvProvider) {
    setSelectedTvProvider(provider);
    setIsSelectTvProviderDropdownOpen(false);
  }

  async function onSubmit(e: any) {
    e.preventDefault();

    setIsSubmitting(true);
    setVerifiedError(null);

    const res = await verifyTvCardDetails({
      provider: selectedTvProvider.name.toLowerCase(),
      cardNumber: process.env.NEXT_PUBLIC_TEST_TV_CARD_NUMBER ?? cardNumber,
    });

    setIsSubmitting(false);

    if (res.status === "success") {
      const payload = {
        cardDetails: res.data.data,
        provider: selectedTvProvider,
        tvPlan: selectedTvPlan,
        cardNumber,
      };
      onAddData(payload);
    } else {
      toast.error(res.message ?? "Failed to verify tv card details");
      setVerifiedError(res.message);
    }
  }

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] gap-5 items-center mb-4">
        <DropdownMenu
          open={isSelectTvProviderDropdownOpen}
          onOpenChange={setIsSelectTvProviderDropdownOpen}
        >
          <DropdownMenuTrigger>
            <div className="flex items-center gap-1">
              <div>
                {selectedTvProvider ? (
                  <Image
                    src={selectedTvProvider?.logoSrc}
                    width={70}
                    height={70}
                    className="w-20 h-auto"
                    alt="Provider logo"
                  />
                ) : (
                  <span>Select a provider</span>
                )}
              </div>
              <IoMdArrowDropdown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="divide-y divide-neutral-200">
              {tvProviders.map((n) => (
                <div
                  key={n.name}
                  onClick={() => handleSelectTvProvider(n)}
                  className="cursor-pointer hover:bg-neutral-200 p-2"
                >
                  {n.name}
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-col">
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            type="text"
            placeholder="Card number"
            className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec"
          />
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <h4 className="font-bold text-center">Choose a TV package</h4>
        <div className="rounded-lg p-4 border space-y-6">
          <div className="space-y-6">
            {!isLoadingTvPlans && (
              <div>
                <input
                  className="px-2 py-1.5 rounded-lg border border-neutral-200 focus:ring-brandSec focus:ring-2 focus:ring-offset-2 outline-none w-full mb-2"
                  placeholder="Search for packages"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[450px] overflow-y-auto">
                  {filteredTvPlans.map((plan: TvPlan) => {
                    const isSelected = selectedTvPlan?.code === plan.code;
                    return (
                      <div
                        onClick={() => setSelectedTvPlan(plan)}
                        key={plan.code}
                        className={cn(
                          "bg-brandSecLight rounded-md text-sm text-center overflow-hidden cursor-pointer grid grid-rows-[1fr_auto] p-3 space-y-3",
                          isSelected && "bg-brandSec text-white"
                        )}
                      >
                        <div className="my-auto">
                          <div className="font-bold">{plan.name}</div>
                          {plan.fixedPrice && (
                            <div className="opacity-75 text-xs font-medium">
                              ({plan.fixedPrice && "Fixed price"})
                            </div>
                          )}
                        </div>
                        <hr
                          className={cn(
                            "border-t",
                            isSelected
                              ? "border-white/15"
                              : "border-[#f2844c]/15"
                          )}
                        />
                        <div className="font-bold">
                          {formatCurrency(Number(plan.amount))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {tvPlans.length !== 0 && filteredTvPlans.length === 0 && (
                  <div className="grid place-items-center p-5 border bg-neutral-50 rounded-lg w-full">
                    <p className="font-bold">
                      No TV plan matches your search term!
                    </p>
                  </div>
                )}
              </div>
            )}
            {isLoadingTvPlans && <DataFetchSpinner />}
          </div>
        </div>
        {/* Prefilled Amount */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-2 !mt-6">
          <span>₦</span>
          {selectedTvPlan?.amount ? (
            <span>{selectedTvPlan.amount}</span>
          ) : (
            <span className="text-muted">Amount</span>
          )}
        </div>
        {verifiedError && (
          <p className="text-red-500 text-xs !leading-tight my-2">
            {String(verifiedError)}
          </p>
        )}
        <Button
          type="submit"
          className="w-full"
          variant={ButtonVariant.fill}
          disabled={!selectedTvPlan || !cardNumber}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "  Loading..." : "Next"}
        </Button>
      </form>
    </>
  );
}

function ConfirmPurchaseElectricityContent() {
  const [balance, setBalance] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, onGoBack, onCloseModal } = useContext(ElectricityContext);

  const customerDetails = data.customerDetails!;
  const provider = data.provider! as ElectricityProvider;
  const recipient = data.recipient!;
  const type = data.type!;
  const amount = data.amount!;
  const phoneNumber = data.phoneNumber!;

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

  async function onSubmit() {
    const payload = {
      provider: provider.name.toLowerCase(),
      recipient:
        process.env.NEXT_PUBLIC_TEST_ELECTRICITY_RECIPIENT ?? recipient,
      type,
      amount,
      phone: phoneNumber,
    };

    setIsSubmitting(true);
    const res = await buyElectricity(payload);
    setIsSubmitting(false);

    if (res.status === "success") {
      toast.success(res.message ?? "Electricity purchase successful");
      onCloseModal();
    } else {
      toast.error(res.message ?? "Electricity purchase failed");
    }
  }

  return (
    <>
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
                <h4 className="font-medium text-muted">Provider</h4>
                <div className="font-medium flex items-center gap-2">
                  <span>{provider.name}</span>
                  <Image
                    width={50}
                    height={50}
                    src={provider.logoSrc}
                    alt="provider"
                    className="w-12 h-auto"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Meter Type</h4>
                <span className="font-medium">{capitalise(type)}</span>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Meter Number</h4>
                <span className="font-medium">{recipient}</span>
              </div>
              <div className="my-2">
                <hr className="border-t border-neutral-200" />
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Customer Name</h4>
                <span className="font-medium">
                  {customerDetails.customerName}
                </span>
              </div>
              {customerDetails.address && (
                <div className="flex justify-between gap-5 items-center">
                  <h4 className="font-medium text-muted">Address</h4>
                  <span className="font-medium">{customerDetails.address}</span>
                </div>
              )}
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Phone number</h4>
                <span className="font-medium">{phoneNumber}</span>
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
              onClick={onGoBack}
            >
              Back
            </Button>
            <Button
              onClick={onSubmit}
              disabled={amount > balance}
              className="w-full"
              variant={ButtonVariant.fill}
              isLoading={isSubmitting}
            >
              Pay Bill
            </Button>
          </div>
        </>
      )}
    </>
  );
}

function SelectElectricityPlan() {
  const [
    isSelectElectricityProviderDropdownOpen,
    setIsSelectElectricityProviderDropdownOpen,
  ] = useState(false);
  const [selectedElectricityProvider, setSelectedElectricityProvider] =
    useState<ElectricityProvider>(
      () => electricityProviders.find((provider) => provider.name === "IKEDC")!
    );
  const [recipient, setRecipient] = useState("");
  const [type, setType] = useState<"prepaid" | "postpaid">("prepaid");
  const [amount, setAmount] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onAddData } = useContext(ElectricityContext);
  const [verifiedError, setVerifiedError] = useState<string | null>(null);

  const testRecipient = process.env.NEXT_PUBLIC_TEST_ELECTRICITY_RECIPIENT;
  const cleanedPhoneNumber = phoneNumber.trim();
  const canSubmit = Boolean(
    (recipient || testRecipient) && amount && amount > 0 && cleanedPhoneNumber
  );

  function handleSelectElectricityProvider(provider: ElectricityProvider) {
    setSelectedElectricityProvider(provider);
    setIsSelectElectricityProviderDropdownOpen(false);
  }

  function handleAmountInput(value: string) {
    if (value === "") {
      setAmount(null);
      return;
    }
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) return;
    setAmount(numericValue);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || !amount) return;

    setIsSubmitting(true);
    setVerifiedError(null);

    const effectiveRecipient = testRecipient ?? recipient;

    const res = await verifyElectricityRecipient({
      provider: selectedElectricityProvider.name.toLowerCase(),
      recipient: effectiveRecipient,
      type,
    });

    setIsSubmitting(false);

    if (res.status === "success") {
      onAddData({
        customerDetails: res.data.data,
        provider: selectedElectricityProvider,
        recipient: effectiveRecipient,
        type,
        amount,
        phoneNumber: cleanedPhoneNumber,
      });
    } else {
      toast.error(res.message ?? "Failed to verify electricity recipient");
      setVerifiedError(res.message);
    }
  }

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] gap-5 items-center mb-4">
        <DropdownMenu
          open={isSelectElectricityProviderDropdownOpen}
          onOpenChange={setIsSelectElectricityProviderDropdownOpen}
        >
          <DropdownMenuTrigger>
            <div className="flex items-center gap-1">
              <div>
                {selectedElectricityProvider ? (
                  <Image
                    src={selectedElectricityProvider?.logoSrc}
                    width={70}
                    height={70}
                    className="w-20 h-auto"
                    alt="Provider logo"
                  />
                ) : (
                  <span>Select a provider</span>
                )}
              </div>
              <IoMdArrowDropdown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="divide-y divide-neutral-200">
              {electricityProviders.map((n) => (
                <div
                  key={n.name}
                  onClick={() => handleSelectElectricityProvider(n)}
                  className="cursor-pointer hover:bg-neutral-200 p-2"
                >
                  {n.name}
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-col">
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            type="text"
            placeholder="Meter number"
            className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec"
          />
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <h4 className="font-bold text-center">Pay Electricity Bill</h4>
        <div className="rounded-lg p-4 border space-y-6">
          <div className="space-y-6">
            <div>
              <h5 className="font-medium mb-2">Meter Type</h5>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("prepaid")}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm",
                    type === "prepaid"
                      ? "bg-brandSec text-white"
                      : "bg-gray-200"
                  )}
                >
                  Prepaid
                </button>
                <button
                  type="button"
                  onClick={() => setType("postpaid")}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm",
                    type === "postpaid"
                      ? "bg-brandSec text-white"
                      : "bg-gray-200"
                  )}
                >
                  Postpaid
                </button>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-2">Select Amount</h5>
              <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {commonElectricityAmounts.map((amt) => {
                  const isSelected = amount === amt;
                  return (
                    <div
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={cn(
                        "bg-brandSecLight rounded-md text-sm text-center cursor-pointer p-3",
                        isSelected && "bg-brandSec text-white"
                      )}
                    >
                      {formatCurrency(amt)}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <span>₦</span>
              <input
                value={amount ?? ""}
                onChange={(e) => handleAmountInput(e.target.value)}
                type="number"
                min={0}
                step={100}
                placeholder="Enter amount"
                className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec"
              />
            </div>
            <div>
              <h5 className="font-medium mb-2">Phone number</h5>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                placeholder="08012345678"
                className="w-full border-b p-1.5 px-2 outline-none focus-visible:border-brandSec bg-transparent"
              />
            </div>
          </div>
        </div>
        {verifiedError && (
          <p className="text-red-500 text-xs !leading-tight my-2">
            {verifiedError}
          </p>
        )}
        <Button
          type="submit"
          className="w-full"
          variant={ButtonVariant.fill}
          disabled={!canSubmit}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Next"}
        </Button>
      </form>
    </>
  );
}
function ConfirmPurchaseTvPlanContent() {
  const [balance, setBalance] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, onGoBack, onCloseModal } = useContext(TvContext);

  const tvPlan = data.tvPlan!;
  const provider = data.provider!;
  const cardNumber = data.cardNumber!;
  const cardDetails = data.cardDetails!;
  const phoneNumber = cardDetails.customerNumber;

  let amount = Number(tvPlan?.amount!) as number;

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

  async function onSubmit() {
    const payload = {
      provider: provider.name.toLowerCase(),
      cardNumber: process.env.NEXT_PUBLIC_TEST_TV_CARD_NUMBER ?? cardNumber,
      planCode: tvPlan.code,
      amount,
      phone: phoneNumber,
    };

    setIsSubmitting(true);
    const res = await buyTvPlan(payload);
    setIsSubmitting(false);

    if (res.status === "success") {
      toast.success(res.message ?? "Tv plan purchase successful");
      onCloseModal();
    } else {
      toast.error(res.message ?? "Tv plan purchase failed");
    }
  }
  return (
    <>
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
                <h4 className="font-medium text-muted">Provider</h4>
                <div className="font-medium flex items-center gap-2">
                  <span>{provider.name}</span>
                  <Image
                    width={50}
                    height={50}
                    src={provider.logoSrc}
                    alt="network"
                    className="w-12 h-auto"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">TV Plan</h4>
                <span className="font-bold">{tvPlan?.name}</span>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Card number</h4>
                <span className="font-medium">{cardNumber}</span>
              </div>
              <div className="my-2">
                <hr className="border-t border-neutral-200" />
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Customer name</h4>
                <span className="font-medium">{cardDetails.customerName}</span>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Phone number</h4>
                <span className="font-medium">{phoneNumber}</span>
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
              onClick={onGoBack}
            >
              Back
            </Button>
            <Button
              onClick={onSubmit}
              disabled={amount > balance}
              className="w-full"
              variant={ButtonVariant.fill}
              isLoading={isSubmitting}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </>
  );
}
