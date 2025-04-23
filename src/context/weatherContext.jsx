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
 
  const [city, setCity] = useState(null);

 

  // Get weather data
  const getWeatherData = async () => {
    try {
      const cityName = city?.trim()  || "pune"; // Use city, fallback to userCity, or default to "pune"
      const response = await axios.get(
        `http://localhost:5280/api/weather/current?city=${cityName}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Get graph data
  const getGraphData = async () => {
    try {
      const cityName = city?.trim()  || "pune"; // Use city, fallback to userCity, or default to "pune"
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
        setCity, // Expose city and setCity
        getWeatherData, // Expose getWeatherData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};