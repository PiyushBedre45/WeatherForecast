import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center relative">
        {/* <div className=" w-[100%] ">
          <img
            className="w-full h-[100vh] object-cover opacity-90"
            src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div> */}
        <div className=" shadow-xl w-[30%] h-[410px] flex items-center justify-center rounded-md absolute bg-[#ffffff72]">
          <div className="w-[95%] h-[90%] flex justify-center items-center flex-col gap-4">
            {/* <div className="w-[95%]">
              <label className="text-sm">Name</label>
              <input type="text" className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm" />
            </div> */}
            <div className="w-[95%] text-xl">
              <h1>Enter your email to join us</h1>
            </div>
            <div className="w-[95%]">
              <label className="text-sm">Email</label>
              <input
                type="text"
                className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
            </div>
            <div className="w-[95%]">
              <label className="text-sm">Password</label>
              <input
                type="text"
                className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
            </div>
            <div className="w-[95%] h-[30px] mt-2 rounded-sm bg-[#25aadb]">
              <button className="text-center text-sm w-full">Submit</button>
            </div>

            <div className=" w-[95%] h-[70px] flex bottom-1 items-center text-sm">
              <p>
                Dont't you have an account!{" "}
                <Link to={"/register"}>
                  <span className="text-[#0000f7]"> Register</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
