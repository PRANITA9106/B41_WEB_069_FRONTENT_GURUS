// // import React, { createContext, useContext, useState, useEffect } from 'react';

// // // Create the context
// // export const AuthContext = createContext();  // Named export

// // // Custom hook to use the context
// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // // AuthProvider component to provide context to the app
// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null); // User state
// //   const [token, setToken] = useState(localStorage.getItem('token')); // Token state

// //   // Effect to handle token and user management
// //   useEffect(() => {
// //     if (!token) {
// //       // Optionally, you can handle unauthenticated state here (redirect to login, show error, etc.)
// //       console.log("No token found, redirecting to login...");
// //     } else {
// //       // Optionally, retrieve user information from the token here, e.g., by decoding it
// //       // For now, assuming the token is valid if it exists
// //       console.log("Token found");
// //     }
// //   }, [token]);

// //   // Login function (you can replace this with actual logic)
// //   const login = (userData, tokenData) => {
// //     setUser(userData);
// //     setToken(tokenData);
// //     localStorage.setItem('token', tokenData); // Save token to localStorage
// //   };

// //   // Logout function
// //   const logout = () => {
// //     setUser(null);
// //     setToken(null);
// //     localStorage.removeItem('token'); // Remove token from localStorage
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, token, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide context to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [token, setToken] = useState(localStorage.getItem('token')); // Token state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authenticated state

  // Effect to handle token and user management
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      // You can optionally decode the token here to get user data if it's a JWT
      // For example, if it's a JWT token, you might want to decode it and set user data
      // setUser(decodedUser);  // Decoding token if required
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]); // Trigger effect when token changes

  // Login function (you can replace this with actual logic)
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('token', tokenData); // Save token to localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};