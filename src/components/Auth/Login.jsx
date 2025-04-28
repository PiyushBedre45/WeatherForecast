import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../../context/weatherContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State to track error messages
  const navigate = useNavigate();
  const { getWeatherData } = useData();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleLogin = async () => {
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
          "http://localhost:5280/api/User/me"
        );

        if (userResponse.status === 200) {
          const userData = userResponse.data;
          console.log("User data:", userData);

          // Store user data in local storage
          localStorage.setItem("user", JSON.stringify(userData));
        }

        // Navigate to homepage or dashboard
        getWeatherData();
        navigate("/");
      }
    } catch (error) {
      // Set error message if login fails
      setError(
        error.response?.data?.message || "Invalid email or password. Please try again."
      );
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center relative">
      <div className="shadow-xl w-[30%] h-[450px] flex items-center justify-center rounded-md absolute bg-[#ffffff72]">
        <div className="w-[95%] h-[90%] flex justify-center items-center flex-col gap-4">
          <div className="w-[95%] text-xl">
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

          <div className="w-[95%] h-[70px] flex bottom-1 items-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-[#0000f7]">Register</span>
              </Link>
            </p>
            <p>
              Sign-up for{" "}
              <Link to="/">
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