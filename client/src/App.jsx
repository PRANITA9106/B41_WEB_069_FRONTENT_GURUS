import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './Components/AddTask';
import { Navbar } from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Tasks from './Components/Tasks';
import Login from './Components/Login';
import { Signup } from './Components/Signup';
import BigCalendar from './Components/BigCalendar';

function App() {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* content */}
          <div className="flex-1 overflow-auto">
            <AddTask />
            <Tasks />
            <BigCalendar />

            <Routes>
              <Route path='/sign-in' element={<Login />} />
              <Route path='/sign-up' element={<Signup />} />
            </Routes>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
