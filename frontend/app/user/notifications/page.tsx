"use client";

import Badge, { BadgeVariant } from "@/app/_components/Badge";
import React, { useEffect } from "react";
import Notification from "./Notification";
import useNotifications from "@/app/_hooks/useNotifications";
import { fetchDeliveries, fetchNotifications } from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";

const notificationsMockData = [
  {
    status: "",
    title: "",
    desc: "",
    addedAt: new Date(),
  },
  {
    status: "",
    title: "",
    desc: "",
    addedAt: new Date(),
  },
  {
    status: "",
    title: "",
    desc: "",
    addedAt: new Date(),
  },
];

export default function Notifications() {
  // const { notifications, isLoading } = useNotifications();

  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(),
    refetchOnWindowFocus: true,
    staleTime: 0, // Data will always be refetched on focus
  });

  console.log("here");
  console.log(notifications);

  // useEffect(() => {
  //   async function loadNotifications() {
  //     try {
  //       const notifications = await fetchNotifications();

  //       console.log(notifications);
  //     } catch (error) {}
  //   }
  //   loadNotifications();
  // }, []);

  return (
    <>
      <div className="flex justify-between items-center border-b pb-3 border-neutral-300">
        <h1 className="headline">Notifications</h1>
        <button>
          <Badge className="font-bold" variant={BadgeVariant.red}>
            Clear all
          </Badge>
        </button>
      </div>
      {notifications?.data?.totalCount !== 0 && (
        <div className={`space-y-5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Notification key={i} />
          ))}
        </div>
      )}
      {notifications?.data?.totalCount === 0 && (
        <div className="flex gap-5 flex-col items-center">
          <svg
            className=""
            width={300}
            height={300}
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M150 300C189.782 300 227.936 284.196 256.066 256.066C284.196 227.936 300 189.782 300 150C300 110.218 284.196 72.0644 256.066 43.934C227.936 15.8035 189.782 0 150 0C110.218 0 72.0644 15.8035 43.934 43.934C15.8035 72.0644 0 110.218 0 150C0 189.782 15.8035 227.936 43.934 256.066C72.0644 284.196 110.218 300 150 300ZM92.3812 93.5625C87.0438 101.612 84.375 109.55 84.375 117.375C84.375 121.188 86.0625 124.725 89.4375 127.988C92.8125 131.25 96.9438 132.875 101.831 132.863C110.144 132.863 115.787 128.2 118.763 118.875C121.912 109.963 125.762 103.213 130.312 98.625C134.863 94.05 141.95 91.7625 151.575 91.7625C159.8 91.7625 166.519 94.0312 171.731 98.5687C176.931 103.119 179.531 108.694 179.531 115.294C179.554 118.605 178.672 121.859 176.981 124.706C175.244 127.596 173.125 130.239 170.681 132.562C166.739 136.173 162.687 139.662 158.531 143.025C152.156 148.312 147.081 152.875 143.306 156.712C139.556 160.562 136.537 165.019 134.25 170.081C128.212 193.425 159.562 195.3 166.8 178.631C167.675 177.031 169.006 175.256 170.794 173.306C172.594 171.369 174.981 169.119 177.956 166.556C185.543 160.238 193.006 153.774 200.344 147.169C204.494 143.344 208.075 138.781 211.088 133.481C214.199 127.839 215.765 121.474 215.625 115.031C215.625 106.131 212.975 97.8812 207.675 90.2812C202.387 82.6688 194.888 76.6562 185.175 72.2438C175.463 67.8312 164.262 65.625 151.575 65.625C137.925 65.625 125.981 68.2688 115.744 73.5563C105.506 78.8438 97.7188 85.525 92.3812 93.5625ZM132.506 226.312C132.506 231.285 134.482 236.054 137.998 239.571C141.514 243.087 146.283 245.062 151.256 245.062C156.229 245.062 160.998 243.087 164.515 239.571C168.031 236.054 170.006 231.285 170.006 226.312C170.006 221.34 168.031 216.571 164.515 213.054C160.998 209.538 156.229 207.562 151.256 207.562C146.283 207.562 141.514 209.538 137.998 213.054C134.482 216.571 132.506 221.34 132.506 226.312Z"
              fill="#E7E8EC"
            />
          </svg>
          <span>You do not have any current notifications</span>
        </div>
      )}
    </>
  );
}
