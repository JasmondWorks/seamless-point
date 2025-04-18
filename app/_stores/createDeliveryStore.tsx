"use client";

import {
  DeliveryType,
  newDelivery,
  ParcelDetails,
  Receiver,
  Sender,
} from "@/app/_lib/types";
import { getStoreState, getUserId } from "@/app/_lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Centralized user validation and reset logic
const validateAndResetUser = (resetDeliveryData: () => void) => {
  const userId = getUserId();
  const storeUserId = getStoreState(useCreateDeliveryStore).userId;

  if (userId !== storeUserId) {
    resetDeliveryData();
    return userId;
  }

  return storeUserId;
};

// Create the delivery store
export const useCreateDeliveryStore = create(
  persist(
    (set, get) => ({
      // State
      deliveryType: "",
      dispatch: "",
      sender: null,
      receiver: null,
      parcelDetails: null,
      courier: null,
      step: 1, // Initial step (sender form)
      userId: getUserId(),

      // Actions
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

      onSelectDeliveryType: (type: DeliveryType) => set({ deliveryType: type }),
      onSelectCourier: (courier: any) =>
        set({ courier: courier.name.toLowerCase() }),
      updateSender: (sender: Sender) =>
        set((state: newDelivery) => ({
          sender: { ...state.sender, ...sender },
        })),
      updateReceiver: (receiver: Receiver) =>
        set((state: newDelivery) => ({
          receiver: { ...state.receiver, ...receiver },
        })),
      addParcelDetails: (parcelDetails: ParcelDetails) =>
        set((state: newDelivery) => ({
          parcelDetails: { ...state.parcelDetails, ...parcelDetails },
        })),
      // addParcelFile: (
      //   file: File,
      //   fieldName: keyof Pick<newDelivery, "packageImage" | "proofOfPurchase">
      // ) => {
      //   set({ [fieldName]: file });
      // },
      // addParcelFile: (
      //   file: File,
      //   fieldName: keyof ParcelDetails // Change this line to reference ParcelDetails
      // ) => {
      //   set((state: newDelivery) => ({
      //     parcelDetails: {
      //       ...state.parcelDetails,
      //       [fieldName]: file,
      //     } as ParcelDetails,
      //   }));
      // },

      // Step navigation
      goToNextStep: () =>
        set((state: newDelivery) => ({ step: state.step + 1 })),
      goToPreviousStep: () =>
        set((state: newDelivery) => ({ step: state.step - 1 })),
      setStep: (step: number) => set({ step }),

      // User ID check
      checkUserId: () => {
        set((state) => ({
          userId: validateAndResetUser(state.resetDeliveryData),
        }));
      },
    }),
    {
      name: "delivery-form-storage",
      partialize: (state: newDelivery) => ({
        deliveryType: state.deliveryType,
        dispatch: state.dispatch,
        sender: state.sender,
        receiver: state.receiver,
        parcelDetails: state.parcelDetails,
        courier: state.courier,
        step: state.step,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          validateAndResetUser(state.resetDeliveryData);
        }
      },
    }
  )
);
