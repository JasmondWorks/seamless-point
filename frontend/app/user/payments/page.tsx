import { DeliveriesTable } from "@/app/_components/DeliveriesTable";

export default function Payments() {
  return (
    <>
      <h1 className="headline">Deliveries</h1>
      <div className="bg-white p-5 rounded-xl">
        <DeliveriesTable />
      </div>
    </>
  );
}
