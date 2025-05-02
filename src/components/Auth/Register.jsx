import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    country: "",
    phone: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error for the field being updated
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Name validation
    if (formData.name.length < 2) {
      newErrors.name = "Name should be at least 2 characters long.";
    }

    // Password validation
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password should be at least 6 characters long and include at least one letter, one number, and one special character.";
    }

    // Postal code validation
    const postalCodePattern = /^\d{6}$/; // Regular expression for 6-digit postal code
    if (!postalCodePattern.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code should be exactly 6 digits.";
    }

    // If there are errors, update the state and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5280/api/auth/register",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        // Clear form
        setFormData({
          name: "",
          email: "",
          password: "",
          city: "",
          country: "",
          phone: "",
          postalCode: "",
        });
        // Redirect to login
        navigate("/login");
      }
    } catch (error) {
      // Handle backend error for duplicate email
      if (error.response && error.response.data && error.response.data.message) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: error.response.data.message, // Set the backend error message for email
        }));
      } else {
        console.error("⚠️ Registration error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center relative">
      <div className="w-[100%]">
        <img
          className="w-full h-[100vh] object-cover opacity-90"
          src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="shadow-xl w-[30%] h-auto flex flex-col items-center justify-center rounded-md absolute bg-[#ffffff72] py-2">
        <div className="w-[95%] h-[100%] flex justify-center items-center flex-col gap-1">
          <div className="w-[95%]">
            <label className="text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div className="w-[95%]">
            <label className="text-sm">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="w-[95%]">
            <label className="text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          <div className="w-[95%] flex gap-2">
            <div className="w-[50%]">
              <label className="text-sm">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
            </div>
            <div className="w-[50%]">
              <label className="text-sm">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
            </div>
          </div>
          <div className="w-[95%] flex gap-2">
            <div className="w-[50%]">
              <label className="text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
            </div>
            <div className="w-[50%]">
              <label className="text-sm">Postal code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-xs">{errors.postalCode}</p>
              )}
            </div>
          </div>
          <div className="w-[95%] h-[30px] mt-2 rounded-sm bg-[#25aadb]">
            <button
              onClick={handleSubmit}
              className="text-center text-sm w-full"
            >
              Submit
            </button>
          </div>
          <div className="w-[95%] h-[30px] flex items-center mt-2 text-sm">
            <p>
              If you have an account!
              <Link to="/login">
                <span className="text-[#0000f7]"> Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;