interface IMaritalStatus {
  value: string;
  label: string;
}

export const chargeTypes: Array<IMaritalStatus> = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "not-stated", label: "Not Stated" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "never-married", label: "Never married" },
  { value: "separated", label: "Separated" },
  { value: "de-facto", label: "De Facto" },
];

export { IMaritalStatus };

export default chargeTypes;
