import './App.css';
import AddTask from './Components/AddTask';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Tasks from './Components/Tasks';

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
          <div className="p-4 flex-1 overflow-auto">
            <AddTask />
            <Tasks />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
