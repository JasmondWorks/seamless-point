import Image from "next/image";
import ChangePasswordForm from "@/app/_components/ChangePasswordForm";
import UpdateUserDetailsForm from "@/app/_components/UpdateUserDetailsForm";
import UserSettingsActions from "@/app/_components/UserSettingsActions";

export default function Settings() {
  return (
    <>
      <div className="flex justify-between items-center py-3 border-b border-neutral-300">
        <h1 className="headline">Settings</h1>
        <UserSettingsActions />
      </div>
      <Image
        src="/assets/images/profile-image.png"
        alt="profile image"
        width={200}
        height={200}
        className="w-36 aspect-square rounded-full"
      />
      <UpdateUserDetailsForm />
      <h2 className="border-b border-neutral-300 py-3 text-2xl font-bold">
        Change password
      </h2>
      <ChangePasswordForm />
    </>
  );
}
