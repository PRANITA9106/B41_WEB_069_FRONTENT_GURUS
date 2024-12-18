import './App.css';
import AddTask from './Components/AddTask';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Routes for content */}
          <div className="p-4 flex-1 overflow-auto">
            <AddTask />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
