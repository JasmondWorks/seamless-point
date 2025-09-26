"use client";

import Link from "next/link";
import { ArrowRight, Wifi } from "lucide-react";
import { FaTruck } from "react-icons/fa";
import { ComponentType, ReactNode, useState } from "react";
import { IoIosPhonePortrait } from "react-icons/io";
import { BsCash } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import { cn } from "@/app/_lib/utils";
import BuyAirtimeModal from "@/app/_components/BuyAirtimeModal";
import BuyDataModal from "@/app/_components/BuyDataModal";
import PayBillsModal from "@/app/_components/PayBillsModal";

type ModalComponent = ComponentType<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const services: {
  title: string;
  desc: string;
  path?: string | ModalComponent;
  icon: ReactNode;
}[] = [
  {
    title: "Shipping",
    desc: "Start a new shipment process for your packages.",
    path: "/user/deliveries/register",
    icon: <FaTruck size={28} strokeWidth={2} />,
  },
  {
    title: "Buy Airtime",
    desc: "Top-up your mobile phone with airtime credits.",
    path: BuyAirtimeModal,
    icon: <IoIosPhonePortrait size={28} strokeWidth={2} />,
  },
  {
    title: "Buy Data",
    desc: "Purchase dat bundles for your internet needs.",
    path: BuyDataModal,
    icon: <Wifi size={28} strokeWidth={2} />,
  },
  {
    title: "Pay Bills",
    desc: "Pay for your utility bills and other services seamlessly",
    path: PayBillsModal,
    icon: <BsCash size={28} strokeWidth={2} />,
  },
  {
    title: "Service Hub",
    desc: "Ad funds to your wallet to pay for services",
    path: "#",
    icon: <GrServices size={28} strokeWidth={2} />,
  },
];

export default function DashboardServices() {
  const [activeModal, setActiveModal] = useState<ModalComponent | null>(null);
  const ActiveModal = activeModal;

  function handleOpenModal(modal: ModalComponent) {
    setActiveModal(() => modal);
  }

  const handleModalStateChange = (open: boolean) => {
    if (!open) {
      setActiveModal(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 divide ">
        {services.map((service) => {
          const isDisabled = service.path === "#" || !service.path;
          const isModal = typeof service.path === "function";
          const cardClasses = cn(
            "p-6 border space-y-3 group transition-all duration-500 rounded-lg hover:shadow-lg hover:border-brandSec relative",
            isDisabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"
          );

          const cardContent = (
            <>
              <div className="flex">
                <div className="rounded-full p-3 bg-brandSecLight text-brandSec">
                  {service.icon}
                </div>
              </div>
              <div className="font-bold text-neutral-700">{service.title}</div>
              <p className="text-muted font-medium text-sm">{service.desc}</p>
              {/* <Button
                variant={ButtonVariant.link}
                className="!p-0 font-bold flex gap-1 items-center group-hover:gap-3 transition-all duration-500 text-brandSec text-sm"
              >
                <span>Get started</span>
                <ArrowRight size={20} strokeWidth={2} />
              </Button> */}
              <div className="rounded-full p-1.5 absolute !mt-0 right-3 top-3 border border-[#f2844c]/35 transition-all duration-300 text-brandSec group-hover:bg-brandSec group-hover:text-white group-hover:border-brandSec">
                <ArrowRight size={20} strokeWidth={2} />
              </div>
            </>
          );

          if (typeof service.path === "string" && !isDisabled) {
            return (
              <Link
                className={cardClasses}
                href={service.path as string}
                key={service.title}
              >
                {cardContent}
              </Link>
            );
          }

          if (isModal && service.path) {
            const Modal = service.path as ModalComponent;
            return (
              <button
                type="button"
                className={cardClasses + " text-left"}
                onClick={() => handleOpenModal(Modal)}
                key={service.title}
              >
                {cardContent}
              </button>
            );
          }

          return (
            <div className={cardClasses} key={service.title} aria-disabled>
              {cardContent}
            </div>
          );
        })}
      </div>

      {ActiveModal && (
        <ActiveModal open onOpenChange={handleModalStateChange} />
      )}
    </>
  );
}
