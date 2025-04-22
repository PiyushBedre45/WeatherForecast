import React, { useState } from "react";
import CloudyImage from "../public/CloudyImage.avif";
import rainImage from "../public/rainImage.jpg";
import SnowImage from "../public/SnowImage.jpg";
import SunnyImg from "../public/SunnyImg.jpg";
import NightImage from "../public/NightImage.avif";
import rise from "../public/sunRise.png";
import set from "../public/sunSet.png";
import sun from "../public/sun.png";
import moon from "../public/moon.png";
import profile from "../public/profile.png";
import axios from "axios";
import { useData } from "../context/weatherContext";

import Map from "./Map";
import StatCard from "./StatCard";
import TempGraph from "./TempGraph";

const Home = () => {
  
  const [darkMode, setDarkMode] = useState(true);
  const [mapView, setMapView] = useState(false);
  const [message, setMessage] = useState(""); // State to store the message
  const [showMessage, setShowMessage] = useState(false); // State to control visibility

  
  const { weatherData, city, setCity, getWeatherData } = useData();// Using context to manage data
 
  // Message Handler
  const handleButtonClick = () => {
    // Set the message and show it
    setMessage("It's sunny! Don't forget sunscreen. 🌞🧴");
    setShowMessage(true);
    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  
  const changeToMapView = () => {
    setMapView(!mapView);
  };
  // Handling Map View
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  };


  const getLocation = () => {
    if (!weatherData.longitude || !weatherData.latitude) {
      console.error("Location data is missing.");
      return { longitude: 73.8567, latitude: 18.5204 };
    }
    return { longitude: weatherData.longitude, latitude: weatherData.latitude };
  };

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
      <div className="flex bg-white dark:bg-[#0d0d0d] pr-4">
        <div className="w-[92%] h-[100vh] flex flex-col gap-4 p-4 ">
          <div className="w-full mx-auto h-[270px] mt-2 relative shadow-md rounded-md overflow-hidden">
            {/* Background Image */}
            <div className="bg-black w-full mx-auto h-[270px] absolute opacity-15"></div>
            <img
              className="w-full h-full object-cover"
              src={getBackgroundImage()}
              alt="weather"
            />

            <div className="absolute bg-[#ffffff94] opacity-85 rounded-md  bottom-5 left-[30px] w-[27%] h-[50%] flex flex-col text-black">
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

            {/* time and description */}
            <div className="absolute  bottom-5 right-[20px] w-[40%] h-[25%] flex flex-col text-black">
              <div>
                <h1 className="text-xl text-end font-bold">
                  {weatherData.time}
                </h1>
              </div>
              <div>
                <h1 className="text-xl pl-1 text-end font-semibold">
                  {weatherData.weatherDescription
                    ? weatherData.weatherDescription.charAt(0).toUpperCase() +
                      weatherData.weatherDescription.slice(1)
                    : "Loading..."}{" "}
                  , {weatherData.weekDay}
                </h1>
              </div>
            </div>

            {/* message */}
            <div className="absolute  top-2 right-[320px] w-[30%] h-[25%] flex flex-col text-black">
              {/* Message  */}
              <div className="flex flex-col items-center justify-center h-screen">
                {/* Message Component */}
                {showMessage && (
                  <div className="mt-4 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md shadow-md">
                    {message}
                  </div>
                )}
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
                      getWeatherData();
                    }
                  }}
                />
                <h1 className="text-2xl cursor-pointer" onClick={getWeatherData}>
                  🔍
                </h1>
              </div>
            </div>
          </div>

          <div className="flex w-[100%] mx-auto h-[255px]  justify-between gap-1">     
              <StatCard/>
            {/* Sun Details */}
            <div className="w-[12%] p-2 h-[255px]  flex flex-col items-center justify-center gap-2">
              <div className=" w-full h-[50%] flex flex-col items-center justify-center rounded-full shadow-xl bg-white">
                <img className="w-[40px] h-[40px]" src={rise} alt="" />
                <span className="text-sm">Sunrise</span>
                <span className="text-sm font-semibold">
                  {weatherData.sunrise}
                </span>
              </div>
              <div className="bg-white w-full h-[50%] flex flex-col items-center justify-center rounded-full shadow-xl">
                <img className="w-[40px] h-[40px]" src={set} alt="" />
                <span className="text-sm">Sunset</span>
                <span className="text-sm font-semibold">
                  {weatherData.sunset}
                </span>
              </div>
            </div>


            <div className="shadow-xl w-[35%] bg-white  flex  flex-col items-center rounded-md ">
              {mapView ? (
                <Map location={getLocation()} />
              ) : (
                <>
                 <TempGraph/>
                  <span className="text-sm pl-5  ">
                    Hourly Temperature Bar Graph
                  </span>
                </>
              )}
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
            <div className="h-[350px] mt-[30px]  flex flex-col items-center justify-start gap-3 w-full overflow-y-auto pt-4">
              <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
                Home
              </li>
              <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
                About
              </li>
              {mapView ? (
                <li
                  onClick={changeToMapView}
                  className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
                >
                  Graph
                </li>
              ) : (
                <li
                  onClick={changeToMapView}
                  className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
                >
                  Map
                </li>
              )}

              <li className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
                News
              </li>
              <li
                onClick={handleButtonClick}
                className="list-none flex items-center justify-center rounded-sm text-sm w-[70px] h-[25px] bg-gradient-to-r from-purple-500 to-blue-400 shadow-xl text-white font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
              >
                Message
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
    </>
  );
};

export default Home;
