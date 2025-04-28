import React, { use } from "react";
import { useData } from "../context/weatherContext";

const WeeklyCard = ({ currentDay }) => {
  // const daily = [
  //   { day: "Mon", max: 40.7, min: 23.9 },
  //   { day: "Tue", max: 40.8, min: 24.2 },
  //   { day: "Wed", max: 39.9, min: 25.3 },
  //   { day: "Thu", max: 40, min: 25.3 },
  //   { day: "Fri", max: 40.8, min: 26.1 },
  //   { day: "Sat", max: 39.4, min: 26.2 },
  //   { day: "Sun", max: 37.8, min: 23.9 },
  // ];
  const { daily } = useData();


  const normalizedDay = currentDay ? currentDay.slice(0, 3) : " ";
 
  return (
    <>
      <div className="w-full p-4">
        <div className="w-full bg-white dark:bg-[#1c1c1c] p-4 rounded-md flex flex-wrap items-center justify-center gap-7">
          {daily.map((dayData, index) => (
            <div
              key={index}
              className={`flex flex-col items-center w-[150px] h-[120px] sm:w-[120px] sm:h-[100px] p-2 rounded-md shadow-xl ${
                dayData.day === normalizedDay
                  ? "bg-gradient-to-b from-yellow-400 to-yellow-200 dark:from-yellow-600 dark:to-yellow-400"
                  : "bg-gradient-to-b from-blue-300 to-blue-100 dark:from-blue-700 dark:to-blue-500"
              }`}
            >
              <span className="text-md font-semibold">{dayData.day}</span>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                Max: {dayData.max}°C
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                Min: {dayData.min}°C
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeeklyCard;
