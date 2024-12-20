import { useContext, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { ThemeContext } from "../Context/ThemeContext";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigCalendar = () => {
  const { themeMode } = useContext(ThemeContext)
  const [events, setEvents] = useState([
    {
      title: "Meeting with Team",
      start: new Date(2024, 11, 20, 10, 0),
      end: new Date(2024, 11, 20, 11, 0),
    },
    {
      title: "Project Deadline",
      start: new Date(2024, 11, 25, 17, 0),
      end: new Date(2024, 11, 25, 18, 0),
    },
  ]);

  return (
    <div className={`${themeMode ? 'light' : 'dark'} px-4 py-2`}>
      <Calendar
        className={`${themeMode ? 'light' : 'dark'}  w-2/3 px-4 py-2 rounded-lg`}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
      />
    </div>
  );
};

export default BigCalendar;
