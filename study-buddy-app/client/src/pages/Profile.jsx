import React, { useState, useEffect } from 'react';

export default function ProfilePage({ userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [availableClasses, setAvailableClasses] = useState(['CSC 101', 'CSC 102', 'CSC 103', 'CSC 104', 'CSC 105', 'CSC 106']);
  const [discord, setDiscord] = useState('');

  useEffect(() => {
    // Set initial profile information and enrolled classes
    setProfileInfo({
      name: userData.name,
      email: userData.email,
      password: '*********', // You can omit this if you don't want to show the password
      discord: userData.discord || '', // Initialize Discord to empty string if not provided
      phone: userData.phone || '' // Initialize phone to empty string if not provided
    });
    setEnrolledClasses(userData.enrolledClasses || []); // Initialize enrolled classes to empty array if not provided
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value
    });
  };

  const handleAddClass = () => {
    if (selectedClass) {
      setEnrolledClasses([...enrolledClasses, selectedClass]);
    }
  };

  const handleRemoveClass = (className) => {
    setEnrolledClasses(enrolledClasses.filter((c) => c !== className));
  };

  const handleSave = () => {
    // Send updated profile information to the backend
    // Example:
    // fetch('/api/profile', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(profileInfo)
    // })
    // .then(() => {
    //   console.log('Profile updated successfully');
    // })
    // .catch(error => {
    //   console.error('Error updating profile:', error);
    // });

    // For simplicity, let's just log the updated profile information for now
    console.log('Updated Profile:', profileInfo);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center bg-slate-100">
      <div className="w-full max-w-md mx-auto space-y-10">
        <div className="bg-white shadow-md p-4 mt-4 rounded-lg">
          <div className="flex justify-between  items-center mb-4">
            <h1 className="text-xl font-bold">Profile Information</h1>
            <button onClick={handleEdit} className="text-blue-500 hover:underline">
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          <div>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            {isEditing && <p>Password: *********</p>}
            {isEditing && (
              <>
                <p>Discord: <input type="text" name="discord" value={profileInfo.discord} onChange={handleInputChange} /></p>
                <p>Phone: <input type="tel" name="phone" value={profileInfo.phone} onChange={handleInputChange} /></p>
              </>
            )}
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-bold">Enrolled Classes</h2>
          <ul className="space-y-2">
            {enrolledClasses.map((className, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{className}</span>
                {isEditing && <button onClick={() => handleRemoveClass(className)} className="text-red-500 hover:underline">Remove</button>}
              </li>
            ))}
          </ul>
          {isEditing && (
            <div className="flex">
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">Select a class</option>
                {availableClasses.map((className, index) => (
                  <option key={index} value={className}>{className}</option>
                ))}
              </select>
              <button onClick={handleAddClass} className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" disabled={!selectedClass}>
                Add Class
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
