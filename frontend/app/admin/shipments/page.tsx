import { ShipmentsTable } from "@/app/_components/ShipmentsTable";

export default function Shipments({
  searchParams,
}: {
  searchParams: { page: string; limit: string; sort: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");
  const sort = searchParams.sort || "-createdAt";

  return (
    <>
      <h1 className="headline">Shipments</h1>

      <ShipmentsTable page={page} limit={limit} sort={sort} />
    </>
  );
}
