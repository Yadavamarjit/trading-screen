import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Analysis(props) {
  const { filteredData, currentPrice, percentChange } = props;
  const data = {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    currentPrice: currentPrice,
    priceChange: 2.75,
    priceChangePercent: 1.86,
    recommendation: "Buy",
    targetPrice: 180,
    analystRating: 4.2,
    riskLevel: "Moderate",
  };

  const priceChartOptions = {
    chart: { type: "line", height: 300 },
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

  const performanceChartOptions = {
    chart: { type: "column", height: 300 },
    title: { text: "Performance vs Benchmark" },
    xAxis: {
      categories: ["1M", "3M", "6M", "YTD", "1Y", "3Y"],
      labels: { style: { color: "#718096" } },
    },
    yAxis: {
      title: { text: "Return (%)" },
      labels: { style: { color: "#718096" } },
    },
    series: [
      {
        name: data.symbol,
        data: [5, 10, 15, 12, 20, 40],
      },
      {
        name: "S&P 500",
        data: [3, 7, 12, 10, 15, 35],
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="p-6 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {data.symbol} Analysis
        </h2>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${data.currentPrice.toFixed(2)}
          </p>
          <p
            className={`text-lg font-semibold ${
              currentPrice > filteredData[0][1]
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {currentPrice > filteredData[0][1] ? (
              <TrendingUp className="inline mr-1" size={20} />
            ) : (
              <TrendingDown className="inline mr-1" size={20} />
            )}
            ${currentPrice.toFixed(2)} ({percentChange.toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <HighchartsReact
            highcharts={Highcharts}
            options={priceChartOptions}
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <HighchartsReact
            highcharts={Highcharts}
            options={performanceChartOptions}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Recommendation
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
            {data.recommendation}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-2">
            Target Price: ${data.targetPrice}
          </p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            Analyst Rating
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300">
            {data.analystRating}/5
          </p>
          <p className="text-sm text-green-600 dark:text-green-300 mt-2">
            Based on 30 analysts
          </p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Risk Level
          </h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">
            {data.riskLevel}
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-2">
            Consider your risk tolerance
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Investment Thesis
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {data.companyName} ({data.symbol}) presents a compelling investment
          opportunity in the technology sector. The company's strong market
          position, innovative product pipeline, and robust financial
          performance contribute to its positive outlook. Recent developments in
          AI and services have opened new revenue streams, potentially driving
          future growth.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          However, investors should be aware of potential risks such as
          increased competition, regulatory challenges, and macroeconomic
          factors that could impact consumer spending.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Key Factors to Consider
        </h3>
        <ul className="space-y-2">
          {[
            {
              icon: CheckCircle,
              color: "text-green-500",
              text: "Strong brand recognition and customer loyalty",
            },
            {
              icon: CheckCircle,
              color: "text-green-500",
              text: "Diversified product portfolio and services ecosystem",
            },
            {
              icon: AlertCircle,
              color: "text-yellow-500",
              text: "Potential for market saturation in key product categories",
            },
            {
              icon: XCircle,
              color: "text-red-500",
              text: "Dependency on global supply chains and potential disruptions",
            },
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <item.icon className={`${item.color} mr-2`} size={20} />
              <span className="text-gray-700 dark:text-gray-300">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-lg shadow">
        <h3 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">
          Should You Buy {data.symbol}?
        </h3>
        <p className="text-indigo-700 dark:text-indigo-300">
          Based on our analysis, {data.symbol} appears to be a{" "}
          {data.recommendation.toLowerCase()} at its current price of $
          {data.currentPrice.toFixed(2)}. The stock's potential upside to our
          target price of ${data.targetPrice}, coupled with the company's strong
          market position and growth prospects, supports this recommendation.
          However, investors should carefully consider their own financial
          situation, risk tolerance, and investment goals before making any
          investment decisions.
        </p>
      </div>
    </div>
  );
}
