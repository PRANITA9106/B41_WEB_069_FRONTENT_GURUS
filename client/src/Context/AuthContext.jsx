<<<<<<< HEAD
import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize authentication state based on localStorage or default to false
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";  // Ensure it's a boolean value
  });

  // Authenticate function to toggle the state
  const authenticate = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true); // Save authentication state in localStorage
  };

  // Logout function to set isAuthenticated to false
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove authentication state from localStorage
  };

  // Optional: useEffect to handle the initial state more clearly
  useEffect(() => {
    // Handle any updates to authentication state or sessions here
    if (!isAuthenticated) {
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {isAuthenticated ? children : <Navigate to="/sign-in" />}
    </AuthContext.Provider>
  );
};
=======
import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext()

// AuthContext 

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  let authenticate = () => {
    setIsAuthenticated(!isAuthenticated)
  }

  return <AuthContext.Provider value={{ isAuthenticated, authenticate }}>
    {isAuthenticated ? children : <Navigate to='/sign-in' />}
  </AuthContext.Provider>
}

>>>>>>> Frontend_Gurus/Utkarsh
