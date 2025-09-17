import Button, { ButtonVariant } from "@/app/_components/Button";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import Spinner from "@/app/_components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/app/_components/ui/dropdown-menu";
import { getUser } from "@/app/_lib/actions";
import { capitalise, cn, formatCurrency } from "@/app/_lib/utils";
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
const packageCategories = [
  {
    name: "daily",
    packages: [
      {
        id: 1,
        amount: 50,
        allocation: 45,
        duration: 1, // in days
        category: "Social",
      },
      {
        id: 2,
        amount: 150,
        allocation: 120,
        duration: 1, // in days
        category: "",
      },
      {
        id: 3,
        amount: 250,
        allocation: 500,
        duration: 1, // in days
        category: "YouTube",
      },
      {
        id: 4,
        amount: 450,
        allocation: 800,
        duration: 1, // in days
        category: "Social",
      },
      {
        id: 5,
        amount: 650,
        allocation: 1200,
        duration: 1, // in days
        category: "",
      },
    ],
  },
  {
    name: "weekly",
    packages: [
      {
        id: 6,
        amount: 500,
        allocation: 1500,
        duration: 2, // in days
        category: "",
      },
      {
        id: 7,
        amount: 750,
        allocation: 3000,
        duration: 7, // in days
        category: "YouTube",
      },
    ],
  },
  {
    name: "monthly",
    packages: [
      {
        id: 8,
        amount: 5000,
        allocation: 15000,
        duration: 30, // in days
        category: "Campus booster",
      },
      {
        id: 9,
        amount: 15000,
        allocation: 60,
        duration: 1, // in days
        category: "YouTube",
      },
    ],
  },
];

export default function BuyDataModal({
  open,
  onOpenChange,
}: BuyAirtimeModalProps) {
  const [step, setStep] = useState<Step>("browse");
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(
    networks[0]
  );
  const [isSelectNetworkDropdownOpen, setIsSelectNetworkDropdownOpen] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    packageCategories[0]
  );
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  // Reset selected package when selected category changes
  useEffect(() => {
    setSelectedPackage(null);
  }, [selectedCategory]);

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
                <DialogTitle>Buy Data</DialogTitle>
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
                <div className="space-y-6">
                  <h4 className="mb-2 font-bold text-center">
                    Choose a package
                  </h4>
                  <div>
                    <h5 className="mb-2 font-bold text-xs">Categories</h5>
                    <div className="flex">
                      {packageCategories.map((cat) => (
                        <div key={cat.name} className="">
                          <Button
                            onClick={() => setSelectedCategory(cat)}
                            className="!text-brandSec !border-brandSec !text-sm"
                            variant={
                              selectedCategory.name === cat.name
                                ? ButtonVariant.outline
                                : ButtonVariant.link
                            }
                          >
                            {capitalise(cat.name)}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="mb-2 font-bold text-xs">Packages</h5>
                    <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {selectedCategory.packages.map((pkg, idx) => {
                        const { duration, allocation, amount, category } = pkg;
                        const isSelected = selectedPackage?.id === pkg.id;

                        return (
                          <div
                            onClick={() => setSelectedPackage(pkg)}
                            key={idx}
                            className={cn(
                              "bg-brandSecLight rounded-md text-sm text-center overflow-hidden cursor-pointer grid grid-rows-[1fr_auto] p-3 space-y-3",
                              isSelected && "bg-brandSec text-white"
                            )}
                          >
                            <div className="my-auto">
                              <div>
                                {duration} day{duration > 1 ? "s" : ""}
                              </div>
                              <div className="font-bold">{allocation}MB</div>
                              {category && (
                                <div className="opacity-75 text-xs font-medium">
                                  ({category})
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
                              {formatCurrency(amount)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Prefilled Amount */}
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <span>₦</span>
                  <input
                    disabled
                    value={selectedPackage ? selectedPackage?.amount : ""}
                    type="tel"
                    placeholder="Amount"
                    className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec disabled:cursor-not-allowed bg-transparent"
                  />
                </div>
              </div>
              <Button
                onClick={() => setStep("confirm")}
                className="w-full"
                variant={ButtonVariant.fill}
                disabled={!selectedPackage}
              >
                Next
              </Button>
            </>
          )}
          {step === "confirm" && (
            <ConfirmPurchaseContent
              pkg={selectedPackage}
              network={selectedNetwork as Network}
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
  pkg,
}: {
  setStep: (step: Step) => void;
  network?: Network;
  pkg: any;
}) {
  const [balance, setBalance] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  const { amount } = pkg;

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

  return (
    <>
      <DialogHeader>
        <DialogTitle>Buy Data</DialogTitle>
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
              {formatCurrency(5000)}
            </div>
            <div className="text-sm space-y-3">
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Amount</h4>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Allocation</h4>
                <span className="font-medium">
                  {pkg.allocation}MB
                  {pkg?.category && ` (${pkg?.category})`}
                </span>
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
                  href="/deposit"
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
