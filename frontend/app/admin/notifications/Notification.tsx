import clsx from "clsx";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type TNotification = {
  status: string;
  title: string;
  desc: string;
};

const notification: TNotification = {
  status: "success",
  title: "Deposit Successful",
  desc: "200 naira was successfully deposited into your wallet",
};

export enum Status {
  FAILED = "failed",
  SUCCESS = "success",
}
export default function Notification({}) {
  return (
    <div className="p-3 gap-5 bg-white rounded-big flex justify-between items-start relative">
      <div className="flex flex-col lg:flex-row gap-4 justify-start items-start lg:items-center">
        <div
          className={clsx("p-3 rounded-small", {
            "bg-customGreenLight": notification.status === Status.SUCCESS,
            "bg-customRedLight": notification.status === Status.FAILED,
          })}
        >
          <span
            className={clsx(
              "flex justify-center items-center rounded-full p-1 border-2 text-lg",
              {
                "bg-customGreen text-customGreenLight border-customGreen":
                  notification.status === Status.SUCCESS,
                "border-customRed text-customRed":
                  notification.status === Status.FAILED,
              }
            )}
          >
            {notification.status === Status.SUCCESS && <FaCheck />}
            {notification.status === Status.FAILED && <IoClose />}
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-bold leading-snug">Deposit Successful</h3>
          <p className="">200 naira was sucessfully deposited</p>
        </div>
      </div>
      <span className=" text-neutral-300 text-sm">38 mins ago</span>
    </div>
  );
}
