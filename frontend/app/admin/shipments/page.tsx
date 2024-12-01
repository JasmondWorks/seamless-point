import { ShipmentsTable } from "@/app/_components/ShipmentsTable";

export default function Shipments() {
  return (
    <>
      <h1 className="headline">Shipments</h1>
      <div className="bg-white p-5 rounded-xl">
        <ShipmentsTable />
      </div>
    </>
  );
}
