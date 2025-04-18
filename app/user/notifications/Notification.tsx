import { NotificationType, TNotification } from "@/app/_lib/types";
import { formatDateTime } from "@/app/_lib/utils";
import clsx from "clsx";
import { Info } from "lucide-react";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Notification({
  notification,
}: {
  notification: TNotification;
}) {
  const { type, isRead, title, message, referenceType, createdAt, updatedAt } =
    notification;
  return (
    <div className="p-3 gap-5 bg-white rounded-big flex justify-between items-start relative">
      <div className="flex flex-col lg:flex-row gap-4 justify-start items-start lg:items-center">
        <div
          className={clsx("p-3 rounded-small", {
            "bg-customGreenLight": type === NotificationType.SUCCESS,
            "bg-customRedLight": type === NotificationType.ERROR,
            "bg-customBlueLight": type === NotificationType.INFO,
          })}
        >
          <span
            className={clsx(
              "flex justify-center items-center rounded-full text-lg",
              {
                "bg-customGreen text-customGreenLight border-customGreen border-2 p-1":
                  type === NotificationType.SUCCESS,
                "border-customRed text-customRed border-2 p-1":
                  type === NotificationType.ERROR,
                // "border-customBlue text-customBlue":
                //   type === NotificationType.INFO,
              }
            )}
          >
            {type === NotificationType.SUCCESS && <FaCheck />}
            {type === NotificationType.ERROR && <IoClose />}
            {type === NotificationType.INFO && (
              <Info className="text-customBlue" />
            )}
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-bold leading-snug">{title}</h3>
          <p className="">{message}</p>
        </div>
      </div>
      <span className=" text-neutral-300 text-sm">
        {formatDateTime(createdAt)}
      </span>
    </div>
  );
}
