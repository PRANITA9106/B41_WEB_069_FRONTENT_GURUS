import React, { useState } from 'react';
import { FaSun, FaMoon, FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentUser = {
    displayName: "Sandeep",
    photoURL: "https://via.placeholder.com/40"
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav
      className={`flex justify-between items-center p-4 shadow-md transition-colors ${
        isDarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className="flex items-center space-x-6 ml-[50px]">
        <div className="text-2xl font-bold cursor-pointer">Ft38</div>

        <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-3 space-x-4 w-[400px]">
          <FaSearch className="text-gray-500 dark:text-gray-300" />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent border-none outline-none text-sm text-gray-800 dark:text-white w-full"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer hover:bg-gray-200" />
        </div>

        <button onClick={toggleDarkMode} className="text-xl p-2 rounded-full">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <Link className="px-4 py-2 rounded-md hover:bg-gray-200">
          Sign Up
        </Link>

        <div className="relative flex items-center space-x-2">
          {currentUser ? (
            <>
              <img
                src={currentUser.photoURL || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <span className="text-sm font-medium cursor-pointer">{currentUser.displayName}</span>
            </>
          ) : (
            <FaUserCircle className="text-5xl cursor-pointer" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
