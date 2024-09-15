import React, { useEffect, useState, useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Filters from "../Filters/Filters";
import {
  filterDataByRange,
  generatecomparisonData,
} from "../../utils/graphsUtils";

const Chart = ({
  setFilteredData,
  filteredData,
  compairingData,
  setCompairingData,
  isCompareEnabled,
  setIsCompareEnabled,
}) => {
  const [selectedRange, setSelectedRange] = useState("1d");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedStock, setSelectedStock] = useState("");

  const chartContainerRef = useRef(null);

  useEffect(() => {
    filterDataByRange(selectedRange, filteredData, setFilteredData);
  }, [selectedRange]);

  // checking for theme to change graph ui on fullscreen in dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const darkModeEnabled =
        document.documentElement.classList.contains("dark");
      setIsDarkMode(darkModeEnabled);
    };

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    checkDarkMode();

    return () => observer.disconnect();
  }, []);

  // checking for loss
  const isLoss = () => {
    if (filteredData.length > 1) {
      const firstPoint = filteredData[0]?.[1];
      const lastPoint = filteredData[filteredData.length - 1]?.[1];
      return lastPoint < firstPoint;
    }
    return false;
  };

  const chartOptions = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: isFullscreen ? window.innerHeight - 80 : window.innerHeight - 240,
    },
    title: { text: "" },
    xAxis: {
      type: "datetime",
      visible: isFullscreen,
      lineColor: isDarkMode ? "#f5f5f5" : "#333333",
      tickColor: isDarkMode ? "#f5f5f5" : "#333333",
      labels: {
        style: {
          color: isDarkMode ? "#f5f5f5" : "#333333",
        },
      },
    },
    yAxis: [
      {
        title: { text: "" },
        visible: isFullscreen,
        gridLineColor: isDarkMode ? "#555555" : "#e0e0e0",
        lineColor: isDarkMode ? "#f5f5f5" : "#333333",
        tickColor: isDarkMode ? "#f5f5f5" : "#333333",
        labels: {
          style: {
            color: isDarkMode ? "#f5f5f5" : "#333333",
          },
        },
        height: "75%",
      },
      {
        title: { text: "Volume" },
        opposite: true,
        gridLineWidth: 0,
        labels: {
          style: {
            color: isDarkMode ? "#f5f5f5" : "#333333",
          },
        },
        visible: isFullscreen ? true : false,
        height: "25%",
        top: "75%",
      },
    ],
    legend: { enabled: false },
    tooltip: {
      shared: false,
      xDateFormat: "%b %e, %Y",
      pointFormat: "<b>{point.y:.2f} USD</b>",
    },
    series: [
      {
        name: "Price",
        data: filteredData.map((d) => [d[0], d[1]]),
        color: isLoss() ? "#ff4c4c" : "#5f51e3",
        lineWidth: 2,
        marker: { enabled: false },
        dataLabels: {
          enabled: true,
          formatter: function () {
            if (this.point.index === this.series.data.length - 1) {
              return `<div style="color: #fff; background-color: ${
                isLoss() ? "#ff4c4c" : "#5f51e3"
              }; border-radius: 4px; padding: 10px;">
                    ${this.y.toFixed(2)} USD
                  </div>`;
            }
            return null;
          },
          useHTML: true,
          align: "left",
          verticalAlign: "middle",
          zIndex: 10,
        },
        yAxis: 0,
      },
      ...(isCompareEnabled
        ? [
            {
              type: "line",
              name: "Price2",
              data: compairingData,
              color: "green",
              lineWidth: 2,
              marker: { enabled: false },
              dataLabels: {
                enabled: true,
                formatter: function () {
                  if (
                    this.point.index === this.series.data.length - 1 &&
                    isCompareEnabled
                  ) {
                    return `<div style="color: #fff; background-color: ${"green"}; border-radius: 4px; padding: 10px;">
                          ${this.y.toFixed(2)} USD
                        </div>`;
                  }
                  return null;
                },
                useHTML: true,
                align: "left",
                verticalAlign: "middle",
                zIndex: 10,
              },
              yAxis: 0,
            },
          ]
        : []),
      {
        type: "column",
        name: "Volume",
        data: filteredData.map((d) => [d[0], d[2]]),
        yAxis: 1,
        color: "rgba(200, 200, 200, 0.3)",
        borderColor: "#ccc",
        dataLabels: {
          enabled: false,
        },
      },
    ],
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
      line: {
        dataLabels: { enabled: false },
        enableMouseTracking: true,
      },
    },
    credits: { enabled: false },
  };

  // for handling toggle full screen
  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (chartContainerRef.current.requestFullscreen) {
        chartContainerRef.current.requestFullscreen();
      } else if (chartContainerRef.current.webkitRequestFullscreen) {
        chartContainerRef.current.webkitRequestFullscreen();
      } else if (chartContainerRef.current.msRequestFullscreen) {
        chartContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    document.addEventListener("fullscreenchange", () => {
      setIsFullscreen(!!document.fullscreenElement);
    });
  };

  const handleCompareToggle = (value) => {
    if (value === selectedStock) {
      setCompairingData([]);
    } else {
      const data = generatecomparisonData(selectedRange, filteredData);
      setCompairingData(data);
    }
    setIsCompareEnabled((prevState) => !prevState);
  };

  return (
    <div
      ref={chartContainerRef}
      className={`p-5 dark:bg-gray-900 ${isFullscreen ? "w-full h-full" : ""}`}
    >
      <div className="flex mb-5 justify-between overflow-x-scroll no-scrollbar">
        <div className="flex gap-x-5 whitespace-nowrap ">
          <button
            onClick={handleFullscreenToggle}
            className="flex items-center gap-x-3 text-gray-700 dark:text-gray-200 mr-2 "
          >
            <img
              src={
                isFullscreen
                  ? "/assets/exit-fullscreen.svg"
                  : "/assets/fullscreen.svg"
              }
              alt={isFullscreen ? "exit full" : "full"}
            />
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
          <div className="relative inline-block ">
            <label className="absolute flex cursor-pointer gap-x-2 left-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-700 dark:text-gray-200">
              <img src="/assets/add.svg" alt="add" /> Compare
            </label>
            <select
              onChange={(e) => {
                setSelectedStock(e.target.value);
                handleCompareToggle(e.target.value);
              }}
              className="ml-2 px-4 text-center w-full  py-2 rounded  bg-transparent text-transparent appearance-none dark:bg-gray-900 outline-none "
            >
              <option className="dark:text-gray-200" value="samsung ">
                Hide Stock
              </option>
              <option className="dark:text-gray-200" value="motorolla">
                Add a stock
              </option>
            </select>
          </div>
        </div>
        <Filters
          setSelectedRange={setSelectedRange}
          selectedRange={selectedRange}
          setCompairingData={setCompairingData}
          isCompareEnabled={isCompareEnabled}
          filteredData={filteredData}
        />
      </div>

      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default Chart;
