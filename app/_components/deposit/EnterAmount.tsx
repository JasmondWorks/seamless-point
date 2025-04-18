import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { Input } from "@/app/_components/ui/input";
import toast from "react-hot-toast";

function EnterAmount({
  incrementStep,
  amount,
  setAmount,
}: {
  incrementStep: () => void;
  amount: string;
  setAmount: (value: string) => void;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!amount) return toast.error("Please enter an amount");
    if (isNaN(Number(amount))) return toast.error("Amount must be a number");

    incrementStep();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
      <h1 className="headline text-center">
        How much are you adding to your Account?
      </h1>
      <div className="flex flex-col gap-3">
        <span>Amount</span>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-11 bg-white"
          type="text"
          placeholder="100NGN"
        />
      </div>
      <PrivacyPolicyBlock />
      <ButtonFormSubmit onClick={handleSubmit} text="I UNDERSTAND" />
    </form>
  );
}

export default EnterAmount;
