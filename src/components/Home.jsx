import React, { useEffect, useState } from "react";
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
import { useData } from "../context/weatherContext";

import Map from "./Map";
import StatCard from "./StatCard";
import TempGraph from "./TempGraph";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import WeeklyCard from "./WeeklyCard";

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);

  const [mapView, setMapView] = useState(false);
  const [message, setMessage] = useState(""); // State to store the message
  const [tempCity, setTempCity] = useState(""); // State to store the message
  const [showMessage, setShowMessage] = useState(false); // State to control visibility
  const [loading, setLoading] = useState(false); // State to track loading status

  const {
    weatherData,
    setCity,
    getWeatherData,
    cityNotFound,
    getGraphData,
    setCityNotFound,
  } = useData(); // Using context to manage data
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!tempCity.trim()) return; // Prevent empty search

    setLoading(true);
    setCity(tempCity); // This updates state for global usage

    // Reset cityNotFound to false before searching
    setCityNotFound(false);

    // Fetch weather and graph data based on the search
    await getWeatherData(tempCity);
    await getGraphData(tempCity);

    setTempCity(""); // Clear input
    setLoading(false);

    // We will set the message here in the useEffect when cityNotFound changes
  };

  const [name, setName] = useState("user");
  useEffect(() => {
    const fetchWeatherDataAndUser = async () => {
      setLoading(true);

      // Handle the case where the city is not found
      if (cityNotFound) {
        setShowMessage(true);
        setMessage("City not found. Please try again.");

        // Hide message after 1 second
        setTimeout(() => {
          setShowMessage(false);
        }, 1000);
      }

      // Fetch user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        const firstName = storedUser.name.split(" ")[0];
        const formattedName =
          firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        setName(formattedName);

        // Set the city from the stored user before fetching weather
        if (storedUser.city) {
          setCity(storedUser.city);
        }
      }

      // Fetch weather data with the current city (either from user or default)
      await getWeatherData();
      await getGraphData();
      setLoading(false);
    };

    fetchWeatherDataAndUser();
  }, [cityNotFound, setCity]);
  // Message Handler
  const handleButtonClick = () => {
    // Set the message and show it
    setMessage(weatherData.friendlySuggestion);
    setShowMessage(true);
    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const changeToMapView = () => {
    setLoading(true); // Set loading to true when changing view
    setMapView(!mapView);
    setLoading(false); // Set loading to false after changing view
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

  const loginHandler = () => {
    setLoading(true); // Set loading to true when navigating to login
    // Navigate to the login page
    navigate("/login");
    setLoading(false); // Set loading to false after navigation
  };

  const logoutHandler = async () => {
    setLoading(true); 
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setName("user");
    setTempCity("");
    setCity("pune");
    await getWeatherData();
    setLoading(false); 
    console.log("User logged out and token removed.");
  };

  //Changes made by Rutvik
  const { getWeatherDataByCoords, getGraphDataByCoords } = useData();

  const getLiveLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log(
            `Live Coords: ${latitude.toFixed(6)}, ${longitude.toFixed(
              6
            )} (±${accuracy}m)`
          );

          // Use these live coordinates
          getWeatherDataByCoords(latitude, longitude);
          getGraphDataByCoords(latitude, longitude);
          setTimeout(() => setLoading(false), 500);
        },
        (error) => {
          setLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("Permission denied. Please allow location access.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Position unavailable. Try again later.");
              break;
            case error.TIMEOUT:
              console.error("Location request timed out.");
              break;
            default:
              console.error("Geolocation error:", error.message);
          }
        },
        options
      );
    } else {
      setLoading(false);
      console.error("Geolocation not supported by this browser.");
    }
  };
  //Changes made by Rutvik
  // handele propile navigation
  const handleProfile = () => {
    setLoading(true);
    {
      localStorage.getItem("token") ? navigate("/profile") : navigate("/login");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Spinner overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-col md:flex-row bg-[#f1f5f9]">
        {/* Left Side Main Content */}
        <div className="w-full md:w-[92%] h-auto md:h-[100vh] flex flex-col gap-4 p-4">
          {/* Weather Card */}
          <div className="w-full mx-auto h-[270px] mt-2 relative shadow-md rounded-md overflow-hidden sm:h-[200px] md:h-[270px]">
            <img
              className="w-full h-full object-cover"
              src={getBackgroundImage()}
              alt="weather"
            />

            <div className="absolute bg-[#ffffff94] opacity-85 rounded-md bottom-5 left-[18px] w-[90%] h-[40%]  flex flex-col justify-center text-black sm:w-[80%] sm:h-[30%] sm:left-4 sm:bottom-3 md:w-[30%] md:h-[48%] md:left-6">
              <div>
                <h1 className="text-5xl leading-tight sm:text-4xl sm:leading-tight md:text-7xl pl-2">
                  {weatherData.temperature}°C
                </h1>
              </div>
              <div>
                <h1 className="text-sm pl-3">
                  Feels like {weatherData.feelsLike}°C
                </h1>
              </div>
              <div>
                <h1 className="text-lg sm:text-base md:text-xl pl-3">
                  {weatherData.city
                    ? weatherData.city.charAt(0).toUpperCase() +
                      weatherData.city.slice(1)
                    : "Loading..."}{" "}
                  , {weatherData.country}
                </h1>
              </div>
            </div>

            {/* Time and Description */}
            <div
              className="absolute bottom-[50px] sm:bottom-5 right-[30px] w-[40%] h-[25%] flex flex-col text-black
  sm:w-[80%]  sm:right-4 sm:h-auto sm:items-end md:w-[40%] md:h-[25%]"
            >
              <div>
                <h1 className="text-xl text-end font-bold sm:text-lg md:text-xl">
                  {weatherData.time}
                </h1>
              </div>
              <div className="text-end h-10 flex justify-end text-wrap ">
                <h1 className="text-sm pl-1  sm:text-end font-semibold sm:text-lg md:text-xl">
                  {weatherData.weatherDescription
                    ? weatherData.weatherDescription.charAt(0).toUpperCase() +
                      weatherData.weatherDescription.slice(1)
                    : "Loading..."}
                  , {weatherData.weekDay}
                </h1>
              </div>
            </div>

            {/* Message */}
            <div className="absolute top-[60px] md:top-2 right-[20px] w-[90%] h-[25%] flex flex-col text-black sm:w-[80%] sm:right-4 sm:top-4 md:w-[35%] md:right-[320px]">
              <div className="flex flex-col items-center justify-center h-auto">
                {showMessage && (
                  <div className="mt-4 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md shadow-md">
                    {message}
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="absolute text-end top-8 right-[10px] w-[90%] h-[12%] flex gap-2 text-black opacity-95 sm:w-[80%] sm:right-4 sm:top-4 md:w-[15%] md:right-[20px]">
              <div className="flex gap-1 w-full">
                <input
                  type="text"
                  value={tempCity}
                  className="w-full h-[35px] pl-3 rounded-md text-sm sm:h-[30px] md:h-[35px]"
                  placeholder="Search city"
                  onChange={(e) => setTempCity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <h1
                  className="text-2xl cursor-pointer sm:text-xl md:text-2xl"
                  onClick={handleSearch}
                ></h1>
              </div>
            </div>
          </div>

          {/* Stats and Graph Section */}
          <div className="flex flex-col md:flex-row w-full mx-auto h-auto md:h-[255px] justify-between gap-4">
            <StatCard />
            {/* Sun Details */}
            <div className=" w-full md:w-[13%] p-3 h-[265px] flex flex-col items-center justify-center gap-2 ">
              <div className="w-[40%] sm:w-full h-[50%] flex flex-col items-center justify-center rounded-full shadow-xl bg-white">
                <img className="w-[35px] h-[35px]" src={rise} alt="" />
                <span className="text-sm">Sunrise</span>
                <span className="text-sm font-semibold">
                  {weatherData.sunrise}
                </span>
              </div>
              <div className="bg-white w-[40%] sm:w-full h-[50%] flex flex-col items-center justify-center rounded-full shadow-xl">
                <img className="w-[35px] h-[35px]" src={set} alt="" />
                <span className="text-sm">Sunset</span>
                <span className="text-sm font-semibold">
                  {weatherData.sunset}
                </span>
              </div>
            </div>

            {/* Graph / Map Section */}
            <div className="shadow-xl w-full md:w-[35%] bg-white flex flex-col items-center rounded-md ">
              {mapView ? (
                <Map location={getLocation()} />
              ) : (
                <>
                  <TempGraph />
                  <span className="text-sm pl-5 pb-2 ">
                    Hourly Temperature Bar Graph
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Side bar  */}
        {/* Sidebar */}
        <div className=" w-full md:w-[8%] h-auto md:h-[100vh] md:flex items-center justify-center mt-4 md:mt-0 hidden">
          <div className="w-full md:w-[100%]  h-auto md:h-[92vh] flex flex-col bg-white rounded-md shadow-xl justify-start items-center p-2 gap-2 bg-gradient-to-r from-purple-400 to-blue-400">
            <div
              onClick={handleProfile}
              className="flex items-center justify-center flex-col mt-2"
            >
              <img
                className="w-[40px] h-[40px] object-cover rounded-full border-4 border-white shadow-xl"
                src={profile}
                alt=""
              />
              <span className="text-sm text-white font-semibold">{name}</span>
            </div>

            <div className="h-[350px] mt-[30px] flex flex-col items-center justify-start gap-3  overflow-y-auto pt-4 ">
              <li className="list-none flex items-center justify-center rounded-xl text-sm w-[80px] h-[25px] shadow-xl text-black font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 bg-white">
                Home
              </li>

              {mapView ? (
                <li
                  onClick={changeToMapView}
                  className="list-none flex items-center justify-center rounded-xl text-sm w-[80px] h-[25px] shadow-xl text-black font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 bg-white"
                >
                  Graph
                </li>
              ) : (
                <li
                  onClick={changeToMapView}
                  className="list-none flex items-center justify-center rounded-xl text-sm w-[80px] h-[25px] shadow-xl text-black font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 bg-white"
                >
                  Map
                </li>
              )}
              <Link to={"/news"}>
                <li className="list-none flex items-center justify-center rounded-xl text-sm w-[80px] h-[25px] shadow-xl text-black font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 bg-white">
                  News
                </li>
              </Link>
              <li
                onClick={handleButtonClick}
                className="list-none flex items-center justify-center rounded-xl text-sm w-[80px] h-[25px] shadow-xl text-black font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 bg-white"
              >
                Message
              </li>
              <li
                onClick={getLiveLocation}
                className="list-none flex items-center justify-center rounded-xl text-sm w-[80px] h-[25px] shadow-xl text-black font-semibold cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 bg-white"
              >
                Live
              </li>
            </div>

            {/* Dark/Light Mode Button */}
            <div className="h-[30px] flex items-center">
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

            {/* Login/Logout */}
            <div className="h-[30px] flex items-center">
              {localStorage.getItem("token") ? (
                <li
                  onClick={logoutHandler}
                  className="list-none flex items-center justify-center rounded-xl text-sm w-[80px] h-[25px] bg-white text-black shadow-xl font-semibold cursor-pointer"
                >
                  Logout
                </li>
              ) : (
                <li
                  onClick={loginHandler}
                  className="list-none flex items-center justify-center rounded-xl text-sm w-[80px] h-[25px] bg-white text-black shadow-xl font-semibold cursor-pointer"
                >
                  Login
                </li>
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-400 to-blue-400 z-50 shadow-lg md:hidden">
          <div className="flex justify-around items-center h-[60px]">
            <button
              className="flex flex-col items-center text-white"
              onClick={() => navigate("/profile")}
            >
              <span className="text-xl">🙎</span>
              <span className="text-xs">{name}</span>
            </button>
            <button
              className="flex flex-col items-center text-white"
              onClick={changeToMapView}
            >
              <span className="text-xl">🗺️</span>
              <span className="text-xs">Map</span>
            </button>
            <button
              className="flex flex-col items-center text-white"
              onClick={handleButtonClick}
            >
              <span className="text-xl">✉️</span>
              <span className="text-xs">Message</span>
            </button>
            <button
            onClick={() => navigate("/news")}
              className="flex flex-col items-center text-white"
            >
              <span className="text-xl">📰</span>
              <span className="text-xs">News</span>
            </button>
            <button
              className="flex flex-col items-center text-white"
              onClick={getLiveLocation}
            >
              <span className="text-xl">📍</span>
              <span className="text-xs">Live</span>
            </button>
            <button className="flex flex-col items-center text-white">
              <span className="text-xl">👤</span>
              {localStorage.getItem("token") ? (
                <span onClick={logoutHandler} className="text-xs">
                  Logout
                </span>
              ) : (
                <span onClick={loginHandler} className="text-xs">
                  Login
                </span>
              )}
            </button>
          </div>
        </div>
        {/* end side bar */}
      </div>
      <WeeklyCard currentDay={weatherData.weekDay} />
    </>
  );
};

export default Home;
