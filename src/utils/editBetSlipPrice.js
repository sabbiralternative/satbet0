export const handleIncreasePrice = (
  price,
  placeBetValues,
  dispatch,
  setPrice
) => {
  if (price == 1000 || placeBetValues?.isWeak === true) {
    return;
  } else if (price > 1.0 && price < 2) {
    dispatch(setPrice((parseFloat(price) + 0.01).toFixed(2)));
  } else if (price > 1.99 && price < 3) {
    dispatch(setPrice((parseFloat(price) + 0.02).toFixed(2)));
  } else if (price > 2.99 && price < 4) {
    dispatch(setPrice((parseFloat(price) + 0.05).toFixed(2)));
  } else if (price > 3.99 && price < 6) {
    dispatch(setPrice((parseFloat(price) + 0.1).toFixed(1)));
  } else if (price > 5.99 && price < 10) {
    dispatch(setPrice((parseFloat(price) + 0.2).toFixed(1)));
  } else if (price > 9.99 && price < 20) {
    dispatch(setPrice((parseFloat(price) + 0.5).toFixed(1)));
  } else {
    dispatch(setPrice(parseFloat(price) + 1));
  }
};

export const handleDecreasePrice = (
  price,
  placeBetValues,
  dispatch,
  setPrice
) => {
  if (price < 1.02 || placeBetValues?.isWeak === true) {
    return;
  } else if (price < 2) {
    dispatch(setPrice((parseFloat(price) - 0.01).toFixed(2)));
  } else if (price > 1.99 && price < 3) {
    dispatch(setPrice((parseFloat(price) - 0.02).toFixed(2)));
  } else if (price > 2.99 && price < 4) {
    dispatch(setPrice((parseFloat(price) - 0.05).toFixed(2)));
  } else if (price > 3.99 && price < 6) {
    dispatch(setPrice((parseFloat(price) - 0.1).toFixed(1)));
  } else if (price > 5.99 && price < 10) {
    dispatch(setPrice((parseFloat(price) - 0.2).toFixed(1)));
  } else if (price > 9.99 && price < 20) {
    dispatch(setPrice((parseFloat(price) - 0.5).toFixed(1)));
  } else {
    dispatch(setPrice(parseFloat(price) - 1));
  }
};
