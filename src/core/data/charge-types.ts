interface IChargeTypes {
  value: string;
  label: string;
  payment_tier: string;
}

export const chargeTypes: Array<IChargeTypes> = [
  {
    value: "self-insured",
    label: "Self-insured",
    payment_tier: "payment_tier_1",
  },
  {
    value: "private-health-excess",
    label: "Private Health Insurance with excess",
    payment_tier: "payment_tier_2",
  },
  {
    value: "private-health-excess-0",
    label: "Private Health Insureance with $0 excess",
    payment_tier: "payment_tier_3",
  },
  {
    value: "private-health-pension",
    label: "Private Health Insreance + Pension/Healthcare Card",
    payment_tier: "payment_tier_4",
  },
  {
    value: "pension-card",
    label: "Pension Card",
    payment_tier: "payment_tier_5",
  },
  {
    value: "healthcare-card",
    label: "Healthcare Card",
    payment_tier: "payment_tier_6",
  },
  {
    value: "department-veteran",
    label: "Department of Veteran Affairs",
    payment_tier: "payment_tier_7",
  },
  { value: "work-cover", label: "Work Cover", payment_tier: "payment_tier_8" },
  {
    value: "transport-accident",
    label: "Transport Accident Commision",
    payment_tier: "payment_tier_9",
  },
];

export default chargeTypes;
