import { formatCurrency } from "@/app/_lib/utils";
import { cn } from "@/app/_lib/utils";

export default function BalanceDisplayClient({
  balance,
  className = "",
}: {
  balance?: number;
  className?: string;
}) {
  return (
    <div
      style={{
        background:
          "white url('/assets/images/naira-illustration.png') no-repeat right center/ contain",
      }}
      className={cn("text-neutral-700 relative p-5 card", className)}
    >
      <h3 className="text-lg font-bold leading-none">BALANCE</h3>
      <p className="text-5xl lg:text-6xl font-bold lg:font-medium leading-none py-[0.5em] whitespace-normal">
        {formatCurrency(balance)}
      </p>
    </div>
  );
}
