import React from 'react';

const PendingRequestsComponent = ({ pendingRequests, classmates, setClassmates }) => {

  const handleAddFriend = async (senderId, requestId) => {
    try {
      const response = await fetch('/api/acceptFriendRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId, requestId }), 
      });
      setClassmates(classmates.filter(classmate => classmate.id !== senderId));
      if (!response.ok) {
        throw new Error('Failed to add friend');

      } 
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectRequest = async (requestId, senderId) => {
    try {
      const response = await fetch('/api/rejectFriendRequest', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });
      const userResponse = await fetch('/api/user');
      const userData = await handleResponse(userResponse);

      const classmatesResponse = await fetch('/api/classmates');
      const classmatesData = await handleResponse(classmatesResponse);
      const filteredClassmates = classmatesData.classmates.filter(classmate => classmate.id !== userData.user?.id);
      setClassmates(filteredClassmates);

      if (!response.ok) {
        throw new Error('Failed to reject request');
      }
    } catch (error) {
      console.error(error);
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
    <div>
      <h2 className="text-xl font-bold mt-8 mb-2">Pending Requests</h2>
      <ul className="w-full max-w-md">
        {pendingRequests.map(request => (
          <><div key={request.id} className="bg-white my-4 p-4 rounded shadow-md">
           <li className='font-bold'>{request.sender ? `${request.sender.username} - Pending` : 'Unknown Sender'}</li> 
           <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleAddFriend(request.sender.id, request.id)}>Accept</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleRejectRequest(request.id, request.sender.username)}>Reject</button>
          </div>
          </div></>
        ))}
      </ul>
    </div>
  );
};

export default PendingRequestsComponent;



