import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classList, setClassList] = useState([]);
  const [showClasses, setShowClasses] = useState(false);
    const [errorText, setErrorText] = useState('')


  useEffect(() => {

    fetchClassList(); 
    fetchClasses();
    fetchUser();
  }, []);
  

  const fetchClassList = async () => {
    try {
      const response = await fetch('/api/getClassList');
      if (response.ok) {
        const data = await response.json();
        setClassList(data);
        setShowClasses(true); 
      } else {
        throw new Error('Failed to fetch class list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch user data');
    }
  })
  .then(data => {
    setUser(data.user);
  })
  .catch(error => {
    console.error('Error fetching user data:', error.message);
  });
  }

  const handleAddClass = async () => {
    try {
      const response = await fetch('/api/addClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class_name: selectedClass }), 
      });
      if (response.ok) {
  
        fetchClasses();
        fetchClassList();
        setErrorText("");

        setClassList(prevClassList => prevClassList.filter(className => className !== selectedClass));

        setSelectedClass('');
      } else {
        setErrorText("Class has already been added");
        throw new Error('Failed to add class');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/getUserClasses');
      if (response.ok) {
        const data = await response.json();
  
        setClasses(data);
      } else {
        throw new Error('Failed to fetch classes');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveClass = async (classId) => {
    try {
      const response = await fetch('/api/removeClass', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classId }),
      });
      if (response.ok) {
        setClasses(classes.filter(classItem => classItem.class_id !== classId));
        fetchClassList();
      } else {
        throw new Error('Failed to remove class');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 h-screen">
      <h1 className="text-2xl font-bold text-gray-900 my-8">Welcome, {user && user.username}</h1>

      {showClasses && (
        <div className="w-full max-w-md">
          {classes.map((classItem) => (
            <div key={classItem.class_id} className="bg-white my-4 p-4 rounded shadow-md w-full flex justify-between items-center">
              <p className="text-lg font-semibold">{classItem.class_name}</p>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"><Link to={`/chatPage/${classItem.class_id}`}>Chat</Link></button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleRemoveClass(classItem.class_id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className=' text-red-500 mb-8'>{errorText}</p>

      <div className="flex justify-center items-center">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="mt-8 mr-3 px-6 py-3 border border-gray-300 rounded-md"
          style={{ minWidth: "200px" }} 
        >
          <option value="">Select a class</option>
          {classList.map((class_name) => (
            <option key={class_name} value={class_name}>{class_name}</option>
          ))}
        </select>
        <button onClick={handleAddClass} disabled={!selectedClass} className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600" style={{ minWidth: "150px" }}>Add Class</button>
      </div>
    </div>
  );
};

export default Dashboard;
