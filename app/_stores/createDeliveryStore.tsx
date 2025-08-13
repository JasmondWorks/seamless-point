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
    (set) => ({
      // State
      deliveryType: "",
      dispatch: "",
      sender: null,
      receiver: null,
      parcelDetails: null,
      courier: null,
      courierDetails: null,
      userId: getUserId(),

      replaceState: (newState: any) => set(() => ({ ...newState })),

      // Actions
      resetDeliveryData: () => {
        set({
          deliveryType: "",
          sender: null,
          receiver: null,
          parcelDetails: null, // Reset to an empty collection
          courier: null,
          courierDetails: null,
        });
      },

      onSelectDeliveryType: (type: DeliveryType) => set({ deliveryType: type }),
      onSelectCourier: (courier: any) => set({ courier }),
      onSetCourierDetails: (courierDetails: any) => set({ courierDetails }),
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
        courierDetails: state.courierDetails,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          validateAndResetUser(state.resetDeliveryData);
        }
      },
    }
  )
);
