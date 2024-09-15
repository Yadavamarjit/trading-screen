import React, { useEffect, useState } from "react";
import Tabs from "../Tabs/Tabs";
import { generatePastData, generateRandomPrice } from "../../utils/graphsUtils";
import { initialData } from "../../data/graphData";
import ThemeToggle from "../ToggleTheme/ToggleTheme";

export default function Home() {
  const [priceChange, setPriceChange] = useState(2161.42);
  const [percentChange, setPercentChange] = useState(3.54);
  const [currentPrice, setCurrentPrice] = useState(63179.71);
  const [filteredData, setFilteredData] = useState([
    ...initialData,
    ...generatePastData(),
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const newPrice = generateRandomPrice(currentPrice);
      const newPriceChange = newPrice - 61018.29;
      const newPercentChange = (newPriceChange / 61018.29) * 100;

      setFilteredData((prevData) => [...prevData, [currentTime, newPrice]]);
      setCurrentPrice(newPrice);
      setPriceChange(newPriceChange);
      setPercentChange(newPercentChange);
    }, 1500);

    return () => clearInterval(intervalId);
  }, [currentPrice]);
  return (
    <div className="p-5  bg-lightBackground dark:bg-transparent text-lightText dark:text-darkText">
      <ThemeToggle />
      <div className="mb-5">
        <div className="text-4xl font-bold">
          {currentPrice.toFixed(2)}{" "}
          <span className="text-lg text-gray-600 dark:text-gray-400">USD</span>
        </div>
        <div
          className={`text-lg ${
            priceChange > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {priceChange > 0 ? "+" : ""}
          {priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
        </div>
      </div>
      <Tabs filteredData={filteredData} setFilteredData={setFilteredData} />
    </div>
  );
}
