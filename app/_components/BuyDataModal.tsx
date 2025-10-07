import Button, { ButtonVariant } from "@/app/_components/Button";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import SelectNetworkProvider from "@/app/_components/SelectNetworkProvider";
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
import { buyData, getDataBundles, getUser } from "@/app/_lib/actions";
import { bucketizeByCategory } from "@/app/_lib/data_bundle_categorizer";
import { capitalise, cn, formatCurrency } from "@/app/_lib/utils";
import { ngPhoneNumberSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

/* ----------------------------- Types & Consts ----------------------------- */

type BuyAirtimeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type NetworkProvider = { name: string; logoSrc: string };
type Step = "browse" | "confirm";

const CATEGORY_ORDER = [
  "hourly",
  "daily",
  "multi_day",
  "weekly",
  "fortnight",
  "monthly",
  "quarterly",
  "yearly",
  "special",
] as const;

type BundleCategoryName = (typeof CATEGORY_ORDER)[number];
type BucketizerResult = ReturnType<typeof bucketizeByCategory>;
type NormalizedPlan = BucketizerResult["normalized"][number];

type CategorizedPackage = {
  id: string;
  title: string;
  amount: number;
  durationLabel: string;
  allocationLabel: string;
  categoryLabel: string;
  raw: NormalizedPlan | any;
};

type Bucket = { name: BundleCategoryName; packages: CategorizedPackage[] };

const networks: NetworkProvider[] = [
  { name: "Glo", logoSrc: "/assets/images/glo-logo.png" },
  { name: "Airtel", logoSrc: "/assets/images/airtel-logo.png" },
  { name: "MTN", logoSrc: "/assets/images/mtn-logo.png" },
  { name: "9Mobile", logoSrc: "/assets/images/9mobile-logo.png" },
];

/* --------------------------------- Utils --------------------------------- */

const prettifyLabel = (label?: string) =>
  label ? capitalise(label.replace(/_/g, " ")) : "";

/** Turn my NormalizedPlan duration/tags into a short human label */
const formatDurationLabel = (plan: NormalizedPlan) => {
  if (!plan) return "";

  if (plan.hours && plan.hours > 0) {
    const hours = plan.hours;
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  if (plan.days && plan.days > 0) {
    // show weeks if divisible by 7
    if (plan.days % 7 === 0 && plan.days >= 7) {
      const weeks = plan.days / 7;
      return `${weeks} week${weeks > 1 ? "s" : ""}`;
    }
    return `${plan.days} day${plan.days > 1 ? "s" : ""}`;
  }

  if (plan.tags.includes("always_on")) return "Always On";
  if (plan.tags.includes("voice")) return "Voice Plan";
  if (plan.tags.includes("night")) return "Night Plan";
  if (plan.tags.includes("weekend")) return "Weekend Plan";
  if (plan.tags.includes("sunday")) return "Sunday Plan";

  return prettifyLabel(plan.category);
};

const formatAllocationLabel = (plan: NormalizedPlan) =>
  // sizeLabel holds "1.5GB", "500MB" if we could parse it; otherwise show the title
  plan.sizeLabel ?? plan.title;

const formatCategoryLabel = (plan: NormalizedPlan) => {
  if (plan.tags.length) {
    return plan.tags.map((t) => prettifyLabel(t)).join(", ");
  }
  return prettifyLabel(plan.category);
};

/** Map the API list for a provider to UI buckets using my bucketizer */
const deriveBucketsForProvider = (
  providerKey: "glo" | "mtn" | "airtel" | "9mobile",
  rawPlans: any[]
): Bucket[] => {
  if (!rawPlans?.length) return [];

  // 9mobile not supported by the normalizer yet ? dumb fallback
  if (providerKey === "9mobile") {
    return [
      {
        name: "special",
        packages: rawPlans.map((plan: any) => {
          const amount = parseFloat(
            String(plan.amount ?? 0).replace(/[^\d.]/g, "")
          );
          return {
            id: plan.code ?? plan.name,
            title: plan.name,
            amount: Number.isFinite(amount) ? Math.round(amount) : 0,
            durationLabel: plan.validity
              ? prettifyLabel(String(plan.validity))
              : "Special Plan",
            allocationLabel: plan.name,
            categoryLabel: "Special Plan",
            raw: plan,
          } as CategorizedPackage;
        }),
      },
    ];
  }

  // Feed only the selected provider into the bucketizer
  const { buckets } = bucketizeByCategory(
    providerKey === "glo" ? rawPlans : [],
    providerKey === "mtn" ? rawPlans : [],
    providerKey === "airtel" ? rawPlans : []
  );

  // Buckets is a keyed object; project it into ordered UI buckets
  return CATEGORY_ORDER.map((category) => {
    const plans = ((buckets as any)[category] ?? []) as NormalizedPlan[];

    return {
      name: category,
      packages: plans.map((plan) => ({
        id: plan.code,
        title: plan.title,
        amount: plan.priceNaira,
        durationLabel: formatDurationLabel(plan),
        allocationLabel: formatAllocationLabel(plan),
        categoryLabel: formatCategoryLabel(plan),
        raw: plan,
      })),
    };
  }).filter((b) => b.packages.length > 0);
};

/* --------------------------------- Form ---------------------------------- */

const schema = z.object({
  phoneNumber: ngPhoneNumberSchema,
  amount: z.coerce
    .number()
    .refine((v) => Number.isFinite(v), { message: "Amount is required" })
    .pipe(z.number().min(100, { message: "Min ?100" })),
});

type BuyAirtimeForm = z.infer<typeof schema>;

/* --------------------------------- View ---------------------------------- */

export default function BuyDataModal({
  open,
  onOpenChange,
}: BuyAirtimeModalProps) {
  const [step, setStep] = useState<Step>("browse");
  const [selectedProvider, setSelectedNetwork] = useState<
    NetworkProvider | undefined
  >(undefined);
  const [isSelectNetworkDropdownOpen, setIsSelectNetworkDropdownOpen] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Bucket | null>(null);
  const [selectedPackage, setSelectedPackage] =
    useState<CategorizedPackage | null>(null);
  const [dataBundles, setDataBundles] = useState<Bucket[]>([]);
  const [isLoadingBundles, setIsLoadingBundles] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState<{
    provider: NetworkProvider | null;
    recipient: string;
    pkg: CategorizedPackage | null;
  }>({
    provider: null,
    recipient: "",
    pkg: null,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<BuyAirtimeForm>({
    defaultValues: { phoneNumber: "", amount: "" as unknown as number },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const phone = useWatch({ control, name: "phoneNumber" }) as string;

  // Reset package when category changes
  useEffect(() => {
    setSelectedPackage(null);
  }, [selectedCategory]);

  // Set amount when package changes
  useEffect(() => {
    if (selectedPackage) {
      setValue("amount", selectedPackage.amount);
    }
  }, [selectedPackage, setValue]);

  // Clear provider when modal toggles
  useEffect(() => {
    setSelectedNetwork(undefined);
    setSelectedCategory(null);
    setSelectedPackage(null);
    setDataBundles([]);
    setPurchaseDetails({ provider: null, recipient: "", pkg: null });
    setStep("browse");
  }, [open]);

  // Fetch bundles for the selected provider
  const fetchBundles = async () => {
    if (!selectedProvider) return;

    setIsLoadingBundles(true);
    const key = selectedProvider.name.toLowerCase() as
      | "glo"
      | "mtn"
      | "airtel"
      | "9mobile";
    const res = await getDataBundles(key);

    if (res.status === "success") {
      const list: any[] = res?.data?.data ?? res?.data ?? [];
      const buckets = deriveBucketsForProvider(key, list);
      setDataBundles(buckets);
    } else {
      toast.error(res?.message ?? "Failed to load bundles");
    }
    setIsLoadingBundles(false);
  };

  useEffect(() => {
    setSelectedCategory(null);
    fetchBundles();
  }, [selectedProvider]);

  // Pick first category automatically
  useEffect(() => {
    if (dataBundles.length > 0) {
      setSelectedCategory((prev) => prev ?? dataBundles[0]!);
    }
  }, [dataBundles]);

  function handleSelectNetwork(n: NetworkProvider) {
    setSelectedNetwork(n);
    setIsSelectNetworkDropdownOpen(false);
  }

  function onSubmit(formValues: BuyAirtimeForm) {
    if (!selectedProvider || !selectedPackage) return;

    setPurchaseDetails({
      provider: selectedProvider as NetworkProvider,
      recipient: formValues.phoneNumber,
      pkg: selectedPackage,
    });

    setStep("confirm");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {step === "browse" && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 min-w-0">
            <div className="flex flex-col gap-1">
              <DialogHeader>
                <DialogTitle>Buy Data</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-sm">
                Browse all packages
              </DialogDescription>
            </div>

            <div className="rounded-lg p-4 border space-y-6">
              {/* Network + number */}
              <div className="grid grid-cols-[auto_1fr] gap-5 items-center">
                <div>
                  <DropdownMenu
                    open={isSelectNetworkDropdownOpen}
                    onOpenChange={setIsSelectNetworkDropdownOpen}
                  >
                    <SelectNetworkProvider
                      selectedProvider={selectedProvider as any}
                    />
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
                <div className="flex flex-col">
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    placeholder="Phone number"
                    className="border-b p-1.5 px-2 outline-none focus-visible:border-brandSec"
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-xs">
                      {String(errors.phoneNumber.message)}
                    </span>
                  )}
                </div>
              </div>

              {/* Categories + Packages */}
              {selectedProvider && (
                <div className="mt-8 space-y-6 min-w-0">
                  <h4 className="mb-2 font-bold text-center">
                    Choose a package
                  </h4>

                  {isLoadingBundles && <DataFetchSpinner />}
                  {/* Categories */}
                  {!isLoadingBundles && dataBundles.length > 0 && (
                    <div>
                      <h5 className="mb-2 font-bold text-xs">Categories</h5>
                      <div className="w-full max-w-full overflow-x-auto min-w-0">
                        <div className="flex w-max flex-nowrap gap-1 p-1 bg-muted rounded-lg">
                          {dataBundles.map((cat) => (
                            <button
                              type="button"
                              key={cat.name}
                              onClick={() => setSelectedCategory(cat)}
                              className={cn(
                                "px-3 py-1 text-sm font-medium rounded-md transition-colors flex-shrink-0",
                                selectedCategory?.name === cat.name
                                  ? "bg-background text-foreground shadow"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {capitalise(cat.name)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h5 className="mb-2 font-bold text-xs">Packages</h5>
                    {selectedCategory && (
                      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[450px] overflow-y-auto">
                        {selectedCategory?.packages.map((pkg) => {
                          const isSelected = selectedPackage?.id === pkg.id;
                          return (
                            <div
                              onClick={() => setSelectedPackage(pkg)}
                              key={pkg.id}
                              className={cn(
                                "bg-brandSecLight rounded-md text-sm text-center overflow-hidden cursor-pointer grid grid-rows-[1fr_auto] p-3 space-y-3",
                                isSelected && "bg-brandSec text-white"
                              )}
                            >
                              <div className="my-auto">
                                <div>{pkg.durationLabel}</div>
                                <div className="font-bold">
                                  {pkg.allocationLabel}
                                </div>
                                {pkg.categoryLabel && (
                                  <div className="opacity-75 text-xs font-medium">
                                    ({pkg.categoryLabel})
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
                                {formatCurrency(pkg.amount)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Prefilled Amount */}
              {selectedProvider && (
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <span>₦</span>
                  {selectedPackage?.amount ? (
                    <span>{selectedPackage.amount}</span>
                  ) : (
                    <span className="text-muted">Amount</span>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              variant={ButtonVariant.fill}
              disabled={
                !selectedPackage ||
                !selectedProvider ||
                !!errors.phoneNumber ||
                !phone
              }
            >
              Next
            </Button>
          </form>
        )}

        {step === "confirm" &&
          purchaseDetails.provider &&
          purchaseDetails.pkg && (
            <ConfirmPurchaseContent
              provider={purchaseDetails.provider!}
              pkg={purchaseDetails.pkg!}
              recipient={purchaseDetails.recipient}
              setStep={setStep}
              onCloseModal={() => onOpenChange(false)}
            />
          )}
      </DialogContent>
    </Dialog>
  );
}

/* ---------------------------- Confirm Step View --------------------------- */

function ConfirmPurchaseContent({
  setStep,
  provider,
  pkg,
  recipient,
  onCloseModal,
}: {
  setStep: (step: Step) => void;
  provider: NetworkProvider;
  pkg: CategorizedPackage;
  recipient: string;
  onCloseModal?: () => void;
}) {
  const [balance, setBalance] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amount = pkg.amount;

  useEffect(() => {
    (async () => {
      const userRes = await getUser();
      setisLoading(false);
      if (userRes?.status === "success") {
        setBalance(userRes.user.balance);
      } else {
        toast.error(userRes?.message ?? "Could not fetch wallet");
      }
    })();
  }, []);

  async function handleSubmit() {
    // API expects lowercase provider name
    const providerName = provider.name.toLowerCase();
    const payload = {
      amount,
      provider: providerName,
      recipient: process.env.NEXT_PUBLIC_TEST_PHONE_NUMBER ?? recipient, // change to actual recipient later
      bundleCode: pkg.id,
    };
    console.log(payload);

    setIsSubmitting(true);

    const response = await buyData(payload);

    setIsSubmitting(false);

    if (response.status === "success") {
      toast.success("Data purchase successful");
      onCloseModal && onCloseModal();
      return;
    } else {
      toast.error(response.message || "Data purchase failed");
      return;
    }
  }

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
              {formatCurrency(amount)}
            </div>

            <div className="text-sm space-y-3">
              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Amount</h4>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>

              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Allocation</h4>
                <span className="font-medium">
                  {pkg.allocationLabel}
                  {pkg?.categoryLabel && ` (${pkg?.categoryLabel})`}
                </span>
              </div>

              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">To</h4>
                <span className="font-medium">{recipient}</span>
              </div>

              <div className="flex justify-between gap-5 items-center">
                <h4 className="font-medium text-muted">Provider</h4>
                <div className="font-medium flex items-center gap-2">
                  <span>{provider?.name} NG</span>
                  <Image
                    width={50}
                    height={50}
                    src={provider?.logoSrc || ""}
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
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={amount > balance || isSubmitting}
              className="w-full"
              variant={ButtonVariant.fill}
            >
              {isSubmitting ? "Buying Data..." : "Buy Data"}
            </Button>
          </div>
        </>
      )}
    </>
  );
}
