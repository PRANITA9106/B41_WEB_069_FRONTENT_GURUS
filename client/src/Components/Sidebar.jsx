import React, { useContext, useState } from "react";
import { FaTachometerAlt, FaEnvelope, FaTasks, FaCalendarAlt, FaUser } from "react-icons/fa";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { ThemeContext } from "../Context/ThemeContext";
import ChatComponent from "./ChatComponents";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { themeMode } = useContext(ThemeContext)

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`h-screen flex flex-col justify-between ${themeMode ? 'light' : 'dark'} 
        ${isExpanded ? "w-64" : "w-16"} 
        transition-all duration-500 ease-in-out rounded-l-2xl shadow-xl`}
    >
      <div className="p-2">
        <div className="flex items-center p-2 gap-2 border-b">
          <span className="text-3xl">🚀</span>
          {isExpanded && (
            <h1 className="text-xl font-bold transition-all duration-300 ease-in-out opacity-100">
              TaskVista
            </h1>
          )}
        </div>

        <div className="mt-6 shadow-md">
          {isExpanded && (
            <h1 className="text-2xl font-bold transition-opacity duration-300 ease-in-out opacity-100">
              Start Your Day & Be Productive👋
            </h1>
          )}
        </div>

        {/* Sidebar Links */}
        <div className="mt-8 flex flex-col gap-6">
          <SidebarLink
            icon={<FaTachometerAlt size={24} />}
            label="Dashboard"
            expanded={isExpanded}
          />
          <SidebarLink
            icon={<FaEnvelope size={24} />}
            label="Messages"
            expanded={isExpanded}
          />
          <SidebarLink
            icon={<FaTasks size={24} />}
            label="My Tasks"
            expanded={isExpanded}
          />
          <SidebarLink
            icon={<FaCalendarAlt size={24} />}
            label="Calendar"
            expanded={isExpanded}
          />
        </div>
      </div>

      {/* Chat Component */}
      {isExpanded && (
        <div className="transition-opacity duration-500 ease-in-out">
          <ChatComponent />
        </div>
      )}

      <div className="p-2 border-t">
        <SidebarLink
          icon={<IoMdLogIn size={24} />}
          label="Login"
          expanded={isExpanded}
        />
      </div>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ icon, label, expanded }) => {
  return (
    <div className="flex items-center gap-6 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
      <div>{icon}</div>
      {expanded && <span className="text-md">{label}</span>}
    </div>
  );
};

export default Sidebar;
