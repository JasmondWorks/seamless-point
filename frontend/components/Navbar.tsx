"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button, { ButtonVariant } from "./Button";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { useApp } from "@/contexts/AppContext";
import { Bell } from "lucide-react";
import Image from "next/image";

const siteRoutes = [
  { title: "Home", href: "/" },
  { title: "About us", href: "/about-us" },
  { title: "Products", href: "/products" },
  { title: "F.A.Q", href: "/faqs" },
  { title: "Contact us", href: "/contact-us" },
];
export default function Navbar() {
  //   const pathname = usePathname();
  const { user } = useApp();
  const [hasScrolled, setHasScrolled] = useState(false);

  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      // Check if page has been scrolled down
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex items-center justify-between h-16 px-5 fixed top-0 bg-white w-full z-50 
        ${
          isDashboardPage ? "border-b border-neutral-200" : ""
        } transition-shadow duration-300 
        ${hasScrolled ? "shadow-md" : ""} bg-white`}
    >
      <Link href="/">
        <BrandLogo />
      </Link>
      {!user && (
        <>
          <nav className="hidden lg:block flex-1">
            <ul className="flex items-center gap-8 mx-16">
              {siteRoutes.map((route, index) => (
                <li key={route.title}>
                  <Link
                    href={route.href}
                    className="whitespace-nowrap"
                    // ${pathname === route.href ? "font-bold text-black" : ""
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex ml-auto lg:ml-0">
            <Button text="Sign in" variant={ButtonVariant.link} />
            <Button
              isRoundedLarge
              text="Sign up"
              variant={ButtonVariant.fill}
            />
          </div>
          <IoMenu className="text-3xl cursor-pointer lg:hidden ml-5" />
        </>
      )}
      {user && (
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
      )}
    </div>
  );
}
export function BrandLogo() {
  return (
    <div className="text-lg font-semibold">
      <span className="text-brandPry">SEAMLESS</span>
      <span className="text-brandSec">POINT</span>
    </div>
  );
}
