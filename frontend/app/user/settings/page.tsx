import ChangePasswordForm from "@/app/_components/ChangePasswordForm";
import UserSettingsActions from "@/app/_components/UserSettingsActions";
import UserDetails from "@/app/_components/UserDetails";
import { Suspense } from "react";
import Loader from "@/app/loading";

export default function Settings() {
  return (
    <>
      <div className="flex justify-between items-center py-3 border-b border-neutral-300">
        <h1 className="headline">Settings</h1>
        {/* <UserSettingsActions /> */}
      </div>

      <Suspense fallback={<Loader />}>
        <UserDetails />
      </Suspense>
    </>
  );
}
