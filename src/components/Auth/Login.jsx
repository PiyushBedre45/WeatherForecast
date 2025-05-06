import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../../context/weatherContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State to track error messages
  const navigate = useNavigate();
  const { getWeatherData } = useData();
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when login starts
    setError(""); // Clear any previous error messages
    try {
      localStorage.clear(); // Clear local storage before login
      const response = await axios.post(
        "http://localhost:5280/api/auth/login",
        formData
      );

      if (response.status === 200) {
        const { token } = response.data;
        console.log("Login successful. JWT Token:", token);

        // Store token
        localStorage.setItem("token", token);

        // Set default header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch user data using the token
        const userResponse = await axios.get(
          "http://localhost:5280/api/user/currentuser"
        );

        if (userResponse.status === 200) {
          const userData = userResponse.data;
          console.log("User data:", userData);

          // Store user data in local storage
          localStorage.setItem("user", JSON.stringify(userData));
        }

        // Navigate to homepage or dashboard
        navigate("/home");
      }
    } catch (error) {
      // Set error message if login fails
      setError(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false); // Set loading to false when login completes
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center relative">
      {/* Spinner overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-full">
        <img
          className="w-full h-[100vh] object-cover opacity-90"
          src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="shadow-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] h-[450px] flex items-center justify-center rounded-md absolute bg-[#ffffff72]">
        <div className="w-[95%] h-[90%] flex justify-center items-center flex-col gap-4">
          <div className="w-[95%] text-lg sm:text-xl">
            <h1>Enter your email to join us</h1>
          </div>
          <div className="w-[95%]">
            <label className="text-sm">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
            />
          </div>
          <div className="w-[95%]">
            <label className="text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
            />
          </div>
          {error && (
            <div className="w-[95%]">
              <p className="text-red-500 text-xs">{error}</p>
            </div>
          )}
          <div className="w-[95%] h-[30px] mt-2 rounded-sm bg-[#25aadb]">
            <button
              onClick={handleLogin}
              className="text-center text-sm w-full"
            >
              Submit
            </button>
          </div>

          <div className="w-[95%] h-[70px] flex flex-col  items-center text-sm mt-[20px] gap-2">
            
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-[#0000f7]">Register</span>
              </Link>
            </p>
            <p className="mt-2 sm:mt-0 sm:ml-2">
              Sign-up for{" "}
              <Link to="/home">
                <span className="text-[#0000f7]">Free</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
