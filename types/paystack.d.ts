declare module '@paystack/inline-js' {
  export interface PaystackProps {
    reference: string;
    email: string;
    amount: number;
    publicKey: string;
    onSuccess?: (reference: any) => void;
    onClose?: () => void;
  }

  export default class PaystackPop {
    newTransaction(options: PaystackProps): void;
  }
} 