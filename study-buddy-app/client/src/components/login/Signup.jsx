import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ onLogin }) => {
  const [errorText, setErrorText] = useState('')
  const [formData, setFormData] = useState({ email: '', username:'', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
         setErrorText("Email or username already in use, please enter another");
        throw new Error('Failed to sign up. Please try again.');
      }
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      console.error('Error during signup:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
         <p className=' text-red-500 mb-8'>{errorText}</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-semibold">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;



