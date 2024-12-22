// import React from 'react';
// import CommentSection from '../Components/CommentSection';

// const TaskList = () => {
//   const taskId = 1; // Replace with the actual task ID

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Task List</h1>
//       <div className="space-y-6">
//         {/* Task Item 1 */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="text-xl font-semibold text-gray-900">Task 1</h3>
//           <p className="text-gray-700 mt-2">Description of the task</p>

//           {/* Comment Section */}
//           <div className="mt-4">
//             <CommentSection taskId={taskId} />
//           </div>
//         </div>

//         {/* Task Item 2 */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="text-xl font-semibold text-gray-900">Task 2</h3>
//           <p className="text-gray-700 mt-2">Description of another task</p>

//           {/* Comment Section */}
//           <div className="mt-4">
//             <CommentSection taskId={taskId + 1} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskList;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch tasks when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data); // Assuming the response contains the task list
      } catch (err) {
        setError('Failed to fetch tasks.');
        console.error(err);
      }
    };

    fetchTasks();
  }, [navigate]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      {error && <p className="text-red-500">{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="border-b py-2">
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <button
                onClick={() => navigate(`/task/${task.id}/comments`)}
                className="text-blue-500 hover:underline"
              >
                View Comments
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
