import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";


const enrolledClasses = [
  { id: 1, name: 'CSC 101' },
  { id: 2, name: 'CSC 102' },
  { id: 3, name: 'CSC 103' },
];



export const Dashboard = () => {
   const [classes, setClasses] = useState([]);
  // const messages = [{id: 1, senderUsername: 'bob', messageContent: 'hello', timestamp: '12:00'}]

  const fetchInfo = async () => {
    return await fetch('/api/getClasses')
      .then((res) => res.json())
      .then((d) => setClasses(d))
  };

  useEffect(() => {
    fetchInfo();
  }, [classes]);
  return (
    <div className="flex flex-col items-center bg-slate-100">
      <h2 className="text-2xl font-bold text-gray-900 my-8">Dashboard</h2>

      <div className="w-full max-w-md">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white my-4 p-4 rounded shadow-md w-full flex justify-between items-center">
            <p className="text-lg font-semibold">{classItem.name}</p>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"><Link to={`/chatPage/${classItem.id}`}>Chat</Link></button>
            </div>
          </div>
        ))}
      </div>
    <div className='flex'>
      <button className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"><Link to="/profile"> Edit Profile Page</Link></button>

      <button className=" ml-4 mt-8 px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600">Study Buddy Pairing</button>
          </div>
          </div>
  );
}

export default Dashboard