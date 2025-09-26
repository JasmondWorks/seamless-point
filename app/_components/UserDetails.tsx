import ChangePasswordForm from "@/app/_components/ChangePasswordForm";
import ProfileImageUploader from "@/app/_components/ProfileImageUploader";
import UpdateUserDetailsForm from "@/app/_components/UpdateUserDetailsForm";
import { getAdmin, getUser } from "@/app/_lib/actions";

export default async function UserDetails({ userType = "user" }) {
  const response = userType === "user" ? await getUser() : await getAdmin();
  const user = response?.status === "success" ? response.user : null;

  if (!user) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Unable to load your profile details right now. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <ProfileImageUploader user={user} />
      <UpdateUserDetailsForm user={user} />
      {!["google", "apple"].includes(user.authType) && (
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

