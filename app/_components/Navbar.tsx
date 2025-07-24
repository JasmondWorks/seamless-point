"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button, { ButtonVariant } from "./Button";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useUserAuth } from "../_contexts/UserAuthContext";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import useNotifications from "@/app/_hooks/notifications/useNotifications";
import { TNotification } from "@/app/_lib/types";
import { cn } from "@/app/_lib/utils";

const navLinks = [
  { title: "Home", href: "/#home" },
  { title: "About us", href: "/#about-us" },
  { title: "Products", href: "/#products" },
  { title: "F.A.Q", href: "/#faqs" },
  { title: "Contact us", href: "/#contact-us" },
];
export default function Navbar({ className = "" }) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isNavShowing, setIsNavShowing] = useState(false);
  const { notificationsResponse } = useNotifications();
  const { user, logout } = useUserAuth();
  const pathname = usePathname();

  const numUnreadNotifications =
    notificationsResponse?.data?.notifications.filter(
      (noti: TNotification) => !noti.isRead
    ).length;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsNavShowing(false);
  }, [pathname]);

  function handleCloseSidebar() {
    setIsNavShowing(false);
  }

  return (
    <>
      <div
        className={`py-2 lg:py-3 lg:h-auto lg:static flex lg:flex-row items-center justify-between ${
          pathname.includes("forgot-password") ? "bg-[#f0f9ff]" : "bg-white"
        } w-full z-50 gap-x-12 lg:gap-20 px-0 lg:px-5 lg:py-2
          border-b border-neutral-200 transition-shadow duration-300
          ${hasScrolled ? "shadow-md" : ""} ${className}`}
      >
        <div
          className={`px-5 lg:px-0 flex lg:h-auto items-center h-full w-full justify-between`}
        >
          <Link href="/">
            <BrandLogo />
          </Link>

          <div
            className={cn(
              `flex flex-col lg:flex-row lg:items-center flex-1 gap-y-5 px-5 lg:px-0 transition-all duration-300`,
              pathname.includes("forgot-password") ? "bg-[#f0f9ff]" : "bg-white"
            )}
          >
            <nav
              className={cn(
                "flex-1 justify-start",
                pathname.includes("user") &&
                  !pathname.includes("auth") &&
                  "hidden"
              )}
            >
              <ul className="hidden lg:flex items-center gap-x-8 justify-center">
                {navLinks.map((link) => (
                  <li key={link.href} className="text-center font-medium">
                    <a href={link.href}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            {!user && (
              <div className="font-medium hidden lg:flex">
                <Link href="/auth/user/login" className="inline-block">
                  <Button
                    variant={ButtonVariant.link}
                    className="w-full py-7 lg:py-3"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/user/signup" className="inline-block">
                  <Button
                    isRoundedLarge
                    variant={ButtonVariant.fill}
                    className="!bg-brandSec !text-white w-full py-7 lg:py-3"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex gap-8 items-center">
            {!user && (
              <div className="font-medium flex items-center lg:hidden leading-none">
                <Link href="/auth/user/login" className="inline-block">
                  <Button variant={ButtonVariant.link} className="text-sm !p-4">
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/user/signup" className="flex items-center">
                  <Button
                    isRoundedLarge
                    variant={ButtonVariant.fill}
                    className="!bg-brandSec !text-white text-sm !p-3 !py-1"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
            {user && (
              <div className="flex items-center gap-5">
                <Link
                  href={`/${
                    user.role === "user" ? "user" : "admin"
                  }/notifications`}
                  className={cn(
                    "relative",
                    numUnreadNotifications === 0 ? "" : "mt-[.3rem]"
                  )}
                >
                  <Bell className="text-neutral-600" />
                  {numUnreadNotifications > 0 && (
                    <span className="absolute -top-2 -right-2 text-white rounded-full bg-brandSec w-5 text-[.65rem] font-bold h-5 grid place-items-center">
                      {numUnreadNotifications > 5
                        ? "5+"
                        : numUnreadNotifications}
                    </span>
                  )}
                </Link>
                <Link
                  href={`/${user.role === "user" ? "user" : "admin"}/dashboard`}
                >
                  <Image
                    width={50}
                    height={50}
                    alt="profile"
                    src={user.profileImage || "/assets/images/avatar.png"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </Link>
                <button onClick={logout} className="">
                  <svg
                    className="text-current h-7 aspect-square"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.75 10L14.75 7M14.75 7L11.75 4M14.75 7L4.25 7M8.75 10V10.75C8.75 11.9926 7.74264 13 6.5 13H3.5C2.25736 13 1.25 11.9926 1.25 10.75V3.25C1.25 2.00736 2.25736 1 3.5 1H6.5C7.74264 1 8.75 2.00736 8.75 3.25V4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
            <button
              className={cn(
                "text-3xl bg-brandSecLight rounded-md p-1 border border-[#fed7aa]",
                pathname.includes("user") && !pathname.includes("auth")
                  ? "flex items-center"
                  : "lg:hidden"
              )}
              onClick={() => setIsNavShowing(true)}
            >
              <FiMenu size={26} strokeWidth={2} />
            </button>
          </div>
        </div>
        {/* Nav Menu */}
      </div>

      <Sidebar onCloseSidebar={handleCloseSidebar} isOpen={isNavShowing} />
    </>
  );
}

export function BrandLogo({ type = "" }) {
  return (
    <>
      {type === "desktop" && (
        <Image
          className="hidden lg:inline-block h-12 object-contain w-full"
          src="/assets/images/logo.png"
          alt="logo"
          width={200}
          height={200}
        />
      )}
      {type === "mobile" && (
        <Image
          className="lg:hidden h-12 object-contain w-full"
          src="/assets/images/logo_mobile.png"
          alt="logo"
          width={200}
          height={200}
        />
      )}

      {!type && (
        <>
          <Image
            className="hidden lg:inline-block h-12 object-contain w-full"
            src="/assets/images/logo.png"
            alt="logo"
            width={200}
            height={200}
          />
          <Image
            className="lg:hidden h-12 object-contain w-full"
            src="/assets/images/logo_mobile.png"
            alt="logo"
            width={200}
            height={200}
          />
        </>
      )}
    </>
  );
}

function Sidebar({
  onCloseSidebar,
  isOpen,
}: {
  onCloseSidebar: () => void;
  isOpen: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "bg-black/30 fixed inset-0 opacity-100 transition-all duration-300 z-[99]",
          !isOpen && "pointer-events-none opacity-0"
        )}
        onClick={onCloseSidebar}
      ></div>
      <div
        className={cn(
          "w-[300px] fixed right-0 h-dvh top-0 bottom-0 bg-white translate-x-[100%] transition-all duration-300 z-[999] p-5 shadow-2xl",
          isOpen && "translate-x-0"
        )}
      >
        <div className="flex justify-end mb-10">
          <button
            className={cn(
              "text-3xl bg-brandSecLight rounded-md p-1 flex items-center border border-[#fed7aa]",
              pathname.includes("user") || pathname.includes("admin")
                ? ""
                : "lg:hidden"
            )}
            onClick={onCloseSidebar}
          >
            <IoClose size={26} strokeWidth={2} />
          </button>
        </div>
        <nav>
          <ul className="flex flex-col divide-y divide-neutral-200 justify-center">
            {navLinks.map((link) => (
              <li key={link.href} className="text-center font-medium py-4">
                <a href={link.href}>{link.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
