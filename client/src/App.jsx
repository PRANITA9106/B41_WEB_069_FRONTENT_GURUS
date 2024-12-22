import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './Components/AddTask';
import { Navbar } from './Components/Navbar';
import Sidebar from './Components/Sidebar';

import BigCalendar from './Components/BigCalendar';
import { Chat } from './Pages/Chat';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import Login from './Pages/Login';
import { Signup } from './Pages/Signup';
import Tasks from './Pages/Tasks';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        {isAuthenticated && <Sidebar />}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          {isAuthenticated && <Navbar />}

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <Routes>
              {/* Public Routes */}
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <>
                      <AddTask />
<<<<<<< HEAD
                      <AllTask />
=======
                      <Tasks />
>>>>>>> ea92656e218ea3ab15f8a8f9757c82ca26c96348
                      <BigCalendar />
                    </>
                  ) : (
                    <Navigate to="/sign-in" />
                  )
                }
              />
              <Route
                path="/messages"
                element={
                  isAuthenticated ? (
                    <Chat />
                  ) : (
                    <Navigate to="/sign-in" />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;