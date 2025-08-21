import Link from "next/link";
import Username from "@/app/_components/Username";
import DashboardLayout from "@/app/_components/DashboardLayout";
import { getUser } from "@/app/_lib/actions";
import BalanceContainer from "@/app/_components/BalanceContainer";
import { ArrowRight, Wifi } from "lucide-react";
import { FaTruck } from "react-icons/fa";
import { ReactNode } from "react";
import { IoIosPhonePortrait } from "react-icons/io";
import { BsCash } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import { cn } from "@/app/_lib/utils";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for Seamless Point",
};

const services: {
  title: string;
  desc: string;
  path: string;
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
    path: "#",
    icon: <IoIosPhonePortrait size={28} strokeWidth={2} />,
  },
  {
    title: "Buy Data",
    desc: "Purchase dat bundles for your internet needs.",
    path: "#",
    icon: <Wifi size={28} strokeWidth={2} />,
  },
  {
    title: "Pay Bills",
    desc: "Pay for your utility bills and other services seamlessly",
    path: "#",
    icon: <BsCash size={28} strokeWidth={2} />,
  },
  {
    title: "Service Hub",
    desc: "Ad funds to your wallet to pay for services",
    path: "#",
    icon: <GrServices size={28} strokeWidth={2} />,
  },
];

export default async function Dashboard() {
  const res = await getUser();
  const balance = res?.user.balance ?? 0;

  return (
    <DashboardLayout isRightContained={true}>
      <h1 className="text-sm font-medium">
        <strong>
          Hey <Username /> -{" "}
        </strong>{" "}
        Let's get you started for today
      </h1>

      <div className="w-full sm:w-fit sm:min-w-[300px] md:min-w-[400px]">
        {/* <BalanceDisplay balance={balance} /> */}
        <BalanceContainer balance={balance} />
      </div>

      {/* /users/deliveries/register */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        {services.map((service) => (
          <Link
            className={cn(
              "p-6 bg-brandSecLight space-y-3 group transition-all duration-500 rounded-lg",
              {
                "pointer-events-none opacity-50 hover:ring-0 shadow-none text-muted":
                  service.path === "#",
              }
            )}
            href={service.path}
            key={service.title}
          >
            <div className="flex">
              <div className="rounded-full p-3 bg-white text-brandSec">
                {service.icon}
              </div>
            </div>
            <div className="text-lg font-bold">{service.title}</div>
            <p className="text-muted font-medium text-sm">{service.desc}</p>
            <div className="font-bold flex gap-1 items-center group-hover:gap-3 transition-all duration-500 text-brandSec text-sm">
              <span>Get started</span>
              <ArrowRight size={24} strokeWidth={2} />
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
