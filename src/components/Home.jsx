import React, { useEffect, useState } from "react";
import CloudyImage from "../public/CloudyImage.avif";
import rainImage from "../public/rainImage.jpg";
import SnowImage from "../public/SnowImage.jpg";
import SunnyImg from "../public/SunnyImg.jpg";
import eyecare from "../public/eyecare.png";
import NightImage from "../public/NightImage.avif";
import wind from "../public/wind.png";
import protection from "../public/protection.png";
import pressure from "../public/pressure.png";
import clouds from "../public/clouds.png";
import weather from "../public/weather.png";
import rise from "../public/sunRise.png";
import set from "../public/sunSet.png";
import sun from "../public/sun.png";
import moon from "../public/moon.png";
import profile from "../public/profile.png";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Home = () => {
  const [graphData, setGraphData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  // Graph Data Api

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

  // Graph Data

  console.log(city);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5280/api/weather/current?city=pune"
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  const getCityName = async () => {
    if (!city.trim()) return;
    try {
      const response = await axios.get(
        `http://localhost:5280/api/weather/current?city=${city}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Failed to fetch city weather:", error);
    }
  };

  // UseEffect to fetch data on component mount

  useEffect(() => {
    getWeatherData();
    getGraphData();
  }, [city]);

  // Change the Background

  const getBackgroundImage = () => {
    const desc = weatherData.weatherDescription?.toLowerCase() || "";
    if (darkMode) {
      if (desc.includes("cloud")) return CloudyImage;
      if (
        desc.includes("rain") ||
        desc.includes("drizzle") ||
        desc.includes("thunder")
      )
        return rainImage;
      if (desc.includes("snow")) return SnowImage;
      if (desc.includes("clear") || desc.includes("sun")) return SunnyImg;
      return SunnyImg;
    } else {
      return NightImage;
    }
  };

  return (
    <>
      <div className={darkMode ? " " : "dark"}>
        <div className="flex bg-white dark:bg-[#0d0d0d] pr-4">
          <div className="w-[92%] h-[100vh] flex flex-col gap-4 p-4 ">
            <div className="w-full mx-auto h-[270px] mt-2 relative shadow-md rounded-md overflow-hidden">
              {/* Background Image */}
              <img
                className="w-full h-full object-cover"
                src={getBackgroundImage()}
                alt="weather"
              />

              <div className="absolute bg-[#ffffff94] opacity-85 rounded-md  bottom-5 left-[30px] w-[25%] h-[50%] flex flex-col text-black">
                <div>
                  <h1 className="text-8xl">{weatherData.temperature}°</h1>
                </div>
                <div>
                  <h1 className="text-xl pl-1">
                    {weatherData.city
                      ? weatherData.city.charAt(0).toUpperCase() +
                        weatherData.city.slice(1)
                      : "Loading..."}{" "}
                    , {weatherData.country}
                  </h1>
                </div>
              </div>

              <div className="absolute  bottom-5 right-[20px] w-[40%] h-[25%] flex flex-col text-black">
                <div>
                  <h1 className="text-xl text-end font-bold">
                    {weatherData.time}
                  </h1>
                </div>
                <div>
                  <h1 className="text-xl pl-1 text-end">
                    {weatherData.weatherDescription
                      ? weatherData.weatherDescription.charAt(0).toUpperCase() +
                        weatherData.weatherDescription.slice(1)
                      : "Loading..."}{" "}
                    , {weatherData.weekDay}
                  </h1>
                </div>
              </div>

              {/* Search Bar */}
              <div className="absolute  text-end top-8 right-[20px] w-[15%] h-[12%] flex flex-col text-black  opacity-95">
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={city}
                    className="w-full h-[35px] pl-3 rounded-md "
                    placeholder="Search city"
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        getCityName();
                      }
                    }}
                  />
                  <h1 className="text-2xl cursor-pointer" onClick={getCityName}>
                    🔍
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex w-[100%] mx-auto h-[255px]  justify-between gap-1">
              <div className="w-[49%] flex flex-wrap items-center  gap-3 pt-4 pb-4">
                <div className="bg-white rounded-md shadow-xl w-[175px] h-[106px] flex flex-col justify-center px-4 py-2 transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="text-lg">
                      <img className=" w-[25px]" src={wind} alt="eyecare" />
                    </span>
                    <span>Wind-Speed</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">
                    {weatherData.windSpeed}
                  </div>
                </div>
                <div className="bg-white rounded-md shadow-xl w-[175px] h-[106px] flex flex-col justify-center px-4 py-2  transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="text-lg">
                      <img className=" w-[25px]" src={weather} alt="eyecare" />
                    </span>
                    <span>Humidity</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">
                    {weatherData.humidity}
                  </div>
                </div>
                <div className="bg-white rounded-md shadow-xl w-[175px] h-[106px] flex flex-col justify-center px-4 py-2 transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="text-lg">
                      <img className=" w-[25px]" src={pressure} alt="eyecare" />
                    </span>
                    <span>Pressure</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">
                    {weatherData.pressure}
                  </div>
                </div>
                <div className="bg-white rounded-md shadow-xl w-[175px] h-[106px] flex flex-col justify-center px-4 py-2 transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="text-lg">
                      <img className=" w-[25px]" src={clouds} alt="eyecare" />
                    </span>
                    <span>Cloud-cover</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">
                    {weatherData.cloudCover}
                  </div>
                </div>
                <div className="bg-white rounded-md shadow-xl w-[175px] h-[106px] flex flex-col justify-center px-4 py-2 transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="text-lg">
                      <img className=" w-[25px]" src={eyecare} alt="eyecare" />
                    </span>
                    <span>Visibility</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">
                    {weatherData.visibility}
                  </div>
                </div>
                <div className="bg-white rounded-md shadow-xl w-[175px] h-[106px] flex flex-col justify-center px-4 py-2 transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="text-lg">
                      <img
                        className="w-[25px]"
                        src={protection}
                        alt="eyecare"
                      />
                    </span>
                    <span>UV-Index</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">
                    {weatherData.uvIndex}
                  </div>
                </div>
              </div>

              {/* Sun Details */}
              <div className="w-[12%] p-2 h-[255px]  flex flex-col items-center justify-center gap-2">
                <div className=" w-full h-[50%] flex flex-col items-center justify-center rounded-full shadow-xl bg-white">
                  <img className="w-[40px] h-[40px]" src={rise} alt="" />
                  <span className="text-sm">Sunrise</span>
                  <span className="text-sm font-semibold">6:45 am</span>
                </div>
                <div className="bg-white w-full h-[50%] flex flex-col items-center justify-center rounded-full shadow-xl">
                  <img className="w-[40px] h-[40px]" src={set} alt="" />
                  <span className="text-sm">Sunset</span>
                  <span className="text-sm font-semibold">7:45 pm</span>
                </div>
              </div>

              {/* Graph According to the Timing */}

              <div className="shadow-xl w-[35%] bg-white  flex  flex-col items-center rounded-md pt-2 ">
                <ResponsiveContainer width="90%" height={220}>
                  <BarChart data={graphData}>
                    <defs>
                      <linearGradient
                        id="colorTemp"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />{" "}
                        {/* Red for higher temperatures */}
                        <stop
                          offset="50%"
                          stopColor="#fef08a"
                          stopOpacity={1}
                        />{" "}
                        {/* Yellow for moderate temperatures */}
                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity={1}
                        />{" "}
                        {/* Blue for cooler temperatures */}
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#ccc" strokeDasharray="6 6" />
                    <XAxis dataKey="name" />
                    <YAxis unit="°C" />
                    <Tooltip formatter={(value) => `${value}°C`} />
                    <Bar
                      dataKey="temp"
                      fill="url(#colorTemp)" // Use the gradient defined above
                      barSize={26} // Adjust the bar size
                    />
                  </BarChart>
                </ResponsiveContainer>
                <span className="text-sm pl-5 ">
                  Hourly Temperature Bar Graph
                </span>
              </div>
            </div>
          </div>
          <div className="w-[8%] h-[100vh]  flex items-center justify-center ">
            <div className="w-[95%] h-[92vh]  flex flex-col bg-white rounded-md shadow-xl justify-start items-center p-2 gap-2">
              <div className="flex items-center justify-center flex-col">
                <img
                  className="w-[35px] h-[35px] object-cover rounded-full"
                  src={profile}
                  alt=""
                />
                <span className="text-sm">Piyush</span>
              </div>
              <div className="h-[350px] mt-[40px]  flex flex-col items-center justify-start gap-2 w-full overflow-y-auto">
                <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer">
                  Login
                </li>
                <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer">
                  Login
                </li>
                <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer">
                  Login
                </li>
                <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer">
                  Login
                </li>
                <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer">
                  Login
                </li>
              </div>
              <div className=" h-[30px] flex items-center ">
                {darkMode ? (
                  <button title="Dark/Light Mode Toggle">
                    <img
                      onClick={handleDarkMode}
                      className="w-[35px] h-[35px] object-cover rounded-full"
                      src={moon}
                      alt=""
                    />
                  </button>
                ) : (
                  <button title="Dark/Light Mode Toggle">
                    <img
                      onClick={handleDarkMode}
                      className="w-[35px] h-[35px] object-cover rounded-full"
                      src={sun}
                      alt=""
                    />
                  </button>
                )}
              </div>
              <div className=" h-[30px] flex items-center ">
                <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer">
                  Login
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
