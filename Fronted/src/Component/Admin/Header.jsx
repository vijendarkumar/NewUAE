import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 flex justify-between items-center p-4">
      <div className="text-xl font-bold">Logo</div>
      <div className="relative">
        <button onClick={() => setProfileOpen(!profileOpen)}>
          <FaUserCircle className="text-2xl" />
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow p-2 z-10">
            <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;