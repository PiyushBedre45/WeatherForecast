import React, { useEffect, useState } from "react";
import CloudyImage from "../public/CloudyImage.avif";
import RainyImage from "../public/RainyImg.jpg";
import rainImage from "../public/rainImage.jpg";
import SnowImage from "../public/SnowImage.jpg";
import SunnyImg from "../public/SunnyImg.jpg";
import eyecare from "../public/eyecare.png";
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
} from "recharts";

const Home = () => {
  // Graph Data

  const data = [
    { name: "9 AM", temp: 21 },
    { name: "12 PM", temp: 26 },
    { name: "3 PM", temp: 28 },
    { name: "6 PM", temp: 24 },
    { name: "9 PM", temp: 20 },
  ];

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  console.log(city);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5100/api/weather/current?city=pune"
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
        `http://localhost:5100/api/weather/current?city=${city}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Failed to fetch city weather:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  // Change the Background

  const getBackgroundImage = () => {
    const desc = weatherData.weatherDescription?.toLowerCase() || "";
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
                    , {weatherData.weekday}
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
                  <spam className="text-sm">Sunrise</spam>
                  <spam className="text-sm font-semibold">6:45 am</spam>
                </div>
                <div className="bg-white w-full h-[50%] flex flex-col items-center justify-center rounded-full shadow-xl">
                  <img className="w-[40px] h-[40px]" src={set} alt="" />
                  <spam className="text-sm">Sunset</spam>
                  <spam className="text-sm font-semibold">7:45 pm</spam>
                </div>
              </div>

              {/* Graph According to the Timing */}

              <div className="shadow-xl w-[35%] bg-white  flex items-center rounded-md pt-2 ">
                <ResponsiveContainer width="90%" height="90%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="°C" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
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
              <div className="border border-black h-[380px]">
                <li className="list-none text-center rounded-md w-[70px] border border-black">
                  Home
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
                <li className="list-none text-center rounded-md w-[70px] border border-black">
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
