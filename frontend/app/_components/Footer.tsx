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
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 py-12">
      <div className="container-custom">
        <hr className="pb-12" />
        <div className="flex md:flex-row flex-col gap-20 gap-x-28 lg:gap-52 justify-between">
          <div className="space-y-10">
            <Image
              className="h-5 object-contain w-fit"
              src="/assets/images/logo_text.png"
              width={500}
              height={500}
              alt="logo"
            />
            <p className="max-w-2xl">
              SeamlessPoint is your all-in-one tech solution platform, designed
              to make life easier. Whether you're managing shipments, verifying
              identities, or accessing essential services, we've got everything
              sorted at your fingertips.
            </p>
            <div className="flex gap-8 items-center">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
          <div className="flex md:justify-end pr-20 gap-28 flex-1 whitespace-nowrap">
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
