import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({
    displayName: "John Doe", // Simulated user name
    email: "john.doe@example.com", // Simulated user email
    photoURL: "https://www.example.com/photo.jpg", // Simulated profile photo URL
  });

  const [newDisplayName, setNewDisplayName] = useState(currentUser.displayName);
  const [newPhotoURL, setNewPhotoURL] = useState(currentUser.photoURL);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user data (you would replace this with real API calls or authentication logic)
    setCurrentUser({
      displayName: "John Doe",
      email: "john.doe@example.com",
      photoURL: "https://www.example.com/photo.jpg",
    });
  }, []);

  const handleDisplayNameChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handlePhotoURLChange = (e) => {
    setNewPhotoURL(e.target.value);
  };

  const handleSaveChanges = () => {
    // Simulate saving the new data (e.g., by calling an API or updating your global state)
    setCurrentUser({
      ...currentUser,
      displayName: newDisplayName,
      photoURL: newPhotoURL,
    });
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    // Simulate user logout (you would clear user data here)
    alert("Logged out successfully!");
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div className="profile-page max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle size={128} className="text-gray-500" />
        )}
      </div>

      {/* Edit Profile Form */}
      <div className="space-y-4">
        {/* Display Name */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={newDisplayName}
            onChange={handleDisplayNameChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Profile Picture URL */}
        <div>
          <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
            Profile Picture URL
          </label>
          <input
            type="text"
            id="photoURL"
            value={newPhotoURL}
            onChange={handlePhotoURLChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
