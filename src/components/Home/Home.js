import React, { useEffect, useState } from "react";
import Tabs from "../Tabs/Tabs";
import {
  generatePastData,
  generateRandomPrice,
  generateRandomVolume,
} from "../../utils/graphsUtils";
import { initialData } from "../../data/graphData";
import useTheme from "../../hooks/useTheme";

export default function Home() {
  const [priceChange, setPriceChange] = useState(2161.42);
  const [percentChange, setPercentChange] = useState(3.54);
  const [currentPrice, setCurrentPrice] = useState(63279.71);
  const [filteredData, setFilteredData] = useState([
    ...initialData,

    ...generatePastData(60, "s"),
  ]);
  const [compairingData, setCompairingData] = useState([]);
  const [isCompareEnabled, setIsCompareEnabled] = useState(false);
  useTheme();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const startingPrice = filteredData[0][1];
      const currentTime = new Date().getTime();
      const newPrice = generateRandomPrice(currentPrice);
      const newPriceChange = newPrice - startingPrice;
      const newPercentChange = (newPriceChange / startingPrice) * 100;

      setFilteredData((prevData) => [
        ...prevData,
        [currentTime, newPrice, generateRandomVolume()],
      ]);
      setCurrentPrice(newPrice);
      setPriceChange(newPriceChange);
      setPercentChange(newPercentChange);

      // Update comparing data if comparison is enabled
      if (isCompareEnabled) {
        setCompairingData((prevCompairingData) => {
          const comparePrice =
            newPrice * (Math.random() * (1.003 - 0.997) + 0.997);

          return [...prevCompairingData, [currentTime, comparePrice]];
        });
      }
    }, 1500);

    return () => clearInterval(intervalId);
  }, [currentPrice, isCompareEnabled, filteredData]);

  return (
    <div className="sm:p-5  bg-lightBackground dark:bg-transparent text-lightText dark:text-darkText">
      <div className="mb-5 p-5 sm:p-0 ">
        <div className="text-4xl font-bold">
          {currentPrice.toFixed(2)}{" "}
          <span className="text-lg text-gray-600 dark:text-gray-400">USD</span>
        </div>
        <div
          className={`text-lg ${
            currentPrice > filteredData[0][1]
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {priceChange > 0 ? "+" : ""}
          {priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
        </div>
      </div>
      <Tabs
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        currentPrice={currentPrice}
        setCompairingData={setCompairingData}
        setIsCompareEnabled={setIsCompareEnabled}
        compairingData={compairingData}
        isCompareEnabled={isCompareEnabled}
        percentChange={percentChange}
      />
    </div>
  );
}
