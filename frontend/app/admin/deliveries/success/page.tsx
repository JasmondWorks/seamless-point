import React from "react";
import CopyPhoneNumber from "../../../_components/CopyPhoneNumber";

export default function Success() {
  return (
    <div className="text-center flex flex-col gap-10 items-center">
      <div>
        <svg
          width={241}
          height={252}
          viewBox="0 0 241 252"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_94_2198"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={241}
            height={252}
          >
            <path
              d="M120.5 1L153.331 24.95L193.975 24.875L206.456 63.55L239.381 87.375L226.75 126L239.381 164.625L206.456 188.45L193.975 227.125L153.331 227.05L120.5 251L87.6686 227.05L47.0249 227.125L34.5437 188.45L1.61865 164.625L14.2499 126L1.61865 87.375L34.5437 63.55L47.0249 24.875L87.6686 24.95L120.5 1Z"
              fill="white"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M76.75 126L108 157.25L170.5 94.75"
              stroke="black"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
          <g mask="url(#mask0_94_2198)">
            <path d="M-29.5 -24H270.5V276H-29.5V-24Z" fill="#00A42E" />
          </g>
        </svg>
      </div>
      <p className="subheadline">
        Successful, a rider will soon contact you to pick up your package
      </p>
      <span className="flex py-3 leading-4 px-6 bg-green-200 rounded-lg text-green-500">
        Track your package here
      </span>
      <div>
        <CopyPhoneNumber />
        <span className="text-left text-opacity-80">Copy tracking number</span>
      </div>
    </div>
  );
}
