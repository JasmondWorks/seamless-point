import { NotificationType, TNotification } from "@/app/_lib/types";

export const notifications: TNotification = [
  {
    type: NotificationType.INFO,
    isRead: false,
    _id: "6772e79c30700900094c72ae",
    user: "674cf9532e33cb0003c2afde",
    title: "Delivery pending!",
    message: "Your package is pending confirmation",
    referenceType: "Delivery",
    referenceId: "6772e79b30700900094c72ac",
    createdAt: "2024-12-30T18:34:04.022Z",
    updatedAt: "2024-12-30T18:34:04.022Z",
  },
  {
    type: NotificationType.INFO,
    isRead: false,
    _id: "6772ed9b30700900094c72da",
    user: "674cf9532e33cb0003c2afde",
    title: "Delivery pending!",
    message: "Your package is pending confirmation",
    referenceType: "Delivery",
    referenceId: "6772ed9b30700900094c72d8",
    createdAt: "2024-12-30T18:59:39.166Z",
    updatedAt: "2024-12-30T18:59:39.166Z",
  },
];
