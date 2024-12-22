import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const TaskBoard = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          
        //   navigate('/login'); 
          return;
        }

        const response = await fetch('http://localhost:5000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          
          const groupedTasks = data.reduce((acc, task) => {
            const { status } = task;
            if (!acc[status]) acc[status] = [];
            acc[status].push(task);
            return acc;
          }, {});

          setTasks(groupedTasks);
        } else {
          throw new Error('Failed to fetch tasks');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]); 

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask, status: 'todo' }),
      });

      if (response.ok) {
        const newTaskData = await response.json();
        setTasks((prevTasks) => ({
          ...prevTasks,
          todo: [...prevTasks.todo, newTaskData],
        }));
        setNewTask('');
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to add task');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTasksByStatus = (status) => tasks[status] || [];

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Tasks</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              placeholder="Enter task description"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {['todo', 'in-progress', 'done'].map((status) => (
            <div key={status} className="bg-gray-50 p-4 rounded shadow">
              <h2 className="font-semibold text-lg mb-4">{status.replace('-', ' ').toUpperCase()}</h2>
              {getTasksByStatus(status).length === 0 ? (
                <p>No tasks in this category</p>
              ) : (
                getTasksByStatus(status).map((task) => (
                  <div key={task._id} className="bg-white p-4 rounded shadow mb-4">
                    <p className="text-sm text-gray-600">{task.task}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-gray-400">User</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-500">✏️</button>
                        <button className="text-red-500">🗑️</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
