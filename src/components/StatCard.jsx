import React from "react";
import eyecare from "../public/eyecare.png";
import wind from "../public/wind.png";
import protection from "../public/protection.png";
import pressure from "../public/pressure.png";
import clouds from "../public/clouds.png";
import weather from "../public/weather.png";
import { useData } from "../context/weatherContext";

const StatCard = () => {
  const { weatherData } = useData();

  const cards = [
    {
      label: "Wind-Speed",
      icon: wind,
      value: weatherData.windSpeed,
    },
    {
      label: "Humidity",
      icon: weather,
      value: weatherData.humidity,
    },
    {
      label: "Pressure",
      icon: pressure,
      value: weatherData.pressure,
    },
    {
      label: "Cloud-cover",
      icon: clouds,
      value: weatherData.cloudCover,
    },
    {
      label: "Visibility",
      icon: eyecare,
      value: weatherData.visibility,
    },
    {
      label: "UV-Index",
      icon: protection,
      value: weatherData.uvIndex,
    },
  ];

  return (
    <>
      <div className="w-[50%] flex flex-wrap items-center gap-3 pt-4 pb-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-xl w-[175px] h-[106px] flex flex-col justify-center px-4 py-2 transform transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="text-gray-600 text-sm flex items-center gap-2">
              <span className="text-lg">
                <img className="w-[25px]" src={card.icon} alt={card.label} />
              </span>
              <span>{card.label}</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900 mt-1">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatCard;
