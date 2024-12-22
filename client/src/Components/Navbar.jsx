import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle, FaSearch, FaBell } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 


export const Navbar = () => {
  const { themeMode, toggleThemeMode } = useContext(ThemeContext);
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const navigate = useNavigate();

  
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
    setSearchQuery('');
  };

 
  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      navigate("/login");  
    } catch (err) {
      console.error(err.message);
    }
  };

  
  const handleProfileClick = () => {
    if (currentUser) {
      navigate('/dashboard'); 
    } else {
      navigate('/login'); 
    }
  };

 
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (currentUser) {
      setUserPhoto(currentUser.photoURL || null); 
    }
  }, [currentUser]);

  return (
    <nav className={`flex justify-between items-center px-6 py-4 transition-all duration-500 ease-in-out rounded-tr-2xl shadow-xl ${themeMode ? 'bg-white' : 'bg-gray-800'}`}>
      
      <div className={`flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-3 space-x-4 w-[500px] sm:w-[350px]`}>
        <FaSearch className="text-gray-500 dark:text-gray-300" />
        <form onSubmit={handleSearchSubmit} className="w-full">
          <input
            type="search"
            placeholder="Search Here..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </form>
      </div>

      <div className="flex items-center space-x-6">
       



        <div className="relative">
          <FaBell className="text-2xl cursor-pointer" />
        </div>

       
        <button
          onClick={toggleThemeMode}
          className="focus:outline-none"
          aria-label={themeMode ? "Switch to dark mode" : "Switch to light mode"}
        >
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
