const isOddSuspended = (runner) => {
  if (runner?.status !== "OPEN") {
    return true;
  } else {
    return false;
  }
};
export const isHorseGreyhoundOddSuspended = (game, runner) => {
  if (game?.status !== "OPEN" || runner?.status !== "ACTIVE") {
    return true;
  } else {
    return false;
  }
};

export default isOddSuspended;
