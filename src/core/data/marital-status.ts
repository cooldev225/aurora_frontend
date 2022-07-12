interface IMaritalStatus {
  value: number;
  label: string;
}

export const chargeTypes: Array<IMaritalStatus> = [
  { value: 1, label: "Married" },
  { value: 2, label: "Not Stated" },
  { value: 3, label: "Divorced" },
  { value: 4, label: "Widowed" },
  { value: 5, label: "Never married" },
  { value: 6, label: "Separated" },
  { value: 7, label: "De Facto" },
];

export { IMaritalStatus };

export default chargeTypes;
