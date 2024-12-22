import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage.');
        }

        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data); // Update state with users data
      } catch (error) {
        console.error('Error fetching user data:', error.response || error.message);
        setMessage('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user._id !== userId)); // Remove user from state after deletion
      setMessage('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error.response || error.message);
      setMessage('Failed to delete user.');
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setEditedUsername(user.username);
    setEditedEmail(user.email);
    setEditedRole(user.role);
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('token');
    try {
      const updatedUser = {
        username: editedUsername,
        email: editedEmail,
        role: editedRole, // Ensure this is being passed correctly
      };
  
      const response = await axios.put(
        `http://localhost:5000/api/users/${currentUser._id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setUsers(
        users.map((user) =>
          user._id === currentUser._id ? response.data : user
        )
      ); // Update the user in the state
      setMessage('User updated successfully.');
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing user:', error.response || error.message);
      setMessage('Failed to update user.');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">User List</h1>

      {message && <p className="text-red-500">{message}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Edit User</h2>
            <label className="block mb-2">
              Username:
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="border px-2 py-1 w-full"
              />
             <label className="block mb-2">
    Role:
    <input
      type="text"
      value={editedRole}
      onChange={(e) => setEditedRole(e.target.value)}
      className="border px-2 py-1 w-full"
    />
  </label>
</label>

            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
