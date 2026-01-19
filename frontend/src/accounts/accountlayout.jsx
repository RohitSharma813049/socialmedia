import React from "react";
import { Outlet } from "react-router-dom";
import loginlayout from "../../public/image/OIP.jpg"; // ✅ correct path

function AccountLayout() {
  return (
    <div className="flex min-h-screen w-full">
      
      {/* Left Image Section */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={loginlayout}
          alt="Login Layout"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
        <Outlet />
      </div>

    </div>
  );
}

export default AccountLayout;
