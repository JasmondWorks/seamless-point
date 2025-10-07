export function calculatePaystackFee(
  amount: number,
  isInternational: boolean,
  payerCoversFee: boolean = true
): number {
  let fee = 0;

  if (isInternational) {
    // **International Fee (3.9% + ₦100)**
    if (payerCoversFee) {
      fee = 0.039 * amount + 100;
    } else {
      fee = (amount - 100) / 1.039 - amount;
    }
  } else {
    // **Local Fee (1.5% + ₦100)**
    if (amount <= 2500) {
      if (payerCoversFee) {
        fee = 0.015 * amount;
      } else {
        fee = amount / 1.015 - amount;
      }
    } else {
      if (payerCoversFee) {
        fee = 0.015 * amount + 100;
        fee = Math.min(fee, 2000); // Cap at ₦2000
      } else {
        fee = (amount - 100) / 1.015 - amount;
      }
    }
  }

  return parseFloat(fee.toFixed(2)); // Round to 2 decimal places
}
