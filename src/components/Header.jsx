import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleImageClick = () => {
    navigate('/post');
  };

  const sky = () => {
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem('token');

    // Optionally, make an API call to the server to inform about the logout
    // fetch('/logout', { method: 'POST' });

    // Navigate the user to the login page
    navigate('/signin');
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4">
      <button onClick={sky} className="text-3xl font-bold">Sky</button>
      <button className="w-10 h-10 flex items-center justify-center" onClick={handleImageClick}>
        <img src="https://cdn-icons-png.flaticon.com/256/32/32339.png" alt="Profile" className="w-6 h-6" />
      </button>
      <div className="relative cursor-pointer w-10" onClick={toggleDropdown}>
        <img src="https://firebasestorage.googleapis.com/v0/b/social-73c90.appspot.com/o/images%2FScreenshot%202024-06-06%20125804.png?alt=media&token=66834f3b-e0cf-4de8-82c5-67e322db987c" />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
            <ul>
              <li>
                <button onClick={handleLogout} className="px-4 py-2 hover:bg-gray-200 w-full text-left">Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
