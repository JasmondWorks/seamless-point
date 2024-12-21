import DeliverySourceForm from "@/app/_components/DeliverySourceForm";

export default function DeliverySource() {
  return (
    <div className="max-w-5xl md:pr-20 md:pl-10 xl:pl-20 xl:pr-40">
      <h1 className="headline text-center mb-10">Sender’s information</h1>
      <DeliverySourceForm />
    </div>
  );
}
