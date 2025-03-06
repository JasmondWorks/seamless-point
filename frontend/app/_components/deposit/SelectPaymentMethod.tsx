import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import toast from "react-hot-toast";

function SelectPaymentMethod({
  incrementStep,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: {
  incrementStep: () => void;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (paymentMethod: string) => void;
}) {
  function handleSelectPaymentMethod(type: string) {
    setSelectedPaymentMethod(type);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("here");
    if (!selectedPaymentMethod)
      return toast.error("Please select a payment method");

    incrementStep();
  }

  console.log(selectedPaymentMethod);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-16">
      <div className="space-y-2">
        <h1 className="headline text-center">Select a Payment Method</h1>
        <p className="text-center text-muted">
          Please select one of the two payment methods listed below
        </p>
      </div>
      {/* <DepositAccountDetailsCard /> */}
      <div className="flex flex-col gap-6">
        <label className="pb-3 cursor-pointer border-b border-neutral-200 flex justify-between items-center">
          <span>Debit card</span>
          <input
            onChange={handleSelectPaymentMethod}
            value="debit-card"
            type="radio"
            checked={selectedPaymentMethod === "debit-card"}
            name="paymentType"
          />
        </label>
        <label className="pb-3 cursor-pointer border-b border-neutral-200 flex justify-between items-center">
          <span>Virtual bank transfer</span>
          <input
            onChange={handleSelectPaymentMethod}
            value="bank-transfer"
            type="radio"
            checked={selectedPaymentMethod === "bank-transfer"}
            name="paymentType"
          />
        </label>
      </div>
      <div className="space-y-6">
        <PrivacyPolicyBlock />
        <ButtonFormSubmit onClick={handleSubmit} text="Continue" />
      </div>
    </form>
  );
}

export default SelectPaymentMethod;
