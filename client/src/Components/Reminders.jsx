import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

function Reminder({ time, priority, text }) {

  const { themeMode } = useContext(ThemeContext)
  const priorityColor = {
    Low: 'green-500',
    High: 'red-500',
  };

  return (
    <div className={`${themeMode ? 'light' : 'dark'} p-4 border rounded-lg mb-2`}>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{time}</span>
        <span className={`bg-${priorityColor[priority]}-200 rounded-full px-2 py-1 text-xs`}>{priority}</span>
      </div>
      <p className="mt-">{text}</p>
    </div>
  );
}

function Reminders() {
  const { themeMode } = useContext(ThemeContext)

  const reminders = [
    { time: '09:30 AM', priority: 'Low', text: 'Check test results' },
    { time: '10:00 AM', priority: 'High', text: 'Client Presentation' },
    { time: '04:15 PM', priority: 'High', text: 'Add new subtask to Doctor+ analysis' },
  ];

  return (
    <div className={`${themeMode ? 'light' : 'dark'} mx-auto px-4 py-2 rounded-lg`}>
      <h2 className=" text-2xl font-semibold mb-4 text-center" > Reminders</h2>
      <div>
        {reminders.map((reminder, index) => (
          <Reminder key={index} {...reminder} />
        ))}
      </div>
      <button className="bg-slate-700 float-end font-bold py-2 px-4 rounded">
        Add Reminder
      </button>
    </div>
  );
}

export default Reminders;