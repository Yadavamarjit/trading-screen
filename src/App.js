import logo from "./logo.svg";
import "./App.css";
import PriceChart from "./components/PriceChart/PriceChart";

function App() {
  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <PriceChart />
    </div>
  );
}

export default App;
