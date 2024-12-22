import { useContext } from 'react';
import RecentTask from '../Components/RecentTask';
import RecentMeeting from '../Components/RecentMeeting';
import { ThemeContext } from '../Context/ThemeContext';
import Calendar from '../Components/Calendar';

export default function Tasks() {
  const { themeMode } = useContext(ThemeContext)
  return (
    <div className={`${themeMode ? 'light' : 'dark'} flex  gap-4 p-4 border`}>
      <div className='w-full sm:w-1/2 md:w-1/3'>
        <RecentTask />
      </div>
      <div className='w-full sm:w-1/2 md:w-1/3'>
        <RecentMeeting />
      </div>
      <div className='w-full sm:w-1/2 md:w-1/4'>
        <Calendar />
      </div>
    </div>
  );
}
