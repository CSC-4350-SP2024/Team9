import React, { useState } from 'react';
import Button from './Button'; // Import the Button component if not already imported
import { useHistory } from 'react-router-dom';

const Profile = () => {
  // Example state for user information
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    enrolledClasses: ['Math', 'Science'],
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user information in the backend or perform other actions
    console.log('Form submitted:', userInfo);
    // Redirect to another page after form submission
    history.push('/'); // Redirect to the home page
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const history = useHistory();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-lg">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-lg">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-lg">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-lg">Enrolled Classes</label>
          {userInfo.enrolledClasses.map((classItem, index) => (
            <div key={index}>
              <input type="checkbox" checked readOnly className="mr-2" />
              <span>{classItem}</span>
            </div>
          ))}
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default Profile;
