import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const getNews = async () => {
    const response = await axios.get("http://localhost:5280/api/weathernews");
    setNews(response.data.articles);
    console.log(response.data.articles);
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      <div className="p-4 mt-5 flex justify-center sm:justify-start">
        <Link to="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 bg-gradient-to-r from-purple-500 to-blue-400">
            Back to Dashboard
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center flex-wrap p-4 gap-4 ">
        {news.map((item, index) => (
          <>
            <div className="w-[350px] h-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col">
              {/* News Image */}
              <img
                src={item.urlToImage || "https://via.placeholder.com/350x200"} // Fallback to placeholder image
                alt="News"
                className="w-full h-48 object-cover"
              />

              {/* Title and Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                  {item.title || "No Title Available"}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {item.description ||
                    "No description available for this news."}
                </p>
              </div>

              {/* Date and Author */}
              <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-500 border-t border-gray-200 ">
                <span className="truncate">
                  {item.publishedAt || "Unknown Date"}
                </span>
                <span className="font-medium truncate">
                  {item.author || "Unknown Author"}
                </span>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default News;
