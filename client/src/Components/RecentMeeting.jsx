import { data, Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa6';
import { useContext } from 'react';
import { DataContext } from '../Context/DataContext';


export default function RecentMeeting() {
  const { getData } = useContext(DataContext)

  return (
    <div className='border p-2 rounded-lg'>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-lg font-semibold'>
          Recent Meets <span className='text-sm font-bold px-[4px] py-[2px] border rounded-md '>{getData.filter((ele) => ele.category === 'meeting').length}</span>
        </p>
        <div>
          <Link to='/all-tasks' className='flex items-center text-blue-500 hover:text-blue-700'>
            All Meets <FaAngleRight className='ml-1' />
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        {getData.filter((ele) => ele.category === 'meeting').slice(0, 4).map((ele, id) => {
          const date = new Date(ele.deadline)
          const hours = date.getHours()
          const minutes = date.getMinutes()
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12;
          const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
          const time = `${formattedHours}:${formattedMinutes}`
          return (
            <div key={id} className="border rounded-lg p-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-300">{ampm}</p>
                  <p className="text-2xl font-bold">{time}</p>
                </div>
                <div className="text-blue-600 border rounded-full p-1 bg-blue-300">
                  <FaDiscord size={24} />
                </div>
              </div>
              <p className="text-gray-300 text-xs">{ele.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
