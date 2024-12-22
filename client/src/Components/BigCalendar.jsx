import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch or hardcode events for the calendar
    setEvents([
      {
        title: 'Meeting with Client',
        start: new Date(2024, 10, 19, 10, 0), // November 19, 2024, 10:00 AM
        end: new Date(2024, 10, 19, 11, 0),   // November 19, 2024, 11:00 AM
      },
      {
        title: 'Team Sync',
        start: new Date(2024, 10, 20, 14, 30), // November 20, 2024, 2:30 PM
        end: new Date(2024, 10, 20, 15, 30),   // November 20, 2024, 3:30 PM
      },
      // Add more events here
    ]);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Big Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default BigCalendar;
