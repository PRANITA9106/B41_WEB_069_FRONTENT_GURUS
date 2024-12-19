import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useState,useEffect } from 'react';

// import AddTask from './Components/AddTask';
import { Navbar } from './Components/Navbar';
import Sidebar from './Components/Sidebar';
// import Tasks from './Components/Tasks';
import Login from './Components/Login';
import { Signup } from './Components/Signup';
import CalendarComponent from './CalendarComponent';

function App() {
  const [events, setEvents] = useState([]);
 
  useEffect(() => {
    // Example events
    const exampleEvents = [
      {
        start: new Date(),
        end: new Date(new Date().setHours(new Date().getHours() + 1)),
        title: 'Sample Event',
      },
    ];
    setEvents(exampleEvents);
  }, []);
 
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
            {/*  <AddTask /> */}
            {/*  <Tasks /> */}
            <Routes>
              <Route path='/sign-in' element={<Login />} />
              <Route path='/sign-up' element={<Signup />} />
            </Routes>
          </div>

        </div>
      </div>
      <div className="App">
      <header className="App-header">
        <h1>React Calendar Integration</h1>
      </header>
      <main>
        <CalendarComponent events={events} />
      </main>
    </div>
    </>
  );
}

export default App;
