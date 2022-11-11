export const convertToCurrency = (amount) => {
  let total = 0;

  if (!isNaN(parseFloat(amount))) {
    total = amount;
  }

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(total);
};
