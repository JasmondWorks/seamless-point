/**
 * Compute Paystack fee precisely (kobo-accurate), with gross-up when payer covers fees.
 * amount: in Naira (number). If payerCoversFee=true => desired NET to merchant.
 * isInternational: true for intl cards (3.9% + ₦100, no cap). false for local (1.5% + ₦100, waivers/caps apply).
 * payerCoversFee: if true, we gross-up so that NET==amount after fees.
 *
 * Returns fee, gross customer charge, and net to merchant (all in Naira, 2dp).
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
  const WAIVER_THRESHOLD_NGN = 2500; // ₦100 is waived below this (local only)
  const LOCAL_CAP_NGN = 2000;

  const toKobo = (n: number) => Math.round(n * 100);
  const toNaira = (k: number) => Number((k / 100).toFixed(2));
  const r = isInternational ? R_INTL : R_LOCAL;

  if (amount <= 0)
    return {
      fee: 0,
      grossCharge: Math.max(0, amount),
      netToMerchant: Math.max(0, amount),
    };

  if (isInternational) {
    // INTL: 3.9% + ₦100, no cap, no waiver
    if (payerCoversFee) {
      // net = G - (r*G + 100)  => G = (net + 100) / (1 - r)
      const netK = toKobo(amount);
      const grossK = Math.round((netK + toKobo(FLAT_NGN)) / (1 - r));
      const feeK = Math.round(grossK * r) + toKobo(FLAT_NGN);
      return {
        fee: toNaira(feeK),
        grossCharge: toNaira(grossK),
        netToMerchant: toNaira(grossK - feeK),
      };
    } else {
      // Customer pays 'amount' (gross). Fee is r*G + 100
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

  // LOCAL: 1.5% + ₦100, ₦100 waived under ₦2,500, cap ₦2,000
  if (payerCoversFee) {
    const netK = toKobo(amount);

    // First, try the "no-flat" case (waiver) and see if resulting gross stays below the waiver threshold.
    const grossNoFlatK = Math.round(netK / (1 - R_LOCAL)); // G = net / (1 - r)
    if (grossNoFlatK < toKobo(WAIVER_THRESHOLD_NGN)) {
      const feeK = Math.round(grossNoFlatK * R_LOCAL); // no flat
      return {
        fee: toNaira(feeK),
        grossCharge: toNaira(grossNoFlatK),
        netToMerchant: toNaira(grossNoFlatK - feeK),
      };
    }

    // Flat ₦100 applies: G = (net + 100) / (1 - r)
    const grossWithFlatK = Math.round(
      (netK + toKobo(FLAT_NGN)) / (1 - R_LOCAL)
    );
    let feeRawK = Math.round(grossWithFlatK * R_LOCAL) + toKobo(FLAT_NGN);

    // Apply local cap if needed
    const capK = toKobo(LOCAL_CAP_NGN);
    if (feeRawK <= capK) {
      return {
        fee: toNaira(feeRawK),
        grossCharge: toNaira(grossWithFlatK),
        netToMerchant: toNaira(grossWithFlatK - feeRawK),
      };
    }

    // If capped, the simplest way to guarantee NET==desired is: G = net + CAP
    const grossCappedK = netK + capK;
    const feeK = capK;
    return {
      fee: toNaira(feeK),
      grossCharge: toNaira(grossCappedK),
      netToMerchant: toNaira(grossCappedK - feeK),
    };
  } else {
    // Merchant absorbs fee. Amount is gross charged to customer.
    const grossK = toKobo(amount);

    // Decide if ₦100 flat is waived
    const flatK = grossK < toKobo(WAIVER_THRESHOLD_NGN) ? 0 : toKobo(FLAT_NGN);
    let feeK = Math.round(grossK * R_LOCAL) + flatK;

    // Apply local cap
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
 * Backwards-compatible wrapper matching your original signature.
 * Returns just the fee (Naira, 2dp).
 * Convention: if payerCoversFee=true, amount is desired NET; else amount is GROSS charge.
 */
export function calculatePaystackFee(
  amount: number,
  isInternational: boolean,
  payerCoversFee: boolean = true
): number {
  return computePaystackCharge(amount, { isInternational, payerCoversFee }).fee;
}
