import React, { useState, useEffect } from 'react';
import FriendsComponent from '../components/pairing/FriendsComponent';
import PendingRequestsComponent from '../components/pairing/PendingRequestsComponent';
import ClassmatesComponent from '../components/pairing/ClassmatesComponent';

const PairingSuggestionPage = () => {
  const [user, setUser] = useState(null);
  const [classmates, setClassmates] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [formData, setFormData] = useState({ message_request: '', receiver_id: '' });
  const [requestSentMap, setRequestSentMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/user');
        const userData = await handleResponse(userResponse);
        setUser(userData.user);

        // Fetch classmates
        const classmatesResponse = await fetch('/api/classmates');
        const classmatesData = await handleResponse(classmatesResponse);
        const filteredClassmates = classmatesData.classmates.filter(classmate => classmate.id !== userData.user?.id);
        setClassmates(filteredClassmates);

        // Fetch pending requests
        const pendingRequestsResponse = await fetch('/api/getPendingRequests');
        const pendingRequestsData = await handleResponse(pendingRequestsResponse);
        setPendingRequests(pendingRequestsData);

        // Fetch friends
        const friendsResponse = await fetch('/api/friends');
        const friendsData = await handleResponse(friendsResponse);
        setFriends(friendsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleSendRequest = async (classmateID) => {
    try {
      const response = await fetch('/api/createRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiver_id: classmateID }),
      });

      if (response.ok) {
    
        setRequestSentMap(prevMap => ({ ...prevMap, [classmateID]: true }));
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      console.error('Error while sending request:', error);
    }
  };

  const handleResponse = async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 min-h-screen p-8">
      <FriendsComponent friends={friends} />
      <PendingRequestsComponent pendingRequests={pendingRequests} />
      <ClassmatesComponent classmates={classmates} friends={friends} requestSentMap={requestSentMap} handleSendRequest={handleSendRequest} />
    </div>
  );
};

export default PairingSuggestionPage;


