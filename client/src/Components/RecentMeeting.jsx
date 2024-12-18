import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa6';

export default function RecentMeeting() {
  return (
    <div className='border p-2 rounded-lg'>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-lg font-semibold'>
          Recent Meets <span className='text-sm font-bold px-[4px] py-[2px] border rounded-md '>4</span>
        </p>
        <div>
          <Link to='/all-tasks' className='flex items-center text-blue-500 hover:text-blue-700'>
            All Meets <FaAngleRight className='ml-1' />
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <div className='border rounded-lg p-2'>
          <div className='flex justify-between items-center '>
            <div>
              <p className='text-sm text-gray-300'>AM</p>
              <p className='text-2xl font-bold'>11:00</p>
            </div>
            <div className='text-blue-600 border rounded-full p-1 bg-blue-300'>
              <FaDiscord size={24} />
            </div>
          </div>
          <p className='text-gray-300  text-xs'>Meeting with all group members</p>
        </div>
        <div className='border rounded-lg p-2'>
          <div className='flex justify-between items-center '>
            <div>
              <p className='text-sm text-gray-300'>AM</p>
              <p className='text-2xl font-bold'>11:00</p>
            </div>
            <div className='text-blue-600 border rounded-full p-1 bg-blue-300'>
              <FaDiscord size={24} />
            </div>
          </div>
          <p className='text-gray-300  text-xs'>Meeting with all group members</p>
        </div>
        <div className='border rounded-lg p-2'>
          <div className='flex justify-between items-center '>
            <div>
              <p className='text-sm text-gray-300'>AM</p>
              <p className='text-2xl font-bold'>11:00</p>
            </div>
            <div className='text-blue-600 border rounded-full p-1 bg-blue-300'>
              <FaDiscord size={24} />
            </div>
          </div>
          <p className='text-gray-300  text-xs'>Meeting with all group members</p>
        </div>
        <div className='border rounded-lg p-2'>
          <div className='flex justify-between items-center '>
            <div>
              <p className='text-sm text-gray-300'>AM</p>
              <p className='text-2xl font-bold'>11:00</p>
            </div>
            <div className='text-blue-600 border rounded-full p-1 bg-blue-300'>
              <FaDiscord size={24} />
            </div>
          </div>
          <p className='text-gray-300  text-xs'>Meeting with all group members</p>
        </div>
      </div>


    </div>
  );
}
