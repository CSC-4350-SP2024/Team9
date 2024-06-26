import React from 'react';

const FriendsComponent = ({ friends, classmates, setClassmates }) => {

  const handleRemoveFriend = async (friendId) => {
    try {
      const response = await fetch('/api/removeFriend', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId }),
      });
      const userResponse = await fetch('/api/user');
      const userData = await handleResponse(userResponse);

      const classmatesResponse = await fetch('/api/classmates');
      const classmatesData = await handleResponse(classmatesResponse);
      const filteredClassmates = classmatesData.classmates.filter(classmate => classmate.id !== userData.user?.id);
      setClassmates(filteredClassmates);
      if (!response.ok) {
        throw new Error('Failed to remove friend');
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
      <h2 className="text-2xl font-bold text-gray-900 my-8">Friends</h2>
      <ul className="w-full max-w-md">
        {friends.map(friend => (
          
          <><div className='bg-white my-2 p-4 rounded shadow-md'>
            <h3 key={friend.id} className="font-bold">
            {friend.friend.username}</h3>
            <li>Phone Number: {friend.friend.phone_number}</li>
            <li>Discord: {friend.friend.discord_name}</li>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleRemoveFriend(friend.friend.id)}>Delete</button></div></>
        ))}
      </ul>
    </div>
  );
};

export default FriendsComponent;
