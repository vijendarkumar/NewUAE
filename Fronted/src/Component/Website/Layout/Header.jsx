import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow p-4 md:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold">Amsterdam Lore</h1>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-sm md:text-base">Home</a>
          <a href="#" className="text-sm md:text-base">Stories</a>
          <a href="#submit" className="text-sm md:text-base">Submit</a>
        </nav>
      </div>

      {/* Mobile Nav with Transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${
          menuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col space-y-2 mt-2 px-1">
          <a href="#" className="text-sm">Home</a>
          <a href="#" className="text-sm">Stories</a>
          <a href="#submit" className="text-sm">Submit</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
