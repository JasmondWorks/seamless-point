import {
  Dispatch,
  DispatchEnum,
  ECurrency,
  EDeliveryStatus,
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

export const packagingType = ["box", "bag", "envelope", "other"];

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
}