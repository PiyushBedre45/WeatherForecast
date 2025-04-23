// import React from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   return (
//     <>
//       <div className="w-full h-[100vh] flex flex-col items-center justify-center relative">
//         <div className=" w-[100%] ">
//             <img className="w-full h-[100vh] object-cover opacity-90" src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
//         </div>
//         <div className="shadow-xl  w-[30%] h-[410px] flex flex-col items-center justify-center rounded-2xl absolute bg-[#ffffff72]">
//           <div className="w-[95%] h-[100%] flex justify-center items-center flex-col gap-1 ">
//             <div className="w-[95%]">
//               <label className="text-sm">Name</label>
//               <input
//                 type="text"
//                 className=" w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
//               />
//             </div>
//             <div className="w-[95%]">
//               <label className="text-sm">Email</label>
//               <input
//                 type="text"
//                 className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
//               />
//             </div>
//             <div className="w-[95%]">
//               <label className="text-sm">Password</label>
//               <input
//                 type="text"
//                 className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
//               />
//             </div>
//             <div className="w-[95%] flex gap-2">
//               <div className="w-[50%]">
//                 <label className="text-sm">City</label>
//                 <input
//                   type="text"
//                   className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
//                 />
//               </div>
//               <div className="w-[50%]">
//                 <label className="text-sm">State</label>
//                 <input
//                   type="text"
//                   className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
//                 />
//               </div>
//             </div>
//             <div className="w-[95%] flex gap-2">
//               <div className="w-[50%]">
//                 <label className="text-sm">Phone</label>
//                 <input
//                   type="text"
//                   className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
//                 />
//               </div>
//               <div className="w-[50%]">
//                 <label className="text-sm">Zip</label>
//                 <input
//                   type="text"
//                   className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
//                 />
//               </div>
//             </div>
//             <div className=" w-[95%] h-[30px] mt-2 rounded-sm bg-[#25aadb]">
//               <button className="text-center text-sm w-full">Submit</button>
//             </div>
//             <div className=" w-[95%] h-[30px] flex items-center mt-2 text-sm ">
//                 <p>If you have an account! <Link to={'/login'}><span className="text-[#0000f7]"> Login</span></Link></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5280/api/auth/register",
        formData
      );
      const { token, name, city, country, phone, email, postalCode } = response.data;
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
        const userDetails = {
          token,
          name,
          city,
          country,
          phone,
          email,
          postalCode,
        };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        // Redirect to login
        navigate("/login");
      } else {
        console.log("❌ Registration failed:", response);
      }
    } catch (error) {
      console.error(
        "⚠️ Registration error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center relative">
      <div className=" w-[100%] ">
        //{" "}
        <img
          className="w-full h-[100vh] object-cover opacity-90"
          src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        //{" "}
      </div>
      <div className="shadow-xl w-[30%] h-[410px] flex flex-col items-center justify-center rounded-md absolute bg-[#ffffff72]">
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
