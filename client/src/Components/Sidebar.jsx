import { useContext, useState } from "react";
import { FaTachometerAlt, FaEnvelope, FaTasks, FaCalendarAlt } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";  
import { ThemeContext } from "../Context/ThemeContext";
import ChatComponent from "./ChatComponents";
import Logo from '../assets/TaskVista.png';


const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { themeMode } = useContext(ThemeContext);

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
          <span> <img className="w-14" src={Logo} alt="Logo" /></span>
          {isExpanded && (
            <h1 className="text-2xl font-bold transition-all duration-300 ease-in-out opacity-100 flex gap-2 cursor-pointer">
              TaskVista <p className="w-3 h-3 mt-4 rounded-full bg-[#0bd6e5] animate-bounce"></p>
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

   
        <div className="mt-8 flex flex-col gap-6">
          <SidebarLink
            to="/dashboard" 
            icon={<FaTachometerAlt size={24} />}
            label="Dashboard"
            expanded={isExpanded}
          />
          <SidebarLink
            to="/messages"  
            icon={<FaEnvelope size={24} />}
            label="Messages"
            expanded={isExpanded}
          />
          <SidebarLink
            to="/tasks"  
            icon={<FaTasks size={24} />}
            label="My Tasks"
            expanded={isExpanded}
          />
          <SidebarLink
            to="/calendar"  
            icon={<FaCalendarAlt size={24} />}
            label="Calendar"
            expanded={isExpanded}
          />
        </div>
      </div>

    
      {isExpanded && (
        <div className="transition-opacity duration-500 ease-in-out">
          <ChatComponent />
        </div>
      )}

      <div className="p-2 border-t">
        <SidebarLink
          to="/login"  
          icon={<IoMdLogIn size={24} />}
          label="Login"
          expanded={isExpanded}
        />
      </div>
    </div>
  );
};


const SidebarLink = ({ to, icon, label, expanded }) => {
  return (
    <Link to={to} className="flex items-center gap-6 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
      <div>{icon}</div>
      {expanded && <span className="text-md">{label}</span>}
    </Link>
  );
};

export default Sidebar;
