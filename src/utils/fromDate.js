export const getFromDate = (number) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - number);
  return fromDate;
};
