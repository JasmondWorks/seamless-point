import Navbar from "@/app/_components/Navbar";
import ResetPasswordForm from "@/app/_components/ResetPasswordForm";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;
  return (
    <div className="flex flex-col h-screen bg-brandPryLight">
      {/* <Navbar className="!bg-brandPryLight" /> */}
      <main className="h-full flex-1 grid place-items-center">
        <div>
          <h1 className="mb-5 headline text-center">Update Your Password</h1>
          <ResetPasswordForm resetToken={token} />
        </div>
      </main>
    </div>
  );
}
