import { BillPaymentType } from "@/app/_components/PayBillsModal";
import {
  Dispatch,
  DispatchEnum,
  ECurrency,
  EDeliveryStatus,
  ElectricityProvider,
  NetworkProvider,
  TvProvider,
} from "@/app/_lib/types";

export const deliveryStatus = [
  EDeliveryStatus.ONGOING,
  EDeliveryStatus.PENDING,
  EDeliveryStatus.COMPLETED,
  EDeliveryStatus.CANCELLED,
  EDeliveryStatus.FAILED,
  EDeliveryStatus.UNCONFIRMED,
  EDeliveryStatus.UNCOMPLETED,
  EDeliveryStatus.DELIVERED,
];

export const dispatches: Dispatch[] = [
  {
    name: DispatchEnum.FEDEX,
    logo: `/assets/images/${DispatchEnum.FEDEX.toLowerCase()}.png`,
    deliveryType: "Drop Off",
    price: 60_000,
  },
  {
    name: DispatchEnum.UPS,
    logo: `/assets/images/${DispatchEnum.UPS.toLowerCase()}.png`,
    deliveryType: "Saves money",
    price: 60_000,
  },
  {
    name: DispatchEnum.DHL,
    logo: `/assets/images/${DispatchEnum.DHL.toLowerCase()}.png`,
    deliveryType: "Drop Off",
    price: 60_000,
  },
  {
    name: DispatchEnum.ANKA,
    logo: `/assets/images/${DispatchEnum.ANKA.toLowerCase()}.png`,
    deliveryType: "Saves money",
    price: 60_000,
  },
  {
    name: DispatchEnum.ARAMEX,
    logo: `/assets/images/${DispatchEnum.ARAMEX.toLowerCase()}.png`,
    deliveryType: "Saves money",
    price: 60_000,
  },
];

export const currencies = [
  {
    name: "Nigerian naira (NGN)",
    value: ECurrency.NGN,
  },
  {
    name: "US Dollars (USD)",
    value: ECurrency.USD,
  },
];

export const packagingType = ["box", "envelope", "soft-packaging"];

export const itemCategory = ["electronics", "clothing", "furniture", "other"];
export const itemSubCategory = [
  "electronics",
  "clothing",
  "furniture",
  "other",
];

export const paginationSearchParams = {
  page: "1",
  limit: "10",
  sortBy: "-createdAt",
};

export const commonAirtimeAmounts = [100, 200, 500, 1000, 2000, 5000];

export const commonElectricityAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

export const networkProviders: NetworkProvider[] = [
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
    name: "9mobile",
    logoSrc: "/assets/images/9mobile-logo.png",
  },
];
export const tvProviders: TvProvider[] = [
  {
    name: "Dstv",
    logoSrc: "/assets/images/dstv-logo.png",
  },
  {
    name: "Gotv",
    logoSrc: "/assets/images/gotv-logo.png",
  },
  {
    name: "Showmax",
    logoSrc: "/assets/images/showmax-logo.png",
  },
  {
    name: "Startimes",
    logoSrc: "/assets/images/startimes-logo.png",
  },
];
export const electricityProviders: ElectricityProvider[] = [
  {
    name: "IKEDC",
    logoSrc: "/assets/images/ikedc-logo.png",
  },
  {
    name: "EKEDC",
    logoSrc: "/assets/images/ekedc-logo.jpg",
  },
  {
    name: "KEDCO",
    logoSrc: "/assets/images/kedco-logo.png",
  },
  {
    name: "BEDC",
    logoSrc: "/assets/images/bedc-logo.png",
  },
];

export const billPaymentTabs: BillPaymentType[] = ["Electricity", "Tv"];
