/**
 * Compute Paystack fee with integer kobo math to match webhook.
 * amount:
 *  - If payerCoversFee = true  => desired NET to merchant (₦)
 *  - If payerCoversFee = false => GROSS charged to customer (₦)
 * Returns fee, gross charge, and net to merchant (₦, 2dp).
 */
export function computePaystackCharge(
  amount: number,
  {
    isInternational,
    payerCoversFee = true,
  }: { isInternational: boolean; payerCoversFee?: boolean }
): { fee: number; grossCharge: number; netToMerchant: number } {
  const R_LOCAL = 0.015;
  const R_INTL = 0.039;
  const FLAT_NGN = 100;
  const WAIVER_THRESHOLD_NGN = 2500; // ₦100 flat is waived BELOW this for local
  const LOCAL_CAP_NGN = 2000;

  const toKobo = (n: number) => Math.round(n * 100);
  const toNaira = (k: number) => Number((k / 100).toFixed(2));

  if (amount <= 0) {
    return {
      fee: 0,
      grossCharge: Math.max(0, amount),
      netToMerchant: Math.max(0, amount),
    };
  }

  // ---------------- International: 3.9% + ₦100 (no cap/waiver) ----------------
  if (isInternational) {
    const r = R_INTL;

    if (payerCoversFee) {
      // net = gross*(1 - r) - 100  => gross = ceil((net + 100)/ (1 - r))
      const netK = toKobo(amount);
      const grossK = Math.ceil((netK + toKobo(FLAT_NGN)) / (1 - r));
      const feeK = grossK - netK; // exact fee in kobo
      return {
        fee: toNaira(feeK),
        grossCharge: toNaira(grossK),
        netToMerchant: toNaira(grossK - feeK),
      };
    } else {
      // Merchant absorbs: fee = round(gross*r) + 100
      const grossK = toKobo(amount);
      const feeK = Math.round(grossK * r) + toKobo(FLAT_NGN);
      const netK = grossK - feeK;
      return {
        fee: toNaira(feeK),
        grossCharge: toNaira(grossK),
        netToMerchant: toNaira(netK),
      };
    }
  }

  // ---------------- Local: 1.5% + ₦100 (waived < ₦2,500), cap ₦2,000 ----------------
  const r = R_LOCAL;

  if (payerCoversFee) {
    const netK = toKobo(amount);

    // Try waiver path first (no ₦100) and ensure gross remains BELOW threshold.
    // gross = ceil(net / (1 - r))
    const grossNoFlatK = Math.ceil(netK / (1 - r));
    if (grossNoFlatK < toKobo(WAIVER_THRESHOLD_NGN)) {
      const feeK = grossNoFlatK - netK; // exact
      return {
        fee: toNaira(feeK),
        grossCharge: toNaira(grossNoFlatK),
        netToMerchant: toNaira(netK),
      };
    }

    // Otherwise, ₦100 flat applies:
    // gross = ceil((net + 100) / (1 - r))
    const grossWithFlatK = Math.ceil((netK + toKobo(FLAT_NGN)) / (1 - r));
    let feeK = grossWithFlatK - netK; // exact fee before cap

    // Apply local cap (₦2,000)
    const capK = toKobo(LOCAL_CAP_NGN);
    if (feeK <= capK) {
      return {
        fee: toNaira(feeK),
        grossCharge: toNaira(grossWithFlatK),
        netToMerchant: toNaira(netK),
      };
    }

    // If capped, choose gross so net == desired and fee == cap
    const grossCappedK = netK + capK;
    return {
      fee: toNaira(capK),
      grossCharge: toNaira(grossCappedK),
      netToMerchant: toNaira(netK),
    };
  } else {
    // Merchant absorbs: given gross, compute fee and cap
    const grossK = toKobo(amount);
    const flatK = grossK < toKobo(WAIVER_THRESHOLD_NGN) ? 0 : toKobo(FLAT_NGN);
    let feeK = Math.round(grossK * r) + flatK;

    // Apply cap
    const capK = toKobo(LOCAL_CAP_NGN);
    if (feeK > capK) feeK = capK;

    const netK = grossK - feeK;
    return {
      fee: toNaira(feeK),
      grossCharge: toNaira(grossK),
      netToMerchant: toNaira(netK),
    };
  }
}

/**
 * Backwards-compatible helper that returns only the fee (₦, 2dp).
 * Convention:
 *  - payerCoversFee=true  => amount is desired NET to merchant.
 *  - payerCoversFee=false => amount is GROSS charge to customer.
 */
export function calculatePaystackFee(
  amount: number,
  isInternational: boolean,
  payerCoversFee: boolean = true
): number {
  return computePaystackCharge(amount, { isInternational, payerCoversFee }).fee;
}
