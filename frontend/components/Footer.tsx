"use client";

import React from "react";
import { BrandLogo } from "./Navbar";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard");

  if (isDashboardPage) return null;

  return (
    <footer className="bg-neutral-50 py-12">
      <div className="container-custom">
        <hr className="pb-12" />
        <div className="flex lg:flex-row flex-col gap-20 lg:gap-52 justify-between">
          <div className="space-y-10">
            <BrandLogo />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              praesentium eaque voluptatum omnis. Facilis culpa beatae quam,
              itaque soluta reprehenderit ipsam a odio?
            </p>
            <div className="flex gap-8 items-center">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
          <div className="flex gap-28 flex-1 whitespace-nowrap">
            <div>
              <h4 className="font-bold mb-8">Company</h4>
              <nav className="gap-y-4 flex flex-col">
                <Link href="#">About</Link>
                <Link href="#">F.A.Q</Link>
                <Link href="#">Products</Link>
                <Link href="#">Contact Us</Link>
              </nav>
            </div>
            <div>
              <h4 className="mb-8 font-bold">Help</h4>
              <nav className="gap-y-4 flex flex-col">
                <Link href="#">Customer Support</Link>
                <Link href="#">Delivery Details</Link>
                <Link href="#">Terms & Conditions</Link>
                <Link href="#">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
