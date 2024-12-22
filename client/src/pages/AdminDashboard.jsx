import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch users');
                setLoading(false);
            }
        };

        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCurrentUser(response.data);
            } catch (err) {
                console.error('Failed to fetch current user:', err);
            }
        };

        fetchUsers();
        fetchCurrentUser();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await axios.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(users.filter((user) => user._id !== id));
            alert('User deleted successfully');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete user');
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            await axios.patch(`/api/users/${id}/role`,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setUsers(users.map((user) =>
                user._id === id ? { ...user, role: newRole } : user
            ));
            alert('User role updated successfully');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update user role');
        }
    };

    if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

            {currentUser && currentUser.role === 'admin' ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="table-auto w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">Username</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Role</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{user.username}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">
                                            {user.role}
                                            {user._id !== currentUser._id && (
                                                <select
                                                    className="ml-2 p-1 border rounded"
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {user._id !== currentUser._id && (
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                    {currentUser ? (
                        <div className="bg-white shadow-md p-4 rounded-lg max-w-md mx-auto">
                            <p className="text-gray-700">
                                <strong>Username:</strong> {currentUser.username}
                            </p>
                            <p className="text-gray-700">
                                <strong>Email:</strong> {currentUser.email}
                            </p>
                            <p className="text-gray-700">
                                <strong>Role:</strong> {currentUser.role}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500">Loading profile...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
