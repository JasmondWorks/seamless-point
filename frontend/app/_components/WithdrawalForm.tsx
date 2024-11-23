import BalanceDisplay from "@/app/_components/BalanceDisplay";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import SelectDebitCard from "@/app/_components/SelectDebitCard";
import { Input } from "@/app/_components/ui/input";

export default function WithdrawalForm() {
  return (
    <div className="flex flex-col gap-y-10">
      <BalanceDisplay />
      <div className="flex flex-col gap-3">
        <label htmlFor="withdrawAmount">
          Enter the amount that you wish to withdraw
        </label>
        <Input
          className="bg-white h-11"
          id="withdrawAmount"
          type="text"
          placeholder="20, 000"
        />
        <p className="text-sm text-muted">
          The amount will be withdrawn to the bank {"that's"} registered with
          this account
        </p>
      </div>
      <SelectDebitCard />
      <PrivacyPolicyBlock />
      <ButtonFormSubmit text="I UNDERSTAND" />
    </div>
  );
}
