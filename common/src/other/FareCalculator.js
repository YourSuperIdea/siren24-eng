export function FareCalculator(distance, time, rateDetails) {
  let charged_distance;
  if (rateDetails.base_distance) {
    charged_distance = Math.max(distance - rateDetails.base_distance, 0);
  } else {
    charged_distance = distance;
  }
  let baseCalculated =
    parseFloat(rateDetails.rate_per_unit_distance) *
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
