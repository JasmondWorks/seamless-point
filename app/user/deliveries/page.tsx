import { DeliveriesTable } from "@/app/_components/DeliveriesTable";

export default function Deliveries({
  searchParams,
}: {
  searchParams: { page: string; limit: string; sort: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");
  const sort = searchParams.sort || "-createdAt";

  console.log(sort);

  return (
    <>
      <h1 className="headline">Deliveries</h1>

      <DeliveriesTable page={page} limit={limit} sort={sort} />
    </>
  );
}
