export const generateRandomPrice = (basePrice) => {
  const fluctuation = (Math.random() - 0.5) * 100;
  return basePrice + fluctuation;
};
