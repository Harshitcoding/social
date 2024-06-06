import React, { useState } from 'react';
import axios from 'axios';
import { backend_Url } from '../config';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${backend_Url}/api/v1/user/signups`, {
        name,
        email,
        password,
      });
      const jwt = response.data;

      // Store JWT token in local storage
      localStorage.setItem("token", jwt);

      navigate("/");
    } catch (error) {
      console.error('Signup error:', error);
      // Implement proper error handling (e.g., display user-friendly error messages)
    }
  };

  return (
    <div className="signup-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 ">
      <h1 className="text-3xl font-bold mb-6 text-white">Sign Up</h1>
      <div className="w-full max-w-md space-y-4">
        <div className="name-field flex items-center border border-black rounded px-3 py-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
          />
        </div>
        <div className="email-field flex items-center border border-black rounded px-3 py-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
          />
        </div>
        <div className="password-field flex items-center border border-black rounded px-3 py-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
          />
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
