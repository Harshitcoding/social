import axios from 'axios';
import React, { useState } from 'react';
import { backend_Url } from '../config';
import { useNavigate } from 'react-router-dom';
function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${backend_Url}/api/v1/user/signins`, {
        email,
        password,
      });
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/");
    } catch (error) {
      console.error('Signin error:', error);
      // Handle errors appropriately (e.g., display error messages to user)
    }
  };

  return (
   
    
        <div className="signin-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 ">
            <h1 className="text-3xl font-bold mb-6 text-white">Sign In</h1>
      <div className="w-full max-w-md space-y-4">
        <div className="email-field flex items-center border border-black rounded px-3 py-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="password-field flex items-center border border-black rounded px-3 py-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ">
          Sign In
        </button>
      </div>
    </div>
   
  );
}

export default Signin;