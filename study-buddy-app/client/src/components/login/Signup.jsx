import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        navigate('/login');
      } else {
        console.error("Signup failed!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="w-full h-lvh pt-12 bg-slate-50 flex justify-center">
      <form className="mt-6" onSubmit={handleSignup}>
        <h1 className="text-3xl font-semibol text-center text-black pb-4">Sign Up</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold text-center text-black">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="block w-64 px-4 py-2 mt-2 text-black bg-white border-2 border-black rounded-xl focus:border-purple-400 focus:ring-purple-300 focus:outline-none"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-center text-black">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="block w-64 px-4 py-2 mt-2 text-black bg-white border-2 border-black rounded-xl focus:border-purple-400 focus:ring-purple-300 focus:outline-none"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-center text-black">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="block w-64 px-4 py-2 mt-2 text-black bg-white border-2 border-black rounded-xl focus:border-purple-400 focus:ring-purple-300 focus:outline-none"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="success">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;


