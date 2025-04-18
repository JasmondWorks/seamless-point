import Image from "next/image";
import DashboardNavbar from "@/app/_components/DashboardNavbar";
import ProtectedRoutes from "../_components/UserProtectedRoutes";
import Navbar from "../_components/Navbar";
import { ScrollArea } from "../_components/ui/scroll-area";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="bg-neutral-50 h-full overflow-auto relative flex">
          <DashboardNavbar />
          <ScrollArea
            // style={{ height: "calc(100% - 80px)" }}
            className="md:mt-0 ml-14 lg:ml-0 flex-1"
          >
            {/* <div className="ml-12 mt-20 md:mt-0 lg:ml-0 w-0 flex-1 pb-10"> */}
            <main className="p-3 sm:p-5 md:p-6 lg:p-8 overflow-auto py-10 box-content">
              <div className="relative z-10 space-y-10">{children}</div>
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
          </ScrollArea>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
