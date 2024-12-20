import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { FaSave } from "react-icons/fa";

export default function AddTask() {
  const { themeMode } = useContext(ThemeContext);

  const [taskData, setTaskData] = useState(
    {
      title: "",
      deadline: "",
      category: "work",
      priority: "high",
      status: "todo",
    }
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitTask = (e) => {
    e.preventDefault()
    console.log(taskData)

    setTaskData({
      title: "",
      deadline: "",
      category: "work",
      priority: "high",
      status: "todo",
    })
  }

  return (
    <div
      className={`${themeMode ? "light" : "dark"} flex p-4 border  shadow-md`}
    >
      <form
        onSubmit={onSubmitTask}
        className="flex items-center justify-between w-full gap-4"
      >
        <div className="w-full">
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            placeholder="Task Title"
            className={`${themeMode ? "light" : "dark"
              } w-full px-4 py-2 border rounded-md`}
            required
          />
        </div>

        <div>
          <input
            type="datetime-local"
            name="deadline"
            value={taskData.deadline}
            onChange={handleInputChange}
            className={`${themeMode ? "light" : "dark"
              } px-4 py-2 border rounded-md custom-calendar-icon focus:outline-none`}
            required
          />
        </div>

        <div>
          <select
            name="category"
            value={taskData.category}
            onChange={handleInputChange}
            className={`${themeMode ? "light" : "dark"
              } px-4 py-2 border rounded-md`}
            required
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            className={`${themeMode ? "light" : "dark"
              } px-4 py-2 border rounded-md`}
            required
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <select
            name="status"
            value={taskData.status}
            onChange={handleInputChange}
            className={`${themeMode ? "light" : "dark"
              } px-4 py-2 border rounded-md`}
          >
            <option value="todo">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className={`${themeMode ? "light" : "dark"
              } text-2xl cursor-pointer p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-300`}
          >
            <FaSave />
          </button>
        </div>
      </form>
    </div>
  );
}