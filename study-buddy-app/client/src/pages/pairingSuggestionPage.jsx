 import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const PairingSuggestionPage = () => {
  const [user, setUser] = useState(null);
  const [classmates, setClassmates] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [formData, setFormData] = useState({ message_request: '', receiver_id: '' });

  useEffect(() => {
  // Fetch user data
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

  // Fetch classmates
  fetch('/api/classmates', {
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
      throw new Error('Failed to fetch classmates');
    }
  })
  .then(data => {
    // Filter out the logged-in user from classmates
    const filteredClassmates = data.classmates.filter(classmate => classmate.id !== user?.id);
    setClassmates(filteredClassmates);
  })
  .catch(error => {
    console.error('Error fetching classmates:', error.message);
  });
    
    fetch('/api/getPendingRequests', {
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
      throw new Error('Failed to fetch pending requests');
    }
  })
  .then(data => {
    // setPendingRequests(data.pendingRequests); its saying pendingRequests is undefined
  })
  .catch(error => {
    console.error('Error fetching pending requests:', error.message);
  });
  }, [user]);
  
  const handleRequestCreation = async (classmateID) => {
    setFormData({ receiver_id: classmateID });
    try {
      const response = await fetch('/api/createRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Could not create request');
      }
 
    } catch (err) {
      console.error('Error while creating request',err);
    }
  };


  return (
    <div className="flex flex-col items-center bg-slate-100 min-h-screen p-8">
      <h2 className="text-2xl font-bold text-gray-900 my-8">Friends</h2> 
      <ul className="w-full max-w-md">
        {friends.map(friend => (
          <li key={friend.id} className="bg-white my-2 p-4 rounded shadow-md">{friend.username}</li>
        ))}
      </ul>
    

      <h2 className="text-xl font-bold mt-8 mb-2">Pending Requests</h2>
      <ul className="w-full max-w-md">
        {pendingRequests.map(request => (
          <li key={request.id} className="bg-white my-2 p-4 rounded shadow-md">{request.sender.username} - Pending</li>
        ))}
      </ul>

        <h1 className="text-xl font-bold mt-8 mb-2">People You May Know</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {classmates.map(classmate => (
          <div key={classmate.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{classmate.username}</h3>
            <p>Similar classes: {classmate.classes.map(classInstance => classInstance.class_name).join(', ')}</p>
            {!friends.some(friend => friend.id === classmate.id) && 
              !pendingRequests.some(request => request.receiverId === classmate.id) &&
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleRequestCreation(classmate.id)}>Send Request</button>
            }
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default PairingSuggestionPage;