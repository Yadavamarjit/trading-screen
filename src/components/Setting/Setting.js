import React, { useState } from "react";
import { Moon, Sun, Bell, DollarSign, Lock, Eye, EyeOff } from "lucide-react";
import ThemeToggle from "../ToggleTheme/ToggleTheme";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Settings
      </h2>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sun className="text-yellow-500" size={24} />
            <Moon className="text-blue-500" size={24} />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Theme
            </span>
          </div>
          <ThemeToggle />
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="text-gray-600 dark:text-gray-400" size={24} />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Notifications
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Default Currency Dropdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign
              className="text-gray-600 dark:text-gray-400"
              size={24}
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Default Currency
            </span>
          </div>
          <select
            value={defaultCurrency}
            onChange={(e) => setDefaultCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        {/* Two-Factor Authentication Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="text-gray-600 dark:text-gray-400" size={24} />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Two-Factor Authentication
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={twoFactorAuth}
              onChange={() => setTwoFactorAuth(!twoFactorAuth)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Show Balance Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {showBalance ? (
              <Eye className="text-gray-600 dark:text-gray-400" size={24} />
            ) : (
              <EyeOff className="text-gray-600 dark:text-gray-400" size={24} />
            )}
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Show Balance
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showBalance}
              onChange={() => setShowBalance(!showBalance)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Save Settings
        </button>
      </div>
    </div>
  );
}
