import { Link } from 'react-router-dom';
import { FaStopwatch } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

export default function RecentTask() {
  return (
    <div className='border p-2 rounded-lg'>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-lg font-semibold'>
          Recent Tasks <span className='text-sm font-bold px-[4px] py-[2px] border rounded-md '>3</span>
        </p>
        <div>
          <Link to='/all-tasks' className='flex items-center text-blue-500 hover:text-blue-700'>
            All Tasks <FaAngleRight className='ml-1' />
          </Link>
        </div>
      </div>

      <div className='flex flex-col gap-2'>

        <div className='border rounded-lg p-2'>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold '>Buy Sticker</p>
            <div className=''>
              <FaStopwatch size={22} />
            </div>
          </div>
          <div className='flex gap-2 text-sm text-gray-500'>
            <p className='text-blue-400  rounded-md'>Personal</p>
            <p className='text-yellow-400  rounded-md'>High</p>
            <p className='text-green-400 rounded-md'>In-Progress</p>
          </div>
        </div>
        <div className='border rounded-lg p-2'>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold '>Buy Sticker</p>
            <div className=''>
              <FaStopwatch size={22} />
            </div>
          </div>
          <div className='flex gap-2 text-sm text-gray-500'>
            <p className='text-blue-400  rounded-md'>Personal</p>
            <p className='text-yellow-400  rounded-md'>High</p>
            <p className='text-green-400 rounded-md'>In-Progress</p>
          </div>
        </div>
        <div className='border rounded-lg p-2'>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold '>Buy Sticker</p>
            <div className=''>
              <FaStopwatch size={22} />
            </div>
          </div>
          <div className='flex gap-2 text-sm text-gray-500'>
            <p className='text-blue-400  rounded-md'>Personal</p>
            <p className='text-yellow-400  rounded-md'>High</p>
            <p className='text-green-400 rounded-md'>In-Progress</p>
          </div>
        </div>


      </div>

    </div>
  );
}
