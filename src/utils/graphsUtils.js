import { initialData } from "../data/graphData";

export const generateRandomPrice = (basePrice) => {
  const fluctuation = (Math.random() - 0.5) * 100;
  return basePrice + fluctuation;
};

export function generateRandomVolume() {
  return Math.floor(Math.random() * (40000 - 2000 + 1)) + 2000;
}

export const generatePastData = (interval = 60, unit = "m") => {
  let arr = [];
  const currentTime = new Date().getTime();
  let intervalInMs;

  // Convert the passed unit to milliseconds
  switch (unit) {
    case "s": // seconds
      intervalInMs = 1000; // 1 second = 1000 ms
      break;
    case "m": // minutes
      intervalInMs = 1000 * 60; // 1 minute = 60000 ms
      break;
    case "h": // hours
      intervalInMs = 1000 * 60 * 60; // 1 hour = 3600000 ms
      break;
    case "d": // days
      intervalInMs = 1000 * 60 * 60 * 24; // 1 day = 86400000 ms
      break;
    case "M": // months (approximately, using 30.44 days per month)
      intervalInMs = 1000 * 60 * 60 * 24 * 30.44; // 1 month ≈ 2629800000 ms
      break;
    case "y": // years (using 365.25 days per year for leap years)
      intervalInMs = 1000 * 60 * 60 * 24 * 365.25; // 1 year ≈ 31557600000 ms
      break;
    default:
      throw new Error(
        'Invalid unit passed. Use "s" for seconds, "m" for minutes, "h" for hours, "d" for days, "M" for months, or "y" for years.'
      );
  }

  for (let i = 0; i < interval; i++) {
    const pastTime = currentTime - i * intervalInMs;
    arr.push([pastTime, generateRandomPrice(63279.71), generateRandomVolume()]);
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

export const generatecomparisonData = (range, filteredData) => {
  let interval, unit;
  switch (range) {
    case "1d":
      interval = filteredData.length;
      unit = "s";
      break;
    case "3d":
      interval = 72; // 3 days = 72 hours
      unit = "h";
      break;
    case "1w":
      interval = 7; // 1 week = 7 days
      unit = "d";
      break;
    case "1m":
      interval = 30; // 1 month = 30 days
      unit = "d";
      break;

    default:
      interval = 180;
      unit = "d";
  }
  return generatePastData(interval, unit);
};
