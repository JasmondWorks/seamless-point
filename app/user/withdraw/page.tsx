import AddWithdrawalAccount from "@/app/_components/AddWithdrawalAccount";
import WithdrawalForm from "@/app/_components/WithdrawalForm";
import { getUser } from "@/app/_lib/actions";
import { redirect } from "next/navigation";

export default async function Withdraw({ params, searchParams }: any) {
  const res = await getUser();
  const bankDetails = res?.user?.bankDetails ?? {};
  const showAddAccount = (searchParams["add-account"] = "true");

  if (Object.keys(bankDetails).length === 0) {
    redirect("?add-account=true");
  }

  if (showAddAccount) return <AddWithdrawalAccount bankDetails={bankDetails} />;

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">Withdrawal of Funds</h1>
        <WithdrawalForm />
      </div>
    </div>
  );
}
