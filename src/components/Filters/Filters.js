import React, { useEffect } from "react";
import { generatecomparisonData } from "../../utils/graphsUtils";

export default function Filters({
  setSelectedRange,
  selectedRange,
  setCompairingData,
  isCompareEnabled,
  filteredData,
}) {
  const handleRangeChange = (e) => {
    const range = e.target.dataset.range;
    setSelectedRange(range);
    if (isCompareEnabled) {
      const data = generatecomparisonData(range, filteredData);
      setCompairingData(data);
    }
  };

  return (
    <div className="flex justify-end gap-x-1 ml-24 sm:ml-0">
      {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((range) => (
        <button
          key={range}
          data-range={range} // Saving range data in the dataset
          onClick={handleRangeChange}
          className={`px-4 py-1 rounded transition-all duration-300 ease-in-out ${
            range === selectedRange
              ? "bg-[#4b40ee] text-white"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 hover:dark:bg-gray-700"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
