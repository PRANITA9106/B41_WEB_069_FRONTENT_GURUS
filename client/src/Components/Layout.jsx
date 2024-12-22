import React, { useState } from 'react';
import Navbar from './Navbar'; // We'll create this next
import Sidebar from './Sidebar'; // Sidebar component
// import Footer from './Footer'
import BigCalendar from './BigCalendar'
const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Grid Items - Example Content */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 1</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 2</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 3</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
            {/* Add more grid items as needed */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">Task 4</h3>
              <p>Task description goes here.</p>
            </div>
 {/* <Footer/> */}
          </div>
        </div>
        
       <BigCalendar/>
      </div>
     
    </div>
    
  );
};

export default Layout;
