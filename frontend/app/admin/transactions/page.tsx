import { TransactionsTable } from "@/app/_components/TransactionsTable";

export default function Transactions() {
  return (
    <>
      <h1 className="headline">Transactions</h1>
      <div className="bg-white p-5 rounded-xl">
        <TransactionsTable />
      </div>
    </>
  );
}
