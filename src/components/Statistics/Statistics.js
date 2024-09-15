import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  BarChart2,
  TrendingUp,
} from "lucide-react";

export default function Statistics(props) {
  const { filteredData } = props;
  const data = {
    open: filteredData[0][1].toFixed(2),
    prevClose: "$61308.97",
    volume: "22,00,76,175",
    tradedValue: "$358 Cr",
    upperCircuit: "$64989.87",
    lowerCircuit: "$59909.62",
    marketCap: "$2,488 Cr",
    peRatio: "85.58",
    pbRatio: "7.50",
    roe: "8.69%",
    eps: "$0.19",
    dividendYield: "0.00%",
    bookValue: "$2.17",
    industryPE: "24.67",
  };

  const priceChartOptions = {
    chart: { type: "line", height: 250 },
    title: { text: "Price Movement " },
    yAxis: { visible: false },
    xAxis: { visible: false },
    tooltip: {
      shared: true,
      xDateFormat: "%b %e, %Y",
      pointFormat: "<b>{point.y:.2f} USD</b>",
    },
    series: [
      {
        name: "Stock Price",
        data: filteredData,
      },
    ],
    credits: { enabled: false },
  };

  const volumeChartOptions = {
    chart: { type: "column", height: 250 },
    title: { text: "Trading Volume (Last 7 Days)" },
    xAxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    yAxis: { title: { text: "Volume" } },
    series: [
      {
        name: "Volume",
        data: [
          22007617, 18005432, 25003211, 20001543, 19008765, 15002345, 17006789,
        ],
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Stock Statistics
      </h2>

      {/* Price Information */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <span className="text-sm text-gray-500 dark:text-gray-400">Open</span>
          <div className="flex items-center">
            <DollarSign className="text-blue-500 mr-2" size={20} />
            <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {data.open}
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Previous Close
          </span>
          <div className="flex items-center">
            <DollarSign className="text-blue-500 mr-2" size={20} />
            <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {data.prevClose}
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Volume
          </span>
          <div className="flex items-center">
            <BarChart2 className="text-blue-500 mr-2" size={20} />
            <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {data.volume}
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Upper Circuit
          </span>
          <div className="flex items-center">
            <ArrowUp className="text-green-500 mr-2" size={20} />
            <span className="font-semibold text-lg text-green-500">
              {data.upperCircuit}
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Lower Circuit
          </span>
          <div className="flex items-center">
            <ArrowDown className="text-red-500 mr-2" size={20} />
            <span className="font-semibold text-lg text-red-500">
              {data.lowerCircuit}
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Traded Value
          </span>
          <div className="flex items-center">
            <TrendingUp className="text-blue-500 mr-2" size={20} />
            <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {data.tradedValue}
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <HighchartsReact
            highcharts={Highcharts}
            options={priceChartOptions}
          />
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <HighchartsReact
            highcharts={Highcharts}
            options={volumeChartOptions}
          />
        </div>
      </div>

      {/* Fundamental Statistics */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Fundamental Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Market Cap", value: data.marketCap },
            { label: "P/E Ratio", value: data.peRatio },
            { label: "P/B Ratio", value: data.pbRatio },
            { label: "ROE", value: data.roe },
            { label: "EPS (TTM)", value: data.eps },
            { label: "Dividend Yield", value: data.dividendYield },
            { label: "Book Value", value: data.bookValue },
            { label: "Industry P/E", value: data.industryPE },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
            >
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.label}
              </h4>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
