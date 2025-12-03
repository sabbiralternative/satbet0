const filterUpcoming = (data) => {
  let upComing = [];
  if (data) {
    upComing =
      Object.values(data).length > 0 &&
      Object.keys(data)
        .sort((keyA, keyB) => data[keyA].sort - data[keyB].sort)
        .filter((key) => {
          return data[key]?.inPlay === 0 && data[key]?.visible === true;
        });
    return upComing;
  }
};

export default filterUpcoming;
