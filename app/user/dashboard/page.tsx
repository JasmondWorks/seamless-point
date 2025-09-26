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
import Button, { ButtonVariant } from "@/app/_components/Button";
import DashboardServices from "@/app/_components/DashboardServices";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for Seamless Point",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Dashboard() {
  const res = await getUser();
  const balance =
    res?.status === "success" && res.user ? res.user.balance ?? 0 : 0;

  return (
    <DashboardLayout isRightContained={true}>
      <h1 className="text-sm font-medium">
        <strong>
          Hey <Username /> -{" "}
        </strong>{" "}
        Let's get you started for today
      </h1>
      <div className="py-4">
        <BalanceContainer balance={balance} />
      </div>

      <section>
        <h3 className="tracking-wider text-xs text-muted font-bold mb-5 border-b pb-1">
          SERVICES
        </h3>

        <DashboardServices />
      </section>
    </DashboardLayout>
  );
}

