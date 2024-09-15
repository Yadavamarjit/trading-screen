import React, { useEffect } from "react";

export default function Filters({ setSelectedRange, selectedRange }) {
  useEffect(() => {
    console.log({ selectedRange });
  }, [selectedRange]);
  return (
    <div className="flex justify-end gap-x-1">
      {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((range) => (
        <button
          key={range}
          onClick={() => setSelectedRange(range)} // Update the selected range
          className={`px-8 py-1  rounded  transition-all duration-300 ease-in-out ${
            range === selectedRange
              ? "bg-[#4b40ee] text-white "
              : " text-gray-700  hover:bg-gray-100  dark:text-gray-200  hover:dark:bg-gray-700"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
