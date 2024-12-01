import { create } from "zustand";

interface Delivery {
  id: string; // trackingNumber
  newSenderDetails: null;
  newReceiverDetails: null;
  senderDetails: null;
  receiverDetails: null;
  parcelDetails: object;
  courier: string;
  status: "pending" | "delivered" | "cancelled";
  createdAt: string;
}

interface DeliveriesState {
  deliveries: Delivery[];
  isLoading: boolean;
  lastFetched: number | null; // Timestamp for caching
  fetchDeliveries: () => Promise<void>;
  getDeliveryById: (id: string) => Delivery | undefined;
  senderDetails: null;
  receiverDetails: null;

  // Create new delivery
  addSenderDetails: () => void;
  addReceiverDetails: () => void;
  addDelivery: (newDelivery: Delivery) => void;

  updateDelivery: (id: string, updatedData: Partial<Delivery>) => void;
  deleteDelivery: (id: string) => void;
}

const useDeliveriesStore = create<DeliveriesState>((set, get) => ({
  deliveries: [],
  isLoading: false,
  lastFetched: null,

  fetchDeliveries: async () => {
    if (Date.now() - (get().lastFetched || 0) < 5 * 60 * 1000) return; // 5-minute cache

    set({ isLoading: true });
    try {
      const response = await fetch("/api/deliveries");
      const data = await response.json();
      set({ deliveries: data, lastFetched: Date.now() });
    } catch (error) {
      console.error("Failed to fetch deliveries:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getDeliveryById: (id) =>
    get().deliveries.find((delivery) => delivery.id === id),

  addDelivery: (newDelivery) =>
    set((state) => ({ deliveries: [newDelivery, ...state.deliveries] })),

  updateDelivery: (id, updatedData) =>
    set((state) => ({
      deliveries: state.deliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, ...updatedData } : delivery
      ),
    })),

  deleteDelivery: (id) =>
    set((state) => ({
      deliveries: state.deliveries.filter((delivery) => delivery.id !== id),
    })),
}));

export default useDeliveriesStore;
