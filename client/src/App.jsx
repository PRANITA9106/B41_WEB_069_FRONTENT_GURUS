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
import { Footer } from './Components/Footer';
import { TaskBoard } from './Pages/TaskBoard';

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
                      <Tasks />
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
              <Route
                path="/task-board"
                element={
                  isAuthenticated ? (
                    <TaskBoard />
                  ) : (
                    <Navigate to="/sign-in" />
                  )
                }
              />

            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
