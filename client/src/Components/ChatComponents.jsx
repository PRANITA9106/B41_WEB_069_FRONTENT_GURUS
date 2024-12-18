import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const messages = [
  {
    id: 1,
    sender: "Utkarsh",
    avatar: "😎",
    message: "Good Morning👋",
    time: "12:49",
  },
  {
    id: 2,
    sender: "Sandeep",
    avatar: "😎",
    message: "Today we will move on to the wireframe process",
    time: "12:50",
  },
  {
    id: 3,
    sender: "User",
    avatar: "😎",
    message: "Okay Sandeep 👍",
    time: "13:00",
  },
];

const ChatComponent = () => {

  const { themeMode } = useContext(ThemeContext)

  return (
    <div className={`${themeMode ? 'light' : 'dark'} p-4 rounded-lg shadow-lg `}>
      {/* avatars */}
      <div className="flex space-x-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="w-8 h-8 rounded-full  flex items-center justify-center">
            <span className="text-lg">{msg.avatar}</span>
          </div>
        ))}
        <div className="w-8 h-8  border rounded-full flex items-center justify-center text-sm">
          +10
        </div>
      </div>

      {/* Message Area */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border p-4 rounded-lg shadow-md">
            <div className="flex justify-between text-sm font-semibold text-gray-800 dark:text-gray-200">
              <span>{msg.sender}</span>
              <span className="text-gray-500">{msg.time}</span>
            </div>
            <div className="mt-2 text-gray-700 dark:text-gray-300">{msg.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
