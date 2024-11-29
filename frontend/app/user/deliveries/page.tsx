import { DeliveriesTable } from "@/app/_components/DeliveriesTable";
import { FormProvider } from "@/app/_contexts/FormContext";

export default function Deliveries() {
  return (
    <>
      <h1 className="headline">Deliveries</h1>
      <div className="bg-white p-5 rounded-xl">
        <DeliveriesTable />
      </div>
    </>
  );
}
