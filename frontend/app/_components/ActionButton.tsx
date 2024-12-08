import clsx from "clsx";
import React from "react";

export default function ActionButton({
  icon,
  text,
  size = "",
}: {
  icon: any;
  text: string;
  size?: string;
}) {
  return (
    <div className="p-5 rounded-xl items-center flex gap-6 bg-[#fef5ee]">
      <span
        className={clsx(
          "rounded-full bg-orange-200 p-3 aspect-square grid place-items-center"
        )}
      >
        {icon ? (
          <span
            className={clsx(
              "w-10 flex justify-center items-center aspect-square",
              {
                "w-8 ": size === "sm",
                "w-12 lg:w-14": size !== "sm",
              }
            )}
          >
            {icon}
          </span>
        ) : (
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 8.75H17.5V2.5C17.5 2.16848 17.6317 1.85054 17.8661 1.61612C18.1005 1.3817 18.4185 1.25 18.75 1.25C19.0815 1.25 19.3995 1.3817 19.6339 1.61612C19.8683 1.85054 20 2.16848 20 2.5V8.75ZM30 19.3156V11.25C30 10.587 29.7366 9.95107 29.2678 9.48223C28.7989 9.01339 28.163 8.75 27.5 8.75H20V18.2328L22.8656 15.3656C22.9818 15.2495 23.1196 15.1574 23.2714 15.0945C23.4231 15.0317 23.5858 14.9993 23.75 14.9993C23.9142 14.9993 24.0769 15.0317 24.2286 15.0945C24.3804 15.1574 24.5182 15.2495 24.6344 15.3656C24.7505 15.4818 24.8426 15.6196 24.9055 15.7714C24.9683 15.9231 25.0007 16.0858 25.0007 16.25C25.0007 16.4142 24.9683 16.5769 24.9055 16.7286C24.8426 16.8804 24.7505 17.0182 24.6344 17.1344L19.6344 22.1344C19.5183 22.2506 19.3804 22.3428 19.2287 22.4057C19.0769 22.4686 18.9143 22.501 18.75 22.501C18.5857 22.501 18.4231 22.4686 18.2713 22.4057C18.1196 22.3428 17.9817 22.2506 17.8656 22.1344L12.8656 17.1344C12.6311 16.8998 12.4993 16.5817 12.4993 16.25C12.4993 15.9183 12.6311 15.6002 12.8656 15.3656C13.1002 15.1311 13.4183 14.9993 13.75 14.9993C14.0817 14.9993 14.3998 15.1311 14.6344 15.3656L17.5 18.2328V8.75H10C9.33696 8.75 8.70107 9.01339 8.23223 9.48223C7.76339 9.95107 7.5 10.587 7.5 11.25V31.25C7.5 31.5815 7.6317 31.8995 7.86612 32.1339C8.10054 32.3683 8.41848 32.5 8.75 32.5H20.4219C20.4719 32.6047 20.5266 32.7094 20.5859 32.8125L20.6234 32.8719L24.1016 38.1844C24.2831 38.4618 24.5674 38.6558 24.8919 38.7236C25.2164 38.7915 25.5546 38.7276 25.832 38.5461C26.1095 38.3646 26.3034 38.0803 26.3713 37.7558C26.4391 37.4312 26.3753 37.0931 26.1938 36.8156L22.7359 31.5359C22.4908 31.1031 22.4277 30.5906 22.5604 30.1112C22.6932 29.6318 23.0109 29.2248 23.4437 28.9797C23.8766 28.7346 24.3891 28.6714 24.8685 28.8042C25.3479 28.9369 25.7549 29.2547 26 29.6875C26.0109 29.7078 26.0234 29.7281 26.0359 29.7469L27.7047 32.2953C27.8522 32.5203 28.0683 32.6916 28.321 32.784C28.5737 32.8763 28.8494 32.8846 29.1072 32.8078C29.365 32.7309 29.5911 32.5729 29.7519 32.3573C29.9128 32.1417 29.9998 31.8799 30 31.6109V22.5C31.1782 23.5906 32.1192 24.9122 32.7644 26.3824C33.4095 27.8525 33.745 29.4398 33.75 31.0453V37.5C33.75 37.8315 33.8817 38.1495 34.1161 38.3839C34.3505 38.6183 34.6685 38.75 35 38.75C35.3315 38.75 35.6495 38.6183 35.8839 38.3839C36.1183 38.1495 36.25 37.8315 36.25 37.5V31.0391C36.2429 28.7235 35.6698 26.4448 34.5804 24.4014C33.4911 22.3581 31.9186 20.6121 30 19.3156Z"
              fill="#772517"
            />
          </svg>
        )}
      </span>
      <span className="text-[#772517]">{text || "Deposit"}</span>
    </div>
  );
}
