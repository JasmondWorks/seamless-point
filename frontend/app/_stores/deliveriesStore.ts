import { create } from "zustand";
import { Delivery, DispatchEnum } from "@/app/_lib/types";

const initialDeliveries: Delivery[] = [
  {
    courier: {
      name: "FedEx",
      logo: "/assets/images/fedex.png",
      deliveryType: "Drop Off",
      price: 60000,
    },
    trackingNumber: "e2df7a06-2ffe-4b3d-adbd-33a2f3a951f6",
    sender: {
      country: "Nigeria",
      state: "Akwa Ibom",
      firstname: "Obafemi",
      lastname: "Olorede",
      city: "Ikot Ekpene",
      street: "10, DA Street, Shagari Estate, Ipaja, Lagos, Nigeria.",
      aptUnit: "135",
      email: "obafemilared@gmail.com",
      phoneNumber: "+2348115543766",
      deliveryTitle: "Sofa",
      summary: "A very long summary...",
    },
    receiver: {
      toCountry: "Nigeria",
      toState: "Bayelsa",
      toFirstname: "Obafemi",
      toLastname: "Olorede",
      toCity: "Twon-Brass",
      toStreet: "10, DA Street, Shagari Estate, Ipaja, Lagos, Nigeria.",
      toAptUnit: "333",
      toEmail: "obafemilared@gmail.com",
      toPhone: "+2348115543766",
    },
    parcelDetails: {
      parcelItems: [
        {
          itemName: "Soda",
          itemDescription: "kdfkjkdafj;adf",
          weight: 1,
          quantity: 1,
          type: "document",
          id: "40368aa9-352f-46d3-a2f8-74cc7114fdeb",
        },
      ],
      packagingType: "Bag",
      currency: "US Dollars (USD)",
      proofOfPurchase: {},
      packageImage: {},
    },
    dispatch: "FedEx",
    status: "ongoing",
    createdAt: "2024-12-16T13:25:30.336Z",
    amount: 1155,
  },
  {
    courier: {
      name: "FedEx",
      logo: "/assets/images/fedex.png",
      deliveryType: "Drop Off",
      price: 60000,
    },
    trackingNumber: "6678d0fa-08e4-4344-bd67-48f45dc7919b",
    sender: {
      country: "Nigeria",
      state: "Akwa Ibom",
      firstname: "Obafemi",
      lastname: "Olorede",
      city: "Ikot Ekpene",
      street: "10, DA Street, Shagari Estate, Ipaja, Lagos, Nigeria.",
      aptUnit: "135",
      email: "obafemilared@gmail.com",
      phoneNumber: "+2348115543766",
      deliveryTitle: "Sofa",
      summary: "A very long summary...",
    },
    receiver: {
      toCountry: "Nigeria",
      toState: "Bayelsa",
      toFirstname: "Obafemi",
      toLastname: "Olorede",
      toCity: "Twon-Brass",
      toStreet: "10, DA Street, Shagari Estate, Ipaja, Lagos, Nigeria.",
      toAptUnit: "333",
      toEmail: "obafemilared@gmail.com",
      toPhone: "+2348115543766",
    },
    parcelDetails: {
      parcelItems: [
        {
          itemName: "Soda",
          itemDescription: "kdfkjkdafj;adf",
          weight: 1,
          quantity: 1,
          type: "document",
          id: "40368aa9-352f-46d3-a2f8-74cc7114fdeb",
        },
      ],
      packagingType: "Bag",
      currency: "US Dollars (USD)",
      proofOfPurchase: {},
      packageImage: {},
    },
    dispatch: "FedEx",
    status: "ongoing",
    createdAt: "2024-12-16T13:23:11.316Z",
    amount: 71303,
  },
];

interface DeliveriesState {
  deliveries: Delivery[];
  isLoading?: boolean;

  lastFetched?: number | null; // Timestamp for caching
  fetchDeliveries?: () => Promise<void>;
  getDeliveryById?: (id: string) => Delivery | undefined;

  addDelivery?: (newDelivery: Delivery) => void;
  updateDelivery: (id: string, updatedData: Partial<Delivery>) => void;
  cancelDelivery: (id: string) => void;
  deleteDelivery: (id: string) => void;
}
const initialState: DeliveriesState = {
  deliveries: initialDeliveries,
  isLoading: false,
  lastFetched: null,
  addDelivery: () => {},
  updateDelivery: () => {},
  cancelDelivery: () => {},
  deleteDelivery: () => {},
};

export const useDeliveriesStore = create<DeliveriesState>((set, get) => ({
  ...initialState,

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
    get().deliveries.find((delivery) => delivery.trackingNumber === id),

  addDelivery: (newDelivery) =>
    set((state) => ({ deliveries: [newDelivery, ...state.deliveries] })),
  cancelDelivery: (id) =>
    set((state) => ({
      deliveries: state.deliveries.map((delivery) =>
        delivery.trackingNumber === id
          ? { ...delivery, status: "cancelled" }
          : delivery
      ),
    })),
  updateDelivery: (id, updatedData) =>
    set((state) => ({
      deliveries: state.deliveries.map((delivery) =>
        delivery.trackingNumber === id
          ? { ...delivery, ...updatedData }
          : delivery
      ),
    })),

  deleteDelivery: (id) =>
    set((state) => ({
      deliveries: state.deliveries.filter(
        (delivery) => delivery.trackingNumber !== id
      ),
    })),
}));

export default useDeliveriesStore;
