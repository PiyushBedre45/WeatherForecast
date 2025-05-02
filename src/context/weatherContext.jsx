import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const DataContext = createContext();

// Create a custom hook (optional but recommended)
export const useData = () => useContext(DataContext);

// Create the provider component
export const DataProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [daily, setDaily] = useState([]);
  const [city, setCity] = useState("");

  // Get weather data
  const getWeatherData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userCity = storedUser?.city;

      const cityName = city?.trim() || userCity || "pune"; // priority: manual input > user.city > default "pune"

      const response = await axios.get(
        `http://localhost:5280/api/weather/current?city=${cityName}`
      );

      setWeatherData(response.data);
      setDaily(response.data.daily);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Get graph data
  const getGraphData = async () => {
    try {
      const cityName = city?.trim() || "pune"; // Use city, fallback to userCity, or default to "pune"
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

  //Changes made by Rutvik

  // === GET CURRENT WEATHER BY COORDINATES ===
  const getWeatherDataByCoords = async (latitude, longitude) => {
    try {
      if (!latitude || !longitude) {
        throw new Error("Invalid latitude or longitude");
      }

      console.log(
        "Fetching weather data for coordinates:",
        latitude,
        longitude
      );

      const response = await axios.get(
        `http://localhost:5280/api/weather/current?latitude=${latitude}&longitude=${longitude}`
      );

      setWeatherData(response.data);
      setDaily(response.data.daily);
    } catch (error) {
      console.error(
        "Error fetching current weather by coordinates:",
        error.message
      );
    }
  };

  // === GET HOURLY GRAPH DATA BY COORDINATES ===
  const getGraphDataByCoords = async (latitude, longitude) => {
    try {
      if (!latitude || !longitude) {
        throw new Error("Invalid latitude or longitude");
      }

      console.log("Fetching graph data for coordinates:", latitude, longitude);

      const apiData = await axios.get(
        `http://localhost:5280/api/weather/hourly?latitude=${latitude}&longitude=${longitude}`
      );

      const formatted = apiData.data.map((item) => ({
        name: item.time,
        temp: item.temperature,
      }));

      setGraphData(formatted);
    } catch (err) {
      console.error(
        "Error fetching hourly graph data by coordinates:",
        err.message
      );
    }
  };

  //Changes made by Rutvik

  // Use Effect
  useEffect(() => {
    getWeatherData();
    getGraphData();
  }, [city]); // Re-run when city or userCity changes

  return (
    <DataContext.Provider
      value={{
        weatherData,
        graphData,
        city,
        daily, // Expose getWeatherData
        setCity, // Expose city and setCity
        getWeatherData,
        getGraphDataByCoords,
        getWeatherDataByCoords,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
