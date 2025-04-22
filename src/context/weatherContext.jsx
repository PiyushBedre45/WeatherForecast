import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const DataContext = createContext();

// Create a custom hook (optional but recommended)
export const useData = () => useContext(DataContext);

// Create the provider component
export const DataProvider = ({ children }) => {
  //   const [data, setData] = useState("piyggggsh");
  const [weatherData, setWeatherData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [city, setCity] = useState("pune");

  //   Get wearther data
  const getWeatherData = async () => {
    try {
      const cityName = city.trim() || "pune";
      const response = await axios.get(
        `http://localhost:5280/api/weather/current?city=${cityName}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  //   Get Graph data
  const getGraphData = async () => {
    try {
      const cityName = city.trim() || "pune";
      const apiData = await axios.get(
        `http://localhost:5280/api/weather/hourly?city=${cityName}`
      );
      const formatted = apiData.data.map((item) => ({
        name: item.time,
        temp: item.temperature,
      }));
      setGraphData(formatted);

      console.log(formatted);
    } catch (err) {
      console.error("Error fetching graph data:", err);
    }
  };

  //   Use Effect
  useEffect(() => {
    getWeatherData();
    getGraphData();
  }, [city]);

  return (
    <DataContext.Provider
      value={{
        weatherData,
        graphData,
        city,
        setCity, // Expose city and setCity
        getWeatherData, // Expose getCityName
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
