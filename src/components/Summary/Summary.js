import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart2,
  Percent,
} from "lucide-react";

export default function Summary({ currentPrice }) {
  const data = {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    currentPrice: currentPrice.toFixed(2),
    priceChange: "+2.45",
    priceChangePercent: "+1.37%",
    allTimeHigh: "$182.94",
    allTimeLow: "$103.10",
    marketCap: "$2.85T",
    peRatio: (currentPrice / 6.15).toFixed(2),
    pbRatio: "47.85",
    roe: "162.85%",
    dividendYield: "0.51%",
    volume: "52.3M",
    avgVolume: "58.7M",
  };

  const isPriceUp = parseFloat(data.priceChange) > 0;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {data.symbol}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {data.companyName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ${data.currentPrice}
          </p>
          <p
            className={`text-lg font-semibold ${
              isPriceUp ? "text-green-500" : "text-red-500"
            }`}
          >
            {data.priceChange} ({data.priceChangePercent})
            {isPriceUp ? (
              <TrendingUp className="inline ml-1" size={20} />
            ) : (
              <TrendingDown className="inline ml-1" size={20} />
            )}
          </p>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        Apple Inc. (AAPL) continues to dominate the tech sector, showcasing
        robust performance amidst market volatility. With a staggering market
        cap of {data.marketCap}, AAPL remains a heavyweight in the S&P 500. The
        stock's current P/E ratio of {data.peRatio} reflects high growth
        expectations, while a dividend yield of {data.dividendYield} adds appeal
        for income-focused investors. Trading volume of {data.volume} today vs{" "}
        {data.avgVolume} average indicates heightened investor interest. Keep an
        eye on the all-time high of {data.allTimeHigh} as a potential resistance
        level.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h3 className="text-lg font-medium text-white flex items-center">
            <DollarSign size={20} className="mr-2" />
            Market Cap
          </h3>
          <p className="text-2xl font-bold text-white mt-2">{data.marketCap}</p>
          <p className="text-sm text-blue-100 mt-1">Total company value</p>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h3 className="text-lg font-medium text-white flex items-center">
            <BarChart2 size={20} className="mr-2" />
            P/E Ratio
          </h3>
          <p className="text-2xl font-bold text-white mt-2">{data.peRatio}</p>
          <p className="text-sm text-purple-100 mt-1">Price to Earnings</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h3 className="text-lg font-medium text-white flex items-center">
            <Percent size={20} className="mr-2" />
            ROE
          </h3>
          <p className="text-2xl font-bold text-white mt-2">{data.roe}</p>
          <p className="text-sm text-green-100 mt-1">Return on Equity</p>
        </div>
      </div>
    </div>
  );
}
