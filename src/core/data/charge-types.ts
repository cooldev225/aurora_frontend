interface IChargeTypes {
  value: string;
  label: string;
}

export const chargeTypes: Array<IChargeTypes> = [
  {
    value: "self-insured",
    label: "Self-insured",
  },
  {
    value: "private-health-excess",
    label: "Private Health Insurance with excess",
  },
  {
    value: "private-health-excess-0",
    label: "Private Health Insurance with $0 excess",
  },
  {
    value: "pension-card",
    label: "Pension Card",
  },
  {
    value: "healthcare-card",
    label: "Healthcare Card",
  },
  {
    value: "department-veteran",
    label: "Department of Veteran Affairs",
  },
  { value: "work-cover", label: "Work Cover" },
  {
    value: "transport-accident",
    label: "Transport Accident Commission",
  },
];

const payment_tier = {
  self_insured: "payment_tier_1",
  private_health_excess: "payment_tier_2",
  private_health_excess_0: "payment_tier_3",
  private_health_pension: "payment_tier_4",
  pension_card: "payment_tier_5",
  healthcare_card: "payment_tier_6",
  department_veteran: "payment_tier_7",
  work_cover: "payment_tier_8",
  transport_accident: "payment_tier_9",
};

export const getProcedurePrice = (data, charge_type) => {
  const key = charge_type.replaceAll("-", "_");
  return data[payment_tier[key]];
};

export default chargeTypes;
