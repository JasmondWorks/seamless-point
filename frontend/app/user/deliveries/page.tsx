import { DeliveriesTable } from "@/app/_components/DeliveriesTable";
import { FormProvider } from "@/app/_contexts/FormContext";

export default function Deliveries({
  searchParams,
}: {
  searchParams: { page: string; limit: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");

  return (
    <>
      <h1 className="headline">Deliveries</h1>
      <div className="bg-white p-5 rounded-xl">
        <DeliveriesTable page={page} limit={limit} />
      </div>
    </>
  );
}
