import { initialData } from "../data/graphData";

export const generateRandomPrice = (basePrice) => {
  const fluctuation = (Math.random() - 0.5) * 100;
  return basePrice + fluctuation;
};

export const generatePastData = (minutes = 60) => {
  let arr = [];
  const currentTime = new Date().getTime();
  const seconds = 6000;

  for (let i = 0; i < minutes; i++) {
    const pastTime = currentTime - i * seconds;
    arr.push([pastTime, generateRandomPrice(63179.71)]);
  }

  return arr.reverse();
};

export const filterDataByRange = (range, filteredData, setFilteredData) => {
  const currentTime = new Date();
  let rangeStart;

  const ranges = {
    "1d": 1,
    "3d": 3,
    "1w": 7,
    "1m": "month",
    "6m": "month",
    "1y": "year",
  };

  if (range === "max") {
    rangeStart = null;
  } else if (range === "1m" || range === "6m") {
    rangeStart = new Date(
      currentTime.setMonth(currentTime.getMonth() - (range === "1m" ? 1 : 6))
    );
  } else if (range === "1y") {
    rangeStart = new Date(
      currentTime.setFullYear(currentTime.getFullYear() - 1)
    );
  } else {
    rangeStart = new Date(
      currentTime.setDate(currentTime.getDate() - ranges[range])
    );
  }

  const data = [...initialData, ...filteredData];
  setFilteredData(
    rangeStart
      ? data.filter((dataPoint) => dataPoint[0] >= rangeStart.getTime())
      : data
  );
};
