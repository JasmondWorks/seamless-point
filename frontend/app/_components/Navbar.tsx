"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button, { ButtonVariant } from "./Button";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { useApp } from "../_contexts/AppContext";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useUserAuth } from "../_contexts/UserAuthContext";

const siteRoutes = [
  { title: "Home", href: "/" },
  { title: "About us", href: "/about-us" },
  { title: "Products", href: "/products" },
  { title: "F.A.Q", href: "/faqs" },
  { title: "Contact us", href: "/contact-us" },
];
export default function Navbar() {
  const { user } = useUserAuth();
  // const user = null;
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-between py-2 px-5 bg-white w-full z-50 
        border-b border-neutral-200 transition-shadow duration-300 
        ${hasScrolled ? "shadow-md" : ""} bg-white`}
    >
      <Link href="/">
        <BrandLogo />
      </Link>
      <div className="flex gap-5 items-center">
        <div className="relative translate-y-1">
          <Bell opacity={0.65} size={20} />
          <div className="absolute top-0 font-bold right-0 translate-x-[20%] translate-y-[-40%] w-4 h-4 grid place-items-center rounded-full text-xs bg-orange-500 text-white">
            2
          </div>
        </div>
        <Link href="/dashboard">
          <Image
            className="h-10 w-10 rounded-full object-cover"
            src="/assets/images/avatar.jpg"
            width={100}
            height={100}
            alt="profile image"
          />
        </Link>
      </div>
    </div>
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
