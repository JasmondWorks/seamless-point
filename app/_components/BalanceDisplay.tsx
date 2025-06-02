import { formatCurrency } from "@/app/_lib/utils";
import { cn } from "@/app/_lib/utils";

export default function BalanceDisplay({ balance = 0 }) {
  return (
    <div
      style={{
        background:
          "white url('/assets/images/naira-illustration.png') no-repeat right center/contain",
      }}
      className={cn("text-neutral-700 relative p-5 card space-y-5")}
    >
      <h3 className="font-bold leading-none">BALANCE</h3>
      <p className="text-4xl font-bold leading-none whitespace-normal">
        {formatCurrency(balance)}
      </p>
    </div>
  );
}
