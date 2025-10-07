import Card from "@/app/_components/Card";
import { Edit } from "lucide-react";

const WithdrawalAccountDetails = ({ onShowAddAccount, bankDetails }: any) => {
  console.log(bankDetails);
  return (
    <Card className="font-medium text-sm">
      <h3 className="pb-1 mb-3 border-b font-semibold">Bank details</h3>
      <div className="flex gap-2 items-end justify-between">
        <div className="space-y-1">
          <p>{bankDetails?.accountName}</p>
          <p className="text-xl font-bold">{bankDetails?.accountNumber}</p>
          <p>{bankDetails?.bankName}</p>
        </div>
        <button onClick={onShowAddAccount}>
          <Edit size={16} />
        </button>
      </div>
    </Card>
  );
};

export default WithdrawalAccountDetails;
