import React, { useState } from "react";
import PriceChart from "../PriceChart/PriceChart";
import Summary from "../Summary/Summary";
import Statistics from "../Statistics/Statistics";
import Analysis from "../Analysis/Analysis";
import Setting from "../Setting/Setting";

const tabs = [
  { id: "summary", label: "Summary" },
  { id: "chart", label: "Chart" },
  { id: "statistics", label: "Statistics" },
  { id: "analysis", label: "Analysis" },
  { id: "settings", label: "Settings" },
];

const componentMap = {
  chart: PriceChart,
  summary: Summary,
  statistics: Statistics,
  analysis: Analysis,
  settings: Setting,
};

export default function Tabs(props) {
  const [selectedTab, setSelectedTab] = useState("chart");

  const CurrentTab = componentMap[selectedTab];

  return (
    <>
      <div className="flex mb-5 border-b no-scrollbar font-semibold border-gray-300 dark:border-gray-700 w-full overflow-x-scroll">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 ${
              selectedTab === tab.id
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CurrentTab {...props} />
    </>
  );
}
