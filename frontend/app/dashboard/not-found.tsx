import React from "react";

export default function NotFound() {
  return (
    <div className="h-full grid place-items-center text-center">
      <div>
        <span>
          <svg
            width={271}
            height={270}
            viewBox="0 0 271 270"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M191.42 0H79.58L0.5 79.08V190.92L79.58 270H191.42L270.5 190.92V79.08L191.42 0ZM150.5 210H120.5V180H150.5V210ZM150.5 150H120.5V60H150.5V150Z"
              fill="#C00505"
            />
          </svg>
        </span>
        <p>
          {"we're"} sorry, but it appears {"we've"} just encountered an error
        </p>
      </div>
    </div>
  );
}
