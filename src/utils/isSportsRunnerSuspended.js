export const isSportsRunnerSuspended = (column, item) => {
  if (item?.Status === 2 || !item?.Status) {
    return true;
  } else if (column?.IsActive === 2 || !column?.IsActive) {
    return true;
  } else {
    return false;
  }
};
