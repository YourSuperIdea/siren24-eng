export function FareCalculator(distance, time, rateDetails) {  
  const charged_distance = rateDetails.base_distance ? Math.max(distance - rateDetails.base_distance, 0) : distance;
  const charged_rate = rateDetails.range_divider ? (distance >= rateDetails.range_divider ? rateDetails.long_range_rate : rateDetails.short_range_rate) : rateDetails.rate_per_unit_distance;
  let baseCalculated =
    parseFloat(charged_rate) *
      parseFloat(charged_distance) +
    parseFloat(rateDetails.rate_per_hour) * (parseFloat(time) / 3600);
  if (rateDetails.base_fare > 0) {
    baseCalculated = baseCalculated + rateDetails.base_fare;
  }
  let total =
    baseCalculated > parseFloat(rateDetails.min_fare)
      ? baseCalculated
      : parseFloat(rateDetails.min_fare);
  let convenienceFee = 0;
  if (
    rateDetails.convenience_fee_type &&
    rateDetails.convenience_fee_type == "flat"
  ) {
    convenienceFee = rateDetails.convenience_fees;
  } else {
    convenienceFee = (total * parseFloat(rateDetails.convenience_fees)) / 100;
  }
  let grand = total + convenienceFee;

  return {
    totalCost: parseFloat(total.toFixed(2)),
    grandTotal: parseFloat(grand.toFixed(2)),
    convenience_fees: parseFloat(convenienceFee.toFixed(2)),
  };
}
