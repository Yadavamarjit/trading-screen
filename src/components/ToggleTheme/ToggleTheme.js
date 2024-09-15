import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-900 dark:text-gray-100">Light</span>
      <button
        onClick={toggleTheme}
        className="relative inline-flex items-center cursor-pointer"
      >
        <span
          className={`w-14 h-8 inline-flex items-center rounded-full p-1 transition-colors duration-300 ${
            isDarkMode ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`w-6 h-6 inline-flex items-center justify-center rounded-full bg-white shadow transform transition-transform duration-300 ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </span>
      </button>
      <span className="text-gray-900 dark:text-gray-100">Dark</span>
    </div>
  );
};

export default ThemeToggle;
