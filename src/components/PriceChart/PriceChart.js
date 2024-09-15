import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Filters from "../Filters/Filters";
import { filterDataByRange } from "../../utils/graphsUtils";

const Chart = ({ setFilteredData, filteredData }) => {
  const [selectedRange, setSelectedRange] = useState("1d");

  useEffect(() => {
    filterDataByRange(selectedRange, filteredData, setFilteredData);
    console.log({ selectedRange });
  }, [selectedRange]);

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
    <div className="p-5  bg-lightBackground dark:bg-transparent text-lightText dark:text-darkText">
      <div className="flex mb-5 justify-between">
        <div className="flex gap-x-5 ">
          <button className="flex items-center  gap-x-3  text-gray-700 dark:text-gray-200  mr-2">
            <img src="/assets/fullscreen.svg" alt="full" /> Fullscreen
          </button>
          <button className="flex items-center  gap-x-3   text-gray-700 dark:text-gray-200 ">
            <img src="/assets/add.svg" alt="add" />
            Compare
          </button>
        </div>
        <Filters
          setSelectedRange={setSelectedRange}
          selectedRange={selectedRange}
        />
      </div>

      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default Chart;
