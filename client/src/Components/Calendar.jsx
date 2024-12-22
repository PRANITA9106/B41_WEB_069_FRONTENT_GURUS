import { useContext, useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ThemeContext } from '../Context/ThemeContext';

export default function Calendar() {
  const { themeMode = false } = useContext(ThemeContext);
  const [value, onChange] = useState(new Date());

  return (
    <div className={`${themeMode ? 'dark' : 'light'} rounded-lg shadow-lg`}>
      <ReactCalendar
        value={value}
        onChange={onChange}
        tileClassName={({ date, view }) =>
          view === 'month' && date.getDate() === 15 ? 'highlight' : null
        }
        className="w-full max-w-sm mx-auto rounded-lg"
      />
    </div>
  );
}
