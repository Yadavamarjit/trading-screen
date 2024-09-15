import logo from "./logo.svg";
import "./App.css";
import PriceChart from "./components/PriceChart/PriceChart";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <Home />
    </div>
  );
}

export default App;
