"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { IoClose, IoWalletOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const navLinks = [
  {
    path: "/user/dashboard",
    icon: (
      <svg
        // className={styles.icon}
        className="w-full h-full"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 10L3 8M3 8L10 1L17 8M3 8V18C3 18.5523 3.44772 19 4 19H7M17 8L19 10M17 8V18C17 18.5523 16.5523 19 16 19H13M7 19C7.55228 19 8 18.5523 8 18V14C8 13.4477 8.44772 13 9 13H11C11.5523 13 12 13.4477 12 14V18C12 18.5523 12.4477 19 13 19M7 svg13"
          // stroke="#40100A"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Dashboard",
  },
  {
    path: "/user/deliveries",
    icon: (
      <svg
        // className={styles.icon}
        className="w-full h-full"
        width={22}
        height={18}
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 12.76V3.25C15 2.71957 14.7893 2.21086 14.4142 1.83579C14.0391 1.46071 13.5304 1.25 13 1.25H3C2.46957 1.25 1.96086 1.46071 1.58579 1.83579C1.21071 2.21086 1 2.71957 1 3.25V12.25C1 12.5152 1.10536 12.7696 1.29289 12.9571C1.48043 13.1446 1.73478 13.25 2 13.25H2.71C2.90493 12.8049 3.22534 12.4263 3.63204 12.1604C4.03874 11.8945 4.5141 11.7529 5 11.7529C5.4859 11.7529 5.96126 11.8945 6.36796 12.1604C6.77466 12.4263 7.09507 12.8049 7.29 13.25H14.71C14.7833 13.0733 14.88 12.91 15 12.76ZM15 12.76C15.2599 12.4075 15.6081 12.1298 16.0096 11.9548C16.4111 11.7799 16.8517 11.714 17.2868 11.7637C17.7219 11.8134 18.1362 11.9769 18.4879 12.2379C18.8396 12.4989 19.1163 12.848 19.29 13.25H21V10.36C21.0004 9.63434 20.8033 8.92225 20.43 8.3L19.2 6.25L18.29 4.74C18.2015 4.59072 18.0757 4.46705 17.9249 4.38114C17.7741 4.29522 17.6035 4.25003 17.43 4.25H15V12.76Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 8.25H5M10 5.25H5M7.5 14.25C7.50044 14.6219 7.41789 14.9892 7.25839 15.3252C7.09888 15.6611 6.86642 15.9573 6.57796 16.192C6.2895 16.4268 5.9523 16.5942 5.59094 16.6821C5.22957 16.77 4.85315 16.7762 4.48909 16.7002C4.12504 16.6242 3.78253 16.4679 3.48652 16.2428C3.19051 16.0176 2.94846 15.7293 2.77802 15.3987C2.60757 15.0682 2.51302 14.7038 2.50125 14.332C2.48948 13.9603 2.5608 13.5907 2.71 13.25C2.9402 12.7244 3.34422 12.2939 3.85423 12.031C4.36424 11.768 4.94919 11.6884 5.51091 11.8057C6.07262 11.923 6.57689 12.2299 6.93908 12.675C7.30127 13.1201 7.49932 13.6762 7.5 14.25ZM19.5 14.25C19.5004 14.6219 19.4179 14.9892 19.2584 15.3252C19.0989 15.6611 18.8664 15.9573 18.578 16.192C18.2895 16.4268 17.9523 16.5942 17.5909 16.6821C17.2296 16.77 16.8531 16.7762 16.4891 16.7002C16.125 16.6242 15.7825 16.4679 15.4865 16.2428C15.1905 16.0176 14.9485 15.7293 14.778 15.3987C14.6076 15.0682 14.513 14.7038 14.5013 14.332C14.4895 13.9603 14.5608 13.5907 14.71 13.25C14.7833 13.0733 14.88 12.91 15 12.76C15.2599 12.4075 15.6081 12.1298 16.0096 11.9548C16.4111 11.7799 16.8517 11.714 17.2868 11.7637C17.7219 11.8134 18.1362 11.9769 18.4879 12.2379C18.8396 12.4989 19.1163 12.848 19.29 13.25C19.43 13.565 19.502 13.906 19.5 14.25Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Deliveries",
  },
  {
    path: "/user/payments",
    icon: (
      <svg
        // className={styles.icon}
        className="w-full h-full"
        width={22}
        height={20}
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 9.5V4.114C21 3.323 21 2.928 20.806 2.52C20.6645 2.24956 20.4728 2.00859 20.241 1.81C19.887 1.53 19.591 1.463 19 1.327C18.08 1.117 17.066 1 16 1C14.083 1 12.332 1.378 11 2C9.668 2.622 7.917 3 6 3C4.934 3 3.92 2.883 3 2.673C2.04 2.453 1 3.129 1 4.114V14.886C1 15.677 1 16.073 1.194 16.48C1.304 16.713 1.557 17.03 1.759 17.19C2.113 17.47 2.409 17.537 3 17.673C3.92 17.883 4.934 18 6 18C7.469 18 8.84 17.778 10 17.395M13 17C13 17 14 17 15 19C15 19 18.177 14 21 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 10.5V10.509M17.5 8.492V8.502M13.5 9.5C13.5 10.163 13.2366 10.7989 12.7678 11.2678C12.2989 11.7366 11.663 12 11 12C10.337 12 9.70107 11.7366 9.23223 11.2678C8.76339 10.7989 8.5 10.163 8.5 9.5C8.5 8.83696 8.76339 8.20107 9.23223 7.73223C9.70107 7.26339 10.337 7 11 7C11.663 7 12.2989 7.26339 12.7678 7.73223C13.2366 8.20107 13.5 8.83696 13.5 9.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Payments",
  },
];
const adminNavLinks = [
  {
    path: "/admin/dashboard",
    icon: (
      <svg
        className="w-full h-full"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 10L3 8M3 8L10 1L17 8M3 8V18C3 18.5523 3.44772 19 4 19H7M17 8L19 10M17 8V18C17 18.5523 16.5523 19 16 19H13M7 19C7.55228 19 8 18.5523 8 18V14C8 13.4477 8.44772 13 9 13H11C11.5523 13 12 13.4477 12 14V18C12 18.5523 12.4477 19 13 19M7 19H13"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Dashboard",
  },
  {
    path: "/admin/shipments",
    icon: (
      <svg
        className="w-full h-full"
        width={22}
        height={18}
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 12.76V3.25C15 2.71957 14.7893 2.21086 14.4142 1.83579C14.0391 1.46071 13.5304 1.25 13 1.25H3C2.46957 1.25 1.96086 1.46071 1.58579 1.83579C1.21071 2.21086 1 2.71957 1 3.25V12.25C1 12.5152 1.10536 12.7696 1.29289 12.9571C1.48043 13.1446 1.73478 13.25 2 13.25H2.71C2.90493 12.8049 3.22534 12.4263 3.63204 12.1604C4.03874 11.8945 4.5141 11.7529 5 11.7529C5.4859 11.7529 5.96126 11.8945 6.36796 12.1604C6.77466 12.4263 7.09507 12.8049 7.29 13.25H14.71C14.7833 13.0733 14.88 12.91 15 12.76ZM15 12.76C15.2599 12.4075 15.6081 12.1298 16.0096 11.9548C16.4111 11.7799 16.8517 11.714 17.2868 11.7637C17.7219 11.8134 18.1362 11.9769 18.4879 12.2379C18.8396 12.4989 19.1163 12.848 19.29 13.25H21V10.36C21.0004 9.63434 20.8033 8.92225 20.43 8.3L19.2 6.25L18.29 4.74C18.2015 4.59072 18.0757 4.46705 17.9249 4.38114C17.7741 4.29522 17.6035 4.25003 17.43 4.25H15V12.76Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 8.25H5M10 5.25H5M7.5 14.25C7.50044 14.6219 7.41789 14.9892 7.25839 15.3252C7.09888 15.6611 6.86642 15.9573 6.57796 16.192C6.2895 16.4268 5.9523 16.5942 5.59094 16.6821C5.22957 16.77 4.85315 16.7762 4.48909 16.7002C4.12504 16.6242 3.78253 16.4679 3.48652 16.2428C3.19051 16.0176 2.94846 15.7293 2.77802 15.3987C2.60757 15.0682 2.51302 14.7038 2.50125 14.332C2.48948 13.9603 2.5608 13.5907 2.71 13.25C2.9402 12.7244 3.34422 12.2939 3.85423 12.031C4.36424 11.768 4.94919 11.6884 5.51091 11.8057C6.07262 11.923 6.57689 12.2299 6.93908 12.675C7.30127 13.1201 7.49932 13.6762 7.5 14.25ZM19.5 14.25C19.5004 14.6219 19.4179 14.9892 19.2584 15.3252C19.0989 15.6611 18.8664 15.9573 18.578 16.192C18.2895 16.4268 17.9523 16.5942 17.5909 16.6821C17.2296 16.77 16.8531 16.7762 16.4891 16.7002C16.125 16.6242 15.7825 16.4679 15.4865 16.2428C15.1905 16.0176 14.9485 15.7293 14.778 15.3987C14.6076 15.0682 14.513 14.7038 14.5013 14.332C14.4895 13.9603 14.5608 13.5907 14.71 13.25C14.7833 13.0733 14.88 12.91 15 12.76C15.2599 12.4075 15.6081 12.1298 16.0096 11.9548C16.4111 11.7799 16.8517 11.714 17.2868 11.7637C17.7219 11.8134 18.1362 11.9769 18.4879 12.2379C18.8396 12.4989 19.1163 12.848 19.29 13.25C19.43 13.565 19.502 13.906 19.5 14.25Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Shipments",
  },
  {
    path: "/admin/transactions",
    icon: (
      <svg
        className="h-full w-full"
        width={22}
        height={20}
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 9.5V4.114C21 3.323 21 2.928 20.806 2.52C20.6645 2.24956 20.4728 2.00859 20.241 1.81C19.887 1.53 19.591 1.463 19 1.327C18.08 1.117 17.066 1 16 1C14.083 1 12.332 1.378 11 2C9.668 2.622 7.917 3 6 3C4.934 3 3.92 2.883 3 2.673C2.04 2.453 1 3.129 1 4.114V14.886C1 15.677 1 16.073 1.194 16.48C1.304 16.713 1.557 17.03 1.759 17.19C2.113 17.47 2.409 17.537 3 17.673C3.92 17.883 4.934 18 6 18C7.469 18 8.84 17.778 10 17.395M13 17C13 17 14 17 15 19C15 19 18.177 14 21 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 10.5V10.509M17.5 8.492V8.502M13.5 9.5C13.5 10.163 13.2366 10.7989 12.7678 11.2678C12.2989 11.7366 11.663 12 11 12C10.337 12 9.70107 11.7366 9.23223 11.2678C8.76339 10.7989 8.5 10.163 8.5 9.5C8.5 8.83696 8.76339 8.20107 9.23223 7.73223C9.70107 7.26339 10.337 7 11 7C11.663 7 12.2989 7.26339 12.7678 7.73223C13.2366 8.20107 13.5 8.83696 13.5 9.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Transactions",
  },
  {
    path: "/admin/customers",
    icon: <FaRegUserCircle strokeWidth={0} className="w-full h-full" />,
    title: "Customers",
  },
  {
    path: "/admin/wallets",
    icon: <IoWalletOutline className="w-full h-full" />,
    title: "Customer Wallets",
  },
  {
    path: "/admin/riders",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 7C19 5.9 18.1 5 17 5H14V7H17V9.65L13.52 14H10V9H6C3.79 9 2 10.79 2 13V16H4C4 17.66 5.34 19 7 19C8.66 19 10 17.66 10 16H14.48L19 10.35V7ZM4 14V13C4 11.9 4.9 11 6 11H8V14H4ZM7 17C6.45 17 6 16.55 6 16H8C8 16.55 7.55 17 7 17Z"
          fill="currentColor"
        />
        <path
          d="M7 6H12V8H7V6ZM21 13C19.34 13 18 14.34 18 16C18 17.66 19.34 19 21 19C22.66 19 24 17.66 24 16C24 14.34 22.66 13 21 13ZM21 17C20.45 17 20 16.55 20 16C20 15.45 20.45 15 21 15C21.55 15 22 15.45 22 16C22 16.55 21.55 17 21 17Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Riders",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const { role } = JSON.parse(localStorage.getItem("user"));

  // console.log(overlayRef.current);

  function handleToggleNav() {
    setIsNavShowing((cur) => !cur);
  }

  useEffect(() => {
    setIsNavShowing(false);
  }, [pathname]);
  // const pageCategory = pathname.split("/")[2];
  // console.log(pathname.split("/"), pathname);

  useEffect(() => {
    if (isNavShowing) {
      setIsOverlayVisible(true); // Make it block immediately when showing
    } else {
      // Wait for the opacity transition to finish before hiding
      const timeout = setTimeout(() => setIsOverlayVisible(false), 300); // Match the CSS transition duration
      return () => clearTimeout(timeout); // Cleanup timeout if `isNavShowing` changes quickly
    }
  }, [isNavShowing]);

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
        className={`${
          isNavShowing ? "w-72" : "w-16"
        } w-16 lg:min-w-72 top-0 h-full pt-24 fixed bg-[#fafafa] z-20 lg:relative  lg:pt-32 items-center md:items-start py-6 border-r border-neutral-200 lg:py-10 pb-0 flex flex-col justify-between overflow-hidden overflow-y-scroll transition-all`}
      >
        {/* Rectangle shapes */}
        <div className="hidden lg:block absolute top-0 left-0 -z-10">
          <svg
            width="156"
            height="169"
            viewBox="0 0 156 169"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-221.448"
              y="-116.955"
              width="300"
              height="300"
              transform="rotate(-17.667 -221.448 -116.955)"
              fill="#D9D9D9"
            />
            <rect
              x="-261"
              y="-133.955"
              width="300"
              height="300"
              transform="rotate(-17.667 -261 -133.955)"
              fill="#0DACED"
            />
          </svg>
        </div>
        {/* Triangle shapes */}
        <div className="hidden lg:block absolute bottom-0 right-0 -z-10">
          <svg
            width="111"
            height="213"
            viewBox="0 0 111 213"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5262 0.342651L231.678 141.445L0.403466 259.819L13.5262 0.342651Z"
              fill="#D9D9D9"
            />
            <path
              d="M35.5262 42.3427L253.678 183.445L22.4035 301.819L35.5262 42.3427Z"
              fill="#EE5E21"
            />
          </svg>
        </div>
        <button
          onClick={handleToggleNav}
          className={`text-3xl flex lg:hidden ${
            !isNavShowing
              ? "justify-center lg:justify-start mx-auto"
              : "ml-auto px-5 lg:justify-start"
          }`}
        >
          {!isNavShowing ? (
            <FiMenu className="pointer-events-none" />
          ) : (
            <IoClose className="pointer-events-none" />
          )}
        </button>
        <div className="w-full flex flex-col gap-16 items-center lg:items-start">
          <nav className="w-full">
            <ul>
              {role === "user" &&
                navLinks.map((link) => (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <li key={link.path}>
                          <Link
                            href={link.path}
                            className={`font-medium lg:items-center lg:px-10 py-2 flex gap-3 ${
                              !isNavShowing
                                ? "justify-center lg:justify-start"
                                : "lg:justify-start px-8"
                            } hover:bg-neutral-200 ${
                              pathname === link.path
                                ? "text-brandSec pointer-events-none"
                                : ""
                            }`}
                          >
                            <span className="w-7 h-7 lg:w-5 lg:h-5">
                              {link.icon}
                            </span>
                            <span
                              className={`${
                                isNavShowing ? "block" : "hidden lg:block"
                              }`}
                            >
                              {link.title}
                            </span>
                          </Link>
                        </li>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{link.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              {role === "admin" &&
                adminNavLinks.map((link) => (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <li key={link.path}>
                          <Link
                            href={link.path}
                            className={`font-medium lg:items-center lg:px-10 py-2 flex gap-3 ${
                              !isNavShowing
                                ? "justify-center lg:justify-start"
                                : "lg:justify-start px-8"
                            } hover:bg-neutral-200 ${
                              pathname === link.path
                                ? "text-brandSec pointer-events-none"
                                : ""
                            }`}
                          >
                            <span className="w-7 h-7 lg:w-5 lg:h-5">
                              {link.icon}
                            </span>
                            <span
                              className={`${
                                isNavShowing ? "block" : "hidden lg:block"
                              }`}
                            >
                              {link.title}
                            </span>
                          </Link>
                        </li>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{link.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
            </ul>
          </nav>
        </div>
        <div className="lg:mx-0 w-full flex flex-col items-center">
          <Link
            href={role === "user" ? "/user/settings" : "/admin/settings"}
            className={`w-full lg:items-center font-medium lg:px-10 py-2 flex gap-3 ${
              !isNavShowing
                ? "justify-center lg:justify-start"
                : "lg:justify-start px-8"
            } hover:bg-neutral-200 ${
              pathname === "/user/settings" || "/admin/settings"
            }
                ? "text-brandSec pointer-events-none"
                : ""
            }`}
          >
            <span className="w-7 h-7 lg:w-5 lg:h-5">
              <svg
                className="w-full h-full"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.74347 2.23798C7.06327 0.920672 8.93673 0.920673 9.25653 2.23798C9.46312 3.08895 10.4381 3.49278 11.1859 3.03714C12.3435 2.33179 13.6682 3.65653 12.9629 4.81414C12.5072 5.56194 12.9111 6.53688 13.762 6.74347C15.0793 7.06327 15.0793 8.93673 13.762 9.25653C12.9111 9.46312 12.5072 10.4381 12.9629 11.1859C13.6682 12.3435 12.3435 13.6682 11.1859 12.9629C10.4381 12.5072 9.46312 12.9111 9.25653 13.762C8.93673 15.0793 7.06327 15.0793 6.74347 13.762C6.53688 12.9111 5.56194 12.5072 4.81414 12.9629C3.65653 13.6682 2.33179 12.3435 3.03714 11.1859C3.49278 10.4381 3.08895 9.46312 2.23798 9.25653C0.920673 8.93673 0.920672 7.06327 2.23798 6.74347C3.08895 6.53688 3.49278 5.56194 3.03714 4.81414C2.33179 3.65653 3.65653 2.33179 4.81414 3.03714C5.56194 3.49278 6.53688 3.08895 6.74347 2.23798Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.25 8C10.25 9.24264 9.24264 10.25 8 10.25C6.75736 10.25 5.75 9.24264 5.75 8C5.75 6.75736 6.75736 5.75 8 5.75C9.24264 5.75 10.25 6.75736 10.25 8Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={`${isNavShowing ? "block" : "hidden lg:block"}`}>
              Settings
            </span>
          </Link>
          <SignOutButton isNavShowing={isNavShowing} />
        </div>
      </div>
    </>
  );
}
