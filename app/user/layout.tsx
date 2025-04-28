import Image from "next/image";
import DashboardNavbar from "@/app/_components/DashboardNavbar";
import ProtectedRoutes from "../_components/UserProtectedRoutes";
import Navbar from "../_components/Navbar";
import { ScrollArea } from "../_components/ui/scroll-area";
import GlobalLoader from "@/app/_components/GlobalLoader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <GlobalLoader />
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="bg-neutral-50 flex-1 relative flex overflow-hidden">
          <DashboardNavbar />
          <main className="flex-1 ml-14 lg:ml-[0] overflow-auto">
            <div className="relative z-10 space-y-10 min-h-full p-3 sm:p-5 md:p-6 lg:p-8 !py-10">
              {children}
            </div>
            <Image
              style={{
                height: "82vh",
                bottom: "50%",
              }}
              className="hidden translate-y-[56%] md:block w-auto object-contain right-8 fixed"
              src="/assets/images/seamlesspoint-watermark.png"
              alt="seamless point"
              width={500}
              height={500}
            />
          </main>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
