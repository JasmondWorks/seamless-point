export enum DeliveryType {
  FOOD = "food-items",
  REGULAR = "regular-items",
}
export enum EDeliveryStatus {
  PENDING = "pending",
  ONGOING = "ongoing",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  FAILED = "failed",
  UNCOMPLETED = "uncompleted",
  COMPLETED = "completed",
}
export type Delivery = {
  trackingNumber: string;
  sender: Sender;
  receiver: Receiver;
  dispatch: DispatchEnum;
  courier: Dispatch;
  status: EDeliveryStatus;
  createdAt: string;
  amount: number;
  parcelDetails: ParcelDetails;
};

export type Dispatch = {
  name: string;
  logo: string;
  deliveryType: string;
  price: number;
};

export enum DispatchEnum {
  // Dispatch type as the value of the enum
  FEDEX = "FedEx",
  UPS = "UPS",
  DHL = "DHL",
  ANKA = "Anka",
  ARAMEX = "Aramex",
}

export interface Sender {
  country: string;
  state: string;
  city: string;
  street: string;
  aptUnit: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  deliveryTitle: string;
  summary: string;
  amountOfItems?: number;
  instructions?: string;
}
export interface Receiver {
  toCountry: string;
  toState: string;
  toFirstname: string;
  toLastname: string;
  toCity: string;
  toStreet: string;
  toAptUnit: string;
  toEmail: string;
  toPhone: string;
}
export interface Parcel {
  itemName: string;
  itemCategory?: string;
  itemSubCategory?: string;
  hsCode?: string;
  weight: number;
  quantity: number;
  value?: number;
}

export interface ParcelDetails {
  currency: ECurrency | string;
  packageImage: File | null;
  packagingType: EPackagingType | string;
  parcelItems: Parcel[];
  proofOfPurchase: File | null;
}
export interface newDelivery {
  deliveryType: DeliveryType | string;
  dispatch: DispatchEnum | string;
  sender: Sender | null;
  receiver: Receiver | null;
  parcelDetails: ParcelDetails | null;
  courier: Dispatch | null;
  step: number; // Keep track of the current form step
  onSelectDeliveryType: (type: DeliveryType) => void;
  onSelectCourier: (courier: Dispatch | null) => void;
  updateSender: (sender: Sender) => void;
  updateReceiver: (receiver: Receiver) => void;
  addParcelDetails: (parcelDetails: ParcelDetails) => void;
  resetDeliveryData: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setStep: (step: number) => void;
}
export enum EPackagingType {
  BOX = "Box",
  BAG = "Bag",
  ENVELOPE = "Envelope",
  OTHER = "Other",
}
export enum ECurrency {
  NGN = "NGN",
  USD = "USD",
}
