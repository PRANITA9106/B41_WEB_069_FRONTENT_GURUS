import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './Components/AddTask';
import { Navbar } from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Tasks from './Components/Tasks';
import Login from './Components/Login';
import { Signup } from './Components/Signup';

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
                      <AllTask />
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