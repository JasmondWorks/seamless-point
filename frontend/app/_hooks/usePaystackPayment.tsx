import PaystackPop from '@paystack/inline-js';
import { PaystackProps } from '@paystack/inline-js';

export default function usePaystackPayment() {
  const initializePayment = (config: PaystackProps) => {
    const paystack = new PaystackPop();
    paystack.newTransaction(config);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Selected color:', event.target.value);
  };

  return (
    <>
      <input 
        type="color" 
        onChange={handleColorChange}
        style={{ display: 'none' }}
      />
    </>
  );
} 