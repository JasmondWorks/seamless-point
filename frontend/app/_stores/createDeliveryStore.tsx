import {
  DeliveryType,
  Dispatch,
  newDelivery,
  ParcelDetails,
  Receiver,
  Sender,
} from "@/app/_lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCreateDeliveryStore = create(
  persist(
    (set) => ({
      deliveryType: "",
      dispatch: "",
      sender: null,
      receiver: null,
      parcelDetails: null,
      courier: null,
      step: 1, // initial step (sender form)

      resetDeliveryData: () => {
        set({
          deliveryType: "",
          sender: null,
          receiver: null,
          parcelDetails: null, // Reset to an empty collection
          courier: null,
          step: 1, // Reset to step 1
        });
      },

      // Actions to update form fields

      onSelectDeliveryType: (type: DeliveryType) => {
        set({ deliveryType: type });
      },
      onSelectCourier: (courier: Dispatch | null) => {
        set({ courier });
      },
      updateSender: (sender: Sender) =>
        set((state: newDelivery) => ({
          sender: { ...state.sender, ...sender },
        })),
      updateReceiver: (receiver: Receiver) =>
        set((state: newDelivery) => ({
          receiver: { ...state.receiver, ...receiver },
        })),
      selectCourier: (courier: Dispatch | null) => {
        set({ courier });
      },

      addParcelDetails: (parcelDetails: ParcelDetails) => {
        set((state: newDelivery) => ({
          parcelDetails: { ...state.parcelDetails, ...parcelDetails },
        }));
      },

      // Step navigation
      goToNextStep: () =>
        set((state: newDelivery) => ({ step: state.step + 1 })),
      goToPreviousStep: () =>
        set((state: newDelivery) => ({ step: state.step - 1 })),
      setStep: (step: number) => set({ step }),
    }),
    {
      name: "delivery-form-storage", // Key for local storage
      partialize: (state: newDelivery) => ({
        deliveryType: state.deliveryType,
        dispatch: state.dispatch,
        sender: state.sender,
        receiver: state.receiver,
        parcelDetails: state.parcelDetails,
        courier: state.courier,
        step: state.step,
      }), // Choose fields to persist
    }
  )
);
