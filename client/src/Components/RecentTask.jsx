import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';


export default function RecentTask() {
  const { getData } = useContext(DataContext)

  return (
    <div className='border p-2 rounded-lg'>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-lg font-semibold'>
          Recent Tasks <span className='text-sm font-bold px-[4px] py-[2px] border rounded-md '>{getData.filter((ele) => ele.category === 'task').length}</span>
        </p>
        <div>
          <Link to='/all-tasks' className='flex items-center text-blue-500 hover:text-blue-700'>
            All Tasks <FaAngleRight className='ml-1' />
          </Link>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {getData.filter((ele) => ele.category == 'task').slice(0, 3).map((ele, id) => (
          <div key={id} className="border rounded-lg p-2">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">{ele.title.substring(0, 24)}...</p>
              <div>
                <CountdownTimer deadline={ele.deadline} />
              </div>
            </div>
            <div className="flex gap-2 text-sm text-gray-500">
              <p className="text-blue-400 rounded-md">{(ele.category)}</p>
              <p className="text-yellow-400 rounded-md">{ele.priority}</p>
              <p className="text-green-400 rounded-md">{ele.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(deadline));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="flex items-center">
      <p className="ml-2 text-sm">{timeLeft}</p>
    </div>
  );
}

function calculateTimeLeft(deadline) {
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  const timeDifference = deadlineDate - currentDate;

  if (timeDifference <= 0) {
    return 'Expired';
  }

  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDifference / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}