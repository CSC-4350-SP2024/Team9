import React, { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '*********',
    discord: 'john_doe#1234',
    phone: '123-456-7890'
  });
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [availableClasses, setAvailableClasses] = useState(['CSC 101', 'CSC 102', 'CSC 103', 'CSC 104', 'CSC 105', 'CSC 106']);

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

  return (
    <div className="flex flex-col items-center bg-slate-100">
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div className="w-full max-w-md mx-auto space-y-10">
        <div className="bg-white shadow-md p-4 mt-4 rounded-lg">
          <div className="flex justify-between  items-center mb-4">
            <h1 className="text-xl font-bold">Profile Information</h1>
            <button onClick={handleEdit} className="text-blue-500 hover:underline">
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          <div>
            <p>Name: {isEditing ? <input type="text" name="name" value={profileInfo.name} onChange={handleInputChange} /> : profileInfo.name}</p>
            <p>Email: {isEditing ? <input type="email" name="email" value={profileInfo.email} onChange={handleInputChange} /> : profileInfo.email}</p>
            <p>Password: {isEditing ? <input type="password" name="password" value={profileInfo.password} onChange={handleInputChange} /> : '*********'}</p>
            <p>Discord: {isEditing ? <input type="text" name="discord" value={profileInfo.discord} onChange={handleInputChange} /> : profileInfo.discord}</p>
            <p>Phone: {isEditing ? <input type="tel" name="phone" value={profileInfo.phone} onChange={handleInputChange} /> : profileInfo.phone}</p>
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-bold">Enrolled Classes</h2>
          <ul className="space-y-2">
            {enrolledClasses.map((className, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{className}</span>
                <button onClick={() => handleRemoveClass(className)} className="text-red-500 hover:underline">Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-bold">Available Classes</h2>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Select a class</option>
            {availableClasses.map((className, index) => (
              <option key={index} value={className}>{className}</option>
            ))}
          </select>
          <button onClick={handleAddClass} className="ml-8 mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" disabled={!selectedClass}>
            Add Class
          </button>
        </div>
      </div>
    </div>
  );
}
