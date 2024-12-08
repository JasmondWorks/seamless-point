import PaystackPop from '@paystack/inline-js';
import { PaystackProps } from '@paystack/inline-js';

export default function usePaystackPayment() {
  const initializePayment = (config: PaystackProps) => {
    const paystack = new PaystackPop();
    paystack.newTransaction(config);
  };

  return { initializePayment };
}