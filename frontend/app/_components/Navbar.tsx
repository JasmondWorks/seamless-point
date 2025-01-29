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
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const { notificationsResponse } = useNotifications();

  const numUnreadNotifications =
    notificationsResponse?.data?.notifications.filter(
      (noti: TNotification) => !noti.isRead
    ).length;

  const { user } = useUserAuth();

  const pathname = usePathname();

  console.log(pathname);

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

  useEffect(() => {
    if (isNavShowing) {
      setIsOverlayVisible(true); // Make it block immediately when showing
    } else {
      // Wait for the opacity transition to finish before hiding
      const timeout = setTimeout(() => setIsOverlayVisible(false), 300); // Match the CSS transition duration
      return () => clearTimeout(timeout); // Cleanup timeout if `isNavShowing` changes quickly
    }
  }, [isNavShowing]);

  function handleShowNav() {
    setIsNavShowing(true);
  }
  function handleHideNav() {
    setIsNavShowing(false);
  }

  return (
    <>
      <div
        style={{ display: isOverlayVisible ? "block" : "none" }}
        onClick={() => setIsNavShowing(false)}
        className={`bg-black fixed left-0 right-0 bg-opacity-60 h-full z-20 duration-300 transition-opacity ${
          isNavShowing ? "opacity-50" : "opacity-0"
        } `}
      ></div>
      <div
        className={`h-20 md:h-auto md:static flex flex-wrap md:flex-row items-center justify-between ${
          pathname.includes("forgot-password") ? "bg-[#f0f9ff]" : "bg-white"
        } w-full z-50 gap-x-12 md:gap-20 px-0 md:px-5 md:py-2
          border-b border-neutral-200 transition-shadow duration-300
          ${hasScrolled ? "shadow-md" : ""} ${className}`}
      >
        <div
          className={`px-5 md:px-0 flex md:h-auto items-center h-full w-full ${
            !user ? "md:w-fit" : ""
          } justify-between`}
        >
          <Link href="/">
            <BrandLogo />
          </Link>
          {!isNavShowing && !user && (
            <button onClick={handleShowNav}>
              <FiMenu className="text-3xl md:hidden" />
            </button>
          )}
          {isNavShowing && !user && (
            <button onClick={handleHideNav}>
              <IoClose className="text-3xl md:hidden" />
            </button>
          )}
          {user && (
            <div className="flex items-center gap-8">
              <Link href="/user/notifications" className="relative">
                <Bell className="text-neutral-600" />

                {numUnreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 text-white rounded-full bg-brandSec w-5 text-sm font-bold h-5 grid place-items-center">
                    {numUnreadNotifications}
                  </span>
                )}
              </Link>
              <Link href="/user/dashboard">
                <Image
                  width={50}
                  height={50}
                  alt="profile"
                  src={user.profileImage || "/assets/images/avatar.png"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </Link>
            </div>
          )}
        </div>
        {/* Nav Menu */}
        {!user && (
          <div
            className={`${
              pathname.includes("forgot-password") ? "bg-[#f0f9ff]" : "bg-white"
            } flex flex-col md:flex-row md:items-center flex-1 gap-y-5 px-5 md:px-0 border-b md:border-b-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isNavShowing
                ? "max-h-[800px] opacity-100 pb-4 md:pb-0 translate-y-0"
                : "max-h-0 md:max-h-none md:opacity-100 opacity-0 -translate-y-4 md:-translate-y-0"
            }`}
          >
            <nav className="flex-1 justify-start">
              <ul className="flex flex-col md:flex-row md:items-center gap-x-8">
                {navLinks.map((link) => (
                  <li
                    key={link.href}
                    className="text-center font-medium border-b md:border-b-transparent py-4 md:py-0 border-neutral-100"
                  >
                    <a href={link.href}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="font-medium flex w-full md:w-fit flex-col md:flex-row">
              <Link href="/auth/user/login" className="inline-block">
                <Button
                  variant={ButtonVariant.link}
                  className="w-full py-7 md:py-3"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/user/signup" className="inline-block">
                <Button
                  isRoundedLarge
                  variant={ButtonVariant.fill}
                  className="!bg-brandSec !text-white w-full py-7 md:py-3"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export function BrandLogo({ type = "" }) {
  return (
    <>
      {type === "desktop" && (
        <Image
          className="hidden lg:inline-block h-14 object-contain w-full"
          src="/assets/images/logo.png"
          alt="logo"
          width={200}
          height={200}
        />
      )}
      {type === "mobile" && (
        <Image
          className="lg:hidden h-14 object-contain w-full"
          src="/assets/images/logo_mobile.png"
          alt="logo"
          width={200}
          height={200}
        />
      )}

      {!type && (
        <>
          <Image
            className="hidden lg:inline-block h-14 object-contain w-full"
            src="/assets/images/logo.png"
            alt="logo"
            width={200}
            height={200}
          />
          <Image
            className="lg:hidden h-14 object-contain w-full"
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
