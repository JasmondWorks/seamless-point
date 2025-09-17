import BalanceDisplay from "@/app/_components/BalanceDisplay";
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
import { getUser } from "@/app/_lib/actions";
import { formatCurrency } from "@/app/_lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";

type BuyAirtimeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Network = { name: string; logoSrc: string };
type Step = "browse" | "confirm";

const networks: Network[] = [
  {
    name: "Glo",
    logoSrc: "/assets/images/glo-logo.png",
  },
  {
    name: "Airtel",
    logoSrc: "/assets/images/airtel-logo.png",
  },
  {
    name: "MTN",
    logoSrc: "/assets/images/mtn-logo.png",
  },
  {
    name: "9Mobile",
    logoSrc: "/assets/images/9mobile-logo.png",
  },
];

export default function BuyAirtimeModal({
  open,
  onOpenChange,
}: BuyAirtimeModalProps) {
  const [step, setStep] = useState<Step>("browse");
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(
    networks[0]
  );
  const [amount, setAmount] = useState(0);
  const [isSelectNetworkDropdownOpen, setIsSelectNetworkDropdownOpen] =
    useState(false);

  console.log(open);

  function handleSelectNetwork(n: Network) {
    setSelectedNetwork(n);
    setIsSelectNetworkDropdownOpen(false);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          {step === "browse" && (
            <>
              <DialogHeader>
                <DialogTitle>Buy Airtime</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-sm">
                Browse all packages
              </DialogDescription>

              <div className="rounded-lg p-4 border space-y-6">
                {/* Network and number selection */}
                <div className="grid grid-cols-[auto_1fr] gap-5 items-center">
                  <div>
                    <DropdownMenu
                      open={isSelectNetworkDropdownOpen}
                      onOpenChange={setIsSelectNetworkDropdownOpen}
                    >
                      <DropdownMenuTrigger>
                        <div className="flex items-center gap-1">
                          <div>
                            {selectedNetwork ? (
                              <Image
                                src={selectedNetwork?.logoSrc}
                                width={70}
                                height={70}
                                className="w-10 aspect-square"
                                alt="Network logo"
                              />
                            ) : (
                              "Select a network"
                            )}
                          </div>
                          <IoMdArrowDropdown />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <div className="divide-y divide-neutral-200">
                          {networks.map((n) => (
                            <div
                              key={n.name}
                              onClick={() => handleSelectNetwork(n)}
                              className="cursor-pointer hover:bg-neutral-200 p-2"
                            >
                              {n.name}
                            </div>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec"
                  />
                </div>
                {/* Packages */}
                <div>
                  <h4 className="text-sm mb-2 font-bold text-muted">
                    Top up Airtime
                  </h4>
                  <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[50, 100, 200, 500, 1000, 2000].map((amount) => (
                      <div
                        className="bg-brandSecLight p-2 rounded-md font-bold text-center text-sm cursor-pointer"
                        onClick={() => setAmount(amount)}
                      >
                        {formatCurrency(amount)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enter Amount */}
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <span>₦</span>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    type="tel"
                    placeholder="Amount"
                    className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec"
                  />
                </div>
              </div>
              <Button
                disabled={!amount}
                onClick={() => setStep("confirm")}
                className="w-full"
                variant={ButtonVariant.fill}
              >
                Next
              </Button>
            </>
          )}
          {step === "confirm" && (
            <ConfirmPurchaseContent
              network={selectedNetwork as Network}
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
  network,
  amount,
}: {
  setStep: (step: Step) => void;
  network?: Network;
  amount: number;
}) {
  const [balance, setBalance] = useState(0);
  const [isLoading, setisLoading] = useState(true);

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

  console.log(balance);

  // if (isLoading) return <DataFetchSpinner />;
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
                <span className="font-medium">08012345678</span>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Provider</h4>
                <div className="font-medium flex items-center gap-2">
                  <span>Glo NG</span>
                  <Image
                    width={50}
                    height={50}
                    src={networks[0].logoSrc}
                    alt="network"
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
              disabled={amount > balance}
              className="w-full"
              variant={ButtonVariant.fill}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </>
  );
}
