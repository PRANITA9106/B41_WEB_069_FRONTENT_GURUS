import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './Components/AddTask';
import  {Navbar}  from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Tasks from './Components/Tasks';
import Login from './Components/Login';
import { Signup } from './Components/Signup';
import { AuthProvider } from "./Components/AuthContext";
import AllTasks from './Components/AllTask'; 
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <>
    <AuthProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Tasks />} /> 
              <Route path="/add-task" element={<AddTask />} /> 
              <Route path="/all-tasks" element={<AllTasks />} />
              <Route path="/tasks" element={<Tasks />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </div>

      </AuthProvider>
    </>
  );
}

export default App;
