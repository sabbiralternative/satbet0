export const scrollToLeft = (ref) => {
  if (ref?.current) {
    ref.current.scrollLeft -= 200;
  }
};

export const scrollToRight = (ref) => {
  if (ref?.current) {
    ref.current.scrollLeft += 200;
  }
};
