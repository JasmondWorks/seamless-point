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
  UNCONFIRMED = "unconfirmed",
}
export type Delivery = {
  trackingId: string;
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
  firstName: string;
  lastName: string;
  street: string;
  aptUnit: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  email: string;
  phoneNumber: string;
  // deliveryTitle: string;
  // summary: string;
  // amountOfItems?: number;
  // instructions?: string;
}
export interface Receiver {
  toFirstName: string;
  toLastName: string;
  toStreet: string;
  toAptUnit: string;
  toCountry: string;
  toState: string;
  toCity: string;
  toPostCode: string;
  toEmail: string;
  toPhoneNumber: string;
}
export interface Parcel {
  name: string;
  category?: string;
  subCategory?: string;
  description?: string;
  hsCode?: string;
  weight: number;
  quantity: number;
  value?: number;
  id?: string;
}
type Tfile = {
  base64file: string;
  name: string;
};
export interface ParcelDetails {
  packagingType: EPackagingType | string;
  currency: ECurrency | string;
  packageImage?: Tfile;
  proofOfPurchase?: Tfile;
  parcelItems: Parcel[];
}
export interface newDelivery {
  deliveryType: DeliveryType | string;
  dispatch: DispatchEnum | string;
  sender: Sender | null;
  receiver: Receiver | null;
  parcelDetails: ParcelDetails | null;
  courier: Dispatch | null;
  userId: string;
  step: number; // Keep track of the current form step
  onSelectDeliveryType: (type: DeliveryType) => void;
  onSelectCourier: (courier: Dispatch | null) => void;
  updateSender: (sender: Sender) => void;
  updateReceiver: (receiver: Receiver) => void;
  addParcelDetails: (parcelDetails: ParcelDetails) => void;
  // addParcelFile: (
  //   file: File,
  //   fieldName: keyof ParcelDetails // Change this line to reference ParcelDetails
  // ) => void;
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
