import Image from "next/image";
import DashboardNavbar from "@/app/_components/DashboardNavbar";
import ProtectedRoutes from "../_components/UserProtectedRoutes";
import Navbar from "../_components/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <div
        style={{ display: "grid", gridTemplateRows: "auto 1fr" }}
        className="h-dvh w-screen"
      >
        <Navbar />
        <div className="bg-neutral-50 flex-1 overflow-hidden flex relative">
          <DashboardNavbar />
          <main className="flex-1 ml-12 lg:ml-[0] overflow-auto">
            <div className="overflow-auto relative z-10 space-y-10 min-h-full p-5 md:p-6">
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
