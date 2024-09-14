import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BitcoinPriceChart = () => {
  const [activeTab, setActiveTab] = useState("Chart");
  const [timeFrame, setTimeFrame] = useState("1w");
  const [chartData, setChartData] = useState([]);

  // Generate more realistic dummy data
  const generateData = (days) => {
    const data = [];
    const end = Date.now();
    const start = end - days * 24 * 60 * 60 * 1000;
    for (let time = start; time <= end; time += 8 * 60 * 60 * 1000) {
      data.push([time, Math.floor(Math.random() * (65000 - 61000) + 61000)]);
    }
    return data;
  };
  useEffect(() => {
    setChartData(generateData(7)); // Default to 1 week of data
  }, []);

  useEffect(() => {
    const days = {
      "1d": 1,
      "3d": 3,
      "1w": 7,
      "1m": 30,
      "6m": 180,
      "1y": 365,
      max: 365 * 2,
    };
    setChartData(generateData(days[timeFrame]));
  }, [timeFrame]);

  const options = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
      height: "280px",
    },
    title: { text: "" },
    xAxis: {
      type: "datetime",
      labels: { style: { color: "#888" } },
      lineColor: "#e0e0e0",
      tickColor: "#e0e0e0",
    },
    yAxis: {
      title: { text: "" },
      labels: { style: { color: "#888" } },
      gridLineColor: "#e0e0e0",
    },
    legend: { enabled: false },
    series: [
      {
        name: "Price",
        data: chartData,
        color: "#4c6fff",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, Highcharts.color("#4c6fff").setOpacity(0.2).get("rgba")],
            [1, Highcharts.color("#4c6fff").setOpacity(0).get("rgba")],
          ],
        },
      },
    ],
    tooltip: {
      valuePrefix: "USD ",
      backgroundColor: "#4c6fff",
      style: { color: "white" },
    },
    plotOptions: {
      area: {
        marker: {
          radius: 2,
          fillColor: "#FFFFFF",
          lineWidth: 2,
          lineColor: null,
        },
      },
    },
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const latestPrice =
    chartData.length > 0 ? chartData[chartData.length - 1][1] : 0;
  const firstPrice = chartData.length > 0 ? chartData[0][1] : 0;
  const priceDifference = latestPrice - firstPrice;
  const percentageChange = ((priceDifference / firstPrice) * 100).toFixed(2);

  const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];
  const timeFrames = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 p-6 text-white">
        <h2 className="text-3xl font-bold">{formatCurrency(latestPrice)}</h2>
        <p
          className={`text-sm ${
            priceDifference >= 0 ? "text-green-300" : "text-red-300"
          }`}
        >
          {priceDifference >= 0 ? "+" : "-"}
          {formatCurrency(Math.abs(priceDifference))} ({percentageChange}%)
        </p>
      </div>
      <div className="border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button className="px-2 py-1 border rounded text-sm">
              Fullscreen
            </button>
            <button className="px-2 py-1 border rounded text-sm">
              Compare
            </button>
          </div>
          <div className="flex space-x-2">
            {timeFrames.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFrame(tf)}
                className={`px-2 py-1 rounded text-sm ${
                  timeFrame === tf ? "bg-blue-600 text-white" : "text-gray-600"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default BitcoinPriceChart;
