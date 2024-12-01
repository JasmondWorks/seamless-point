import { DeliveryType } from "@/app/types";
import { create } from "zustand";

interface Sender {
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
  amountOfItems: number;
  instructions: string;
}
interface Receiver {
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
interface Parcel {
  itemName: string;
  itemCategory?: string;
  itemSubCategory?: string;
  hsCode?: string;
  weight: number;
  quantity: number;
  value?: number;
}

interface DeliveryForm {
  deliveryType: DeliveryType | "";
  sender: Sender | null;
  receiver: Receiver | null;
  parcel: Parcel | null;
  courier: string; // 'ups', 'dhl', etc.
  step: number; // Keep track of the current form step
  onSelectDeliveryType: (type: DeliveryType) => void;
  updateSender: (sender: Sender) => void;
  updateReceiver: (receiver: Receiver) => void;
  updateParcel: (parcel: Parcel) => void;
}

export const useDeliveryFormStore = create<DeliveryForm>((set) => ({
  deliveryType: "",
  sender: null,
  receiver: null,
  parcel: null,
  courier: "",
  step: 1, // initial step (sender form)

  onSelectDeliveryType: (type: DeliveryType) => {
    set({ deliveryType: type });
  },
  onSelectCourier: (courier: string) => {
    set({ courier });
  },

  // Action to update sender details
  updateSender: (sender: Sender) =>
    set((state) => ({
      sender: { ...state.sender, ...sender },
    })),

  // Action to update receiver details
  updateReceiver: (receiver: Receiver) =>
    set((state) => ({
      receiver: { ...state.receiver, ...receiver },
    })),

  // Action to update parcel details
  updateParcel: (parcel: Parcel) =>
    set((state) => ({
      parcel: { ...state.parcel, ...parcel },
    })),

  // Action to select courier
  selectCourier: (courier: string) =>
    set((state) => ({
      courier,
    })),

  // Step navigation action
  goToNextStep: () => set((state) => ({ step: state.step + 1 })),
  goToPreviousStep: () => set((state) => ({ step: state.step - 1 })),
}));
