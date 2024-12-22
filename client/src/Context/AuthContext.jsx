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

