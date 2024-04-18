import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({onLogin}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorText, setErrorText] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
         setErrorText("Incorrect username or password");
        throw new Error('Login failed');
      }
      onLogin();
      navigate('/dashboard');
 
    } catch (err) {
      console.error('Error during login',err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
         <p className=' text-red-500 mb-8'>{errorText}</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

