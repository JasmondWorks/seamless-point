import { Dispatch, DispatchEnum } from "@/app/_lib/types";

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

export const currencies = ["Nigerian naira (NGN)", "US Dollars (USD)"];

export const packageType = ["Box", "Bag", "Envelope", "Other"];
