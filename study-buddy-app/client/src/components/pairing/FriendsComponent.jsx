import React from 'react';

const FriendsComponent = ({ friends }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 my-8">Friends</h2>
      <ul className="w-full max-w-md">
        {friends.map(friend => (
          <li key={friend.id} className="bg-white my-2 p-4 rounded shadow-md">{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsComponent;
