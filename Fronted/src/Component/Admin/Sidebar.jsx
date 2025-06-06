import React from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-800 text-white p-2 duration-300 z-40 ${
        sidebarOpen ? "w-16 sm:w-44" : "w-16"
      }`}
    >
      <button className="mb-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      <div className="space-y-4 mt-4">
        <NavLink
          to="/Admin"
          className={({ isActive }) =>
            `block w-full text-left py-2 rounded ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="story-insert"
          className={({ isActive }) =>
            `block w-full text-left py-2 rounded ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Story Insert
        </NavLink>

        <NavLink
          to="story-table"
          className={({ isActive }) =>
            `block w-full text-left py-2 rounded ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Story Table
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
