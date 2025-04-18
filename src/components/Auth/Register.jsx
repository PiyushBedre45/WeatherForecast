import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col items-center justify-center relative">
        {/* <div className=" w-[100%] ">
            <img className="w-full h-[100vh] object-cover opacity-90" src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div> */}
        <div className="shadow-xl  w-[30%] h-[410px] flex flex-col items-center justify-center rounded-md absolute bg-[#ffffff72]">
          <div className="w-[95%] h-[100%] flex justify-center items-center flex-col gap-1 ">
            <div className="w-[95%]">
              <label className="text-sm">Name</label>
              <input
                type="text"
                className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
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
            <div className="w-[95%] flex gap-2">
              <div className="w-[50%]">
                <label className="text-sm">City</label>
                <input
                  type="text"
                  className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
                />
              </div>
              <div className="w-[50%]">
                <label className="text-sm">State</label>
                <input
                  type="text"
                  className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
                />
              </div>
            </div>
            <div className="w-[95%] flex gap-2">
              <div className="w-[50%]">
                <label className="text-sm">Phone</label>
                <input
                  type="text"
                  className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
                />
              </div>
              <div className="w-[50%]">
                <label className="text-sm">Zip</label>
                <input
                  type="text"
                  className="w-[100%] h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
                />
              </div>
            </div>
            <div className=" w-[95%] h-[30px] mt-2 rounded-sm bg-[#25aadb]">
              <button className="text-center text-sm w-full">Submit</button>
            </div>
            <div className=" w-[95%] h-[30px] flex items-center mt-2 text-sm ">
                <p>If you have an account! <Link to={'/login'}><span className="text-[#0000f7]"> Login</span></Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
