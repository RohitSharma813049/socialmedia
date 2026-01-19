import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function Home() {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen border-r border-gray-800">
        <Sidebar />
      </div>

      {/* Feed */}
      <div className="ml-64 flex-1 flex justify-center">
        <div className="w-[600px] py-6">
          <Outlet />
        </div>
      </div>

      {/* Right Suggestions */}
      <div className="hidden lg:block w-80 fixed right-0 top-0 h-screen p-4">
        <p className="text-gray-400">Suggested for you</p>
      </div>

    </div>
  );
}

export default Home;
