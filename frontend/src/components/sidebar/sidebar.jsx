import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      navigate("/"); // back to login
    } catch (error) {
      console.error("Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-lg 
     ${isActive ? "bg-gray-800 font-semibold" : "hover:bg-gray-800"}`;

  return (
    <div className="h-full flex flex-col justify-between p-4">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8">
        Instagram
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/home" end className={linkClass}>
          🏠 Home
        </NavLink>

        <NavLink to="/home/search" className={linkClass}>
          🔍 Search
        </NavLink>

        <NavLink to="/home/explore" className={linkClass}>
          🧭 Explore
        </NavLink>

        <NavLink to="/home/reels" className={linkClass}>
          🎬 Reels
        </NavLink>

        <NavLink to="/home/messages" className={linkClass}>
          💬 Messages
        </NavLink>

        <NavLink to="/home/create" className={linkClass}>
          ➕ Create
        </NavLink>

        <NavLink to="/home/profile" className={linkClass}>
          👤 Profile
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 text-left text-red-500 hover:bg-gray-800 rounded-lg"
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;
