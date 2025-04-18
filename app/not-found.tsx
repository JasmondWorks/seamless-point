"use client";

import Button, { ButtonVariant } from "@/app/_components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }
  return (
    <div className="grid place-items-center text-center bg-neutral-50 h-screen">
      <main className="flex flex-col gap-y-10 items-center">
        <span className="inline-flex">
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
        <div className="flex flex-col">
          <h1 className="headline text-lg font-bold">
            Error:
            <span className="text-red-500">404</span>
          </h1>
          <p>Page not found</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleGoBack}
            variant={ButtonVariant.fill}
            text="Go back"
            className="inline-block"
          />
          <Link href="/">
            <Button
              className="inline-block !border-brandSec !text-brandSec"
              variant={ButtonVariant.outline}
              text="To home page"
            />
          </Link>
        </div>
      </main>
    </div>
  );
}
