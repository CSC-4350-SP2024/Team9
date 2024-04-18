import React from 'react';

const PendingRequestsComponent = ({ pendingRequests }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mt-8 mb-2">Pending Requests</h2>
      <ul className="w-full max-w-md">
        {pendingRequests.map(request => (
          <li key={request.id} className="bg-white my-2 p-4 rounded shadow-md">
            {request.sender ? `${request.sender.username} - Pending` : 'Unknown Sender'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingRequestsComponent;



