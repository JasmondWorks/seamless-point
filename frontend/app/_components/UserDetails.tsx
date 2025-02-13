import ChangePasswordForm from "@/app/_components/ChangePasswordForm";
import ProfileImageUploader from "@/app/_components/ProfileImageUploader";
import UpdateUserDetailsForm from "@/app/_components/UpdateUserDetailsForm";
import { getUser } from "@/app/_lib/actions";

export default async function UserDetails() {
  const res = await getUser();

  console.log(res.user);

  return (
    <>
      <ProfileImageUploader user={res.user} />
      <UpdateUserDetailsForm user={res.user} />
      {!["google", "apple"].includes(res.user.authType) && (
        <>
          <h2 className="border-b border-neutral-300 py-3 text-2xl font-bold">
            Change password
          </h2>
          <ChangePasswordForm />
        </>
      )}
    </>
  );
}
