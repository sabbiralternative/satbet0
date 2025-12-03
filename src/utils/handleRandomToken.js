// const handleRandomToken = () => {
//   const currentTimestamp = Math.floor(new Date().getTime() / 1000);
//   const multipliedTimestamp = currentTimestamp * 247;
//   const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
//   const finalToken = `${randomSixDigitNumber}${multipliedTimestamp}`;

//   return finalToken;
// };

// export default handleRandomToken;
const handleRandomToken = () => {
  // Get IST timestamp using Date
  const now = new Date();
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); // Adjust UTC to IST
  const indianTimestamp = Math.floor(istTime.getTime() / 1000);
  // Generate token
  const multipliedTimestamp = indianTimestamp * 247;
  const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
  const finalToken = `${randomSixDigitNumber}${multipliedTimestamp}`;

  return finalToken;
};

export default handleRandomToken;
