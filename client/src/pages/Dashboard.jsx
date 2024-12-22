import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // Import the custom hook to use the AuthContext
import { useDrag, useDrop } from 'react-dnd';

const Dashboard = () => {
  const { token } = useAuth(); // Get the token from the AuthContext
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [editUser, setEditUser] = useState(null);  // State for editing user
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // Fetch users
  useEffect(() => {
  const token = localStorage.getItem('token') || context.token;
if (!token) {
  throw new Error('No token provided');
}

    fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Access denied');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched users:", data);  // Log the fetched data
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching users.');
        setLoading(false);
        console.error('Error fetching users:', error);
      });
  }, [token]);

  // Function to handle role change
  const handleRoleChange = () => {
    if (!token || !selectedUser || !selectedRole) {
      setError('Please select a user and a role.');
      return;
    }

    fetch(`http://localhost:5000/api/users/${selectedUser}/role`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: selectedRole }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update role');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Role updated:', data);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser ? { ...user, role: selectedRole } : user
          )
        );
        setError('');
      })
      .catch((error) => {
        setError('Error updating role.');
        console.error('Error updating role:', error);
      });
  };

  // Move user to a new role after drag-and-drop
  const moveUser = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
    // Call the backend to update the role
    fetch(`http://localhost:5000/api/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    }).catch((error) => {
      console.error('Error updating role:', error);
    });
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting user');
        }
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        console.log('User deleted:', userId);
      })
      .catch((error) => {
        setError('Error deleting user.');
        console.error('Error deleting user:', error);
      });
  };

  // Edit user information
  const handleEditUser = (user) => {
    setEditUser(user);
    setEditUsername(user.username);
    setEditEmail(user.email);
  };

  const handleSaveEdit = () => {
    if (!editUsername || !editEmail) {
      setError('Please provide valid username and email.');
      return;
    }

    fetch(`http://localhost:5000/api/users/${editUser._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: editUsername, email: editEmail }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating user');
        }
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === editUser._id ? { ...user, username: editUsername, email: editEmail } : user
          )
        );
        setEditUser(null);  // Close the edit form
        setError('');
      })
      .catch((error) => {
        setError('Error saving user changes.');
        console.error('Error saving user changes:', error);
      });
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  // Group users by role
  const groupedUsers = users.reduce((acc, user) => {
    if (!acc[user.role]) {
      acc[user.role] = [];
    }
    acc[user.role].push(user);
    return acc;
  }, {});

  // Column component for drag-and-drop
  const Column = ({ role, usersInRole }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'USER',
      drop: (item) => moveUser(item.id, role),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        className="border p-4 w-64 min-h-48 bg-white hover:bg-gray-100 m-2"
      >
        <h3 className="font-bold">{role}</h3>
        {usersInRole.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            handleDelete={handleDeleteUser}
            handleEdit={handleEditUser}
          />
        ))}
      </div>
    );
  };

  // User Card component for each user
  const UserCard = ({ user, handleDelete, handleEdit }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'USER',
      item: { id: user._id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={`border p-4 mb-4 bg-white cursor-move hover:bg-gray-50 ${isDragging ? 'bg-gray-200' : ''}`}
      >
        <p className="font-semibold">{user.username}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-xs text-gray-400">{new Date(user.createdAt).toLocaleString()}</p>
        <button
          className="text-blue-600 mt-2 mr-2"
          onClick={() => handleEdit(user)}
        >
          Edit
        </button>
        <button
          className="text-red-600 mt-2"
          onClick={() => handleDelete(user._id)}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {error && <p className="text-red-600">{error}</p>}

      {/* Edit User Modal */}
      {editUser && (
        <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <label className="block mb-2">
              Username:
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
            <div className="mt-4">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="bg-gray-400 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        {Object.keys(groupedUsers).map((role) => (
          <Column key={role} role={role} usersInRole={groupedUsers[role]} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
