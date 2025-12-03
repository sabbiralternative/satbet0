const isRefetchGroupData = (sports) => {
  if (sports === 4 || sports === 1 || sports === 2) {
    return true;
  }
};

export default isRefetchGroupData;
