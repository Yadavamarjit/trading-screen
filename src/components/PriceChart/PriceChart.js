import React, { useRef, useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { generateRandomPrice } from "../../utils/graphsUtils";
import { initialData } from "../../data/graphData";

const App = () => {
  const chartComponentRef = useRef(null);
  const [currentPrice, setCurrentPrice] = useState(63179.71);
  const [priceChange, setPriceChange] = useState(2161.42);
  const [percentChange, setPercentChange] = useState(3.54);
  const [filteredData, setFilteredData] = useState(initialData);
  const [selectedRange, setSelectedRange] = useState("1w");

  const filterDataByRange = (range) => {
    const currentTime = new Date();
    let rangeStart;
    switch (range) {
      case "1d":
        rangeStart = new Date(currentTime.setDate(currentTime.getDate() - 1));
        break;
      case "3d":
        rangeStart = new Date(currentTime.setDate(currentTime.getDate() - 3));
        break;
      case "1w":
        rangeStart = new Date(currentTime.setDate(currentTime.getDate() - 7));
        break;
      case "1m":
        rangeStart = new Date(currentTime.setMonth(currentTime.getMonth() - 1));
        break;
      case "6m":
        rangeStart = new Date(currentTime.setMonth(currentTime.getMonth() - 6));
        break;
      case "1y":
        rangeStart = new Date(
          currentTime.setFullYear(currentTime.getFullYear() - 1)
        );
        break;
      case "max":
        rangeStart = null;
        break;
      default:
        rangeStart = new Date(currentTime.setDate(currentTime.getDate() - 7));
    }

    if (rangeStart) {
      const filtered = initialData.filter(
        (dataPoint) => dataPoint[0] >= rangeStart.getTime()
      );

      console.log({ range, filtered });
      setFilteredData(filtered);
    } else {
      setFilteredData(initialData);
    }
  };

  useEffect(() => {
    filterDataByRange(selectedRange);
  }, [selectedRange]);

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
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentPrice]);

  const chartOptions = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 300,
    },
    title: { text: "" },
    xAxis: {
      type: "datetime",
      visible: false,
    },
    yAxis: {
      title: { text: "" },
      visible: false,
    },
    legend: { enabled: false },
    tooltip: {
      shared: true,
      xDateFormat: "%b %e, %Y",
      pointFormat: "<b>{point.y:.2f} USD</b>",
    },
    series: [
      {
        name: "Price",
        data: filteredData,
        color: "#5f51e3",
        lineWidth: 2,
        marker: { enabled: false },
        dataLabels: {
          enabled: true,
          formatter: function () {
            if (this.point.index === this.series.data.length - 1) {
              console.log(this.y);
              return `<div style="color: #fff; background-color: #5f51e3; border-radius: 4px; padding: 10px;">
                      ${this.y.toFixed(2)} USD
                    </div>`;
            }
            return null;
          },
          useHTML: true,
          align: "right",
          verticalAlign: "middle",
        },
      },
    ],
    plotOptions: {
      line: {
        dataLabels: { enabled: false },
        enableMouseTracking: true,
      },
    },
    credits: { enabled: false },
  };
  return (
    <div className="p-5 shadow-md">
      <div className="mb-5">
        <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          {currentPrice.toFixed(2)}{" "}
          <span className="text-lg text-gray-600 dark:text-gray-400">USD</span>
        </div>
        <div className="text-lg text-green-500">
          +{priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
        </div>
      </div>

      <div className="flex mb-5 border-b no-scrollbar font-semibold border-gray-300 dark:border-gray-700 w-full overflow-x-scroll">
        <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
          Summary
        </button>
        <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-blue-600 dark:border-blue-400">
          Chart
        </button>
        <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
          Statistics
        </button>
        <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
          Analysis
        </button>
        <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
          Settings
        </button>
      </div>

      <div className="flex mb-5">
        <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded mr-2">
          -
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded">
          Compare
        </button>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartComponentRef}
      />

      <div className="flex justify-end mt-5">
        {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((range) => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)} // Update the selected range
            className={`px-3 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded ml-2 ${
              range === selectedRange
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
