import Username from "@/app/_components/Username";
import DashboardLayout from "@/app/_components/DashboardLayout";
import { getUser } from "@/app/_lib/actions";
import BalanceContainer from "@/app/_components/BalanceContainer";
import { Suspense } from "react";
import DashboardServices from "@/app/_components/DashboardServices";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for Seamless Point",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Dashboard() {
  const res = await getUser();

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
        <Suspense fallback={<DataFetchSpinner />}>
          <BalanceContainer />
        </Suspense>
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
