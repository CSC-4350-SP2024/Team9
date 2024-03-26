import React from 'react'


export const Home = () => {

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-lg p-6 mx-auto bg-blue-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome to StudyBuddies!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Connect with other students to study together and ace your classes!
        </p>
      </div>
    </div>
  );
}

export default Home