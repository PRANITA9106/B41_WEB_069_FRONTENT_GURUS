import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('high');
  const [message, setMessage] = useState('');

 
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    console.log('Form Data Before Submit:', { title, description, dueDate, priority });

    
    if (!title || !dueDate) {
      setMessage('Title and Due Date are required.');
      return;
    }

    const taskData = {
      title,
      description,
      dueDate: `${dueDate}T00:00:00.000Z`,  
      priority,
      status: 'todo',  
    };

  
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in first.');
      return;
    }

    
    console.log('Task Data:', taskData);

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("high");

      if (response.status === 201) {
        setMessage('Task created successfully!');
      } else {
        setMessage(` response: ${response.status}`);
      }
    } catch (error) {
      console.error('Request failed:', error);

      if (error.response) {
       
        console.error('Server Response:', error.response.data);
        setMessage(`Error creating task: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
      
        console.error('No Response:', error.request);
        setMessage('Error creating task: No response from server');
      } else {
        
        console.error('Error:', error.message);
        setMessage('Error creating task: ' + error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Task
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddTask;
