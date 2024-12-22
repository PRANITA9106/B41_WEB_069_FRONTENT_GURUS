import { useContext } from 'react';
import { useState } from 'react';
import { FaUserCircle, FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { themeMode, toggleThemeMode } = useContext(ThemeContext)

  const currentUser = {
    displayName: "LogIn",
    photoURL: 'https://e7.pngegg.com/pngimages/870/211/png-clipart-iphone-world-emoji-day-man-iphone-electronics-face-thumbnail.png',
    profession: 'Profession'
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav
      className={`flex justify-between items-center px-4 py-2  transition-all duration-500 ease-in-out rounded-tr-2xl shadow-xl ${themeMode ? 'light' : 'dark'
        }`}
    >
      <div className={`${themeMode ? 'light' : 'dark'} flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-3 space-x-4 w-[500px]`}>
        <FaSearch className="text-gray-500 dark:text-gray-300" />
        <input
          type="search"
          placeholder="Search Here..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer" />
        </div>

        <button onClick={toggleThemeMode} className="focus:outline-none">
          {themeMode ? (
            <MdLightMode size={24} className="hover:text-yellow-400" />
          ) : (
            <MdDarkMode size={24} className="hover:text-blue-700" />
          )}
        </button>

        <Link to='/sign-in' className="relative flex items-center space-x-2 border px-2 py-1 rounded-lg">

          <img
            src={currentUser.photoURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="flex-col">
              <p className="text-md font-bold cursor-pointer">{currentUser.displayName}</p>
              <p className="text-sm">{currentUser.profession}</p>
            </div>
            <div>
              <FaChevronDown />
            </div>
          </div>
        </Link>


      </div>
    </nav>
  );
};

