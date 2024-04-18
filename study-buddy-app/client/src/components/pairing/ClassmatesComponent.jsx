import React from 'react';

const ClassmatesComponent = ({ classmates, friends, requestSentMap, handleSendRequest }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mt-8 mb-2">People You May Know</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {classmates.map(classmate => (
          <div key={classmate.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{classmate.username}</h3>
            <p>Similar classes: {classmate.classes.map(classInstance => {
              const classAbbreviation = classInstance.class_name.split(':')[0];
              return `${classAbbreviation} `;
            })}</p>
            {!friends.some(friend => friend.id === classmate.id) &&
              !requestSentMap[classmate.id] ? (
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleSendRequest(classmate.id)}>Send Request</button>
              ) : (
                <button className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-not-allowed" disabled>Request Sent</button>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassmatesComponent;

