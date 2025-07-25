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
  email?: string;
  phoneNumber?: string;
  addressId?: string;
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
  addressId?: string;
}
export interface Parcel {
  description: string;
  weight: number;
  quantity: number;
  value: number;
  length: number;
  width: number;
  height: number;
  id?: string;
  category?: string;
  subCategory?: string;
  hsCode?: string;
}
export type StoredFile = {
  base64File: string;
  name: string;
};
export interface ParcelDetails {
  packagingType: EPackagingType | string;
  currency: ECurrency | string;
  packageImage?: StoredFile | null;
  proofOfPurchase?: StoredFile | null;
  parcelItems: Parcel[];
}
export interface newDelivery {
  deliveryType: DeliveryType | string;
  dispatch: DispatchEnum | string;
  sender: Sender | null;
  receiver: Receiver | null;
  parcelDetails: ParcelDetails | null;
  courier: any;
  courierDetails: any;
  userId: string;
  step: number; // Keep track of the current form step
  onSelectDeliveryType: (type: DeliveryType) => void;
  onSelectCourier: (courier: Dispatch | null) => void;
  onSetCourierDetails: (courier: any) => void;
  updateSender: (sender: Sender) => void;
  updateReceiver: (receiver: Receiver) => void;
  addParcelDetails: (parcelDetails: ParcelDetails) => void;
  resetDeliveryData: () => void;
  replaceState: (newState: any) => void;
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
export enum NotificationType {
  INFO = "info",
  ERROR = "error",
  SUCCESS = "success",
}
export type TNotification = {
  type: NotificationType; // A string literal type for notification type.
  isRead: boolean; // A boolean to indicate whether the notification is read.
  _id: string; // A unique identifier for the notification.
  user: string; // The ID of the user the notification belongs to.
  title: string; // The title of the notification.
  message: string; // The content or message of the notification.
  referenceType: "Delivery"; // A string literal type for the reference type.
  referenceId: string; // The ID of the related reference object.
  createdAt: string; // ISO date string representing when the notification was created.
  updatedAt: string; // ISO date string representing when the notification was last updated.
};
