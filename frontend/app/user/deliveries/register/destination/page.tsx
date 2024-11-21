import DeliveryReceiverForm from "@/app/_components/DeliveryReceiverForm";

export default function SignUp() {
  return (
    <div className="max-w-5xl md:pr-20 md:pl-10 xl:pl-20 xl:pr-40">
      <h1 className="headline text-center mb-10">Receiver’s information</h1>
      <DeliveryReceiverForm />
    </div>
  );
}
