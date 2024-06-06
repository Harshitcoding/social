import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  const handleImageClick = () => {
    navigate('/post');
  };
   
  const sky = () => {
    navigate('/')
  }
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4">
      <button onClick={sky} className="text-3xl font-bold">Sky</button>
      <button className="w-10 h-10 flex items-center justify-center" onClick={handleImageClick}>
        <img src="https://cdn-icons-png.flaticon.com/256/32/32339.png" alt="Profile" className="w-6 h-6" />
      </button>
      <div className="cursor-pointer w-10"><img src="https://firebasestorage.googleapis.com/v0/b/social-73c90.appspot.com/o/images%2FScreenshot%202024-06-06%20125804.png?alt=media&token=66834f3b-e0cf-4de8-82c5-67e322db987c"  /></div>
    </div>
    
  );
}

export default Navbar;
