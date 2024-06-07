import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Adjust the path as needed
import { v4 as uuidv4 } from 'uuid';
import { backend_Url } from '../config';
import { useNavigate } from 'react-router-dom';

function PostInput() {
  const [caption, setCaption] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate()
  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImageUpload(null); 
      return url;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageUrl = await uploadFile();

    if (imageUrl) {
      try {
        const response = await axios.post(
          `${backend_Url}/api/v1/post/post`,
          {
            caption,
            imageUrl,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log('Post created successfully:', response.data);
        // Handle successful submission
        setCaption('');
        setProgress(0);
        navigate('/')
      } catch (error) {
        console.error('Error creating post:', error);
        // Handle errors appropriately
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 rounded-lg shadow-md bg-white mt-64">
    <form onSubmit={handleSubmit}>
      <label for="caption" className="text-gray-700 font-medium">Caption:</label>
      <input
        type="text"
        id="caption"
        value={caption}
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-black"
        onChange={(event) => setCaption(event.target.value)}
        required
      />
  
      <label for="image" className="text-gray-700 font-medium mt-2">Image:</label>
      <input
        type="file"
        id="image"
        onChange={(event) => setImageUpload(event.target.files[0])}
        className="w-full px-3 py-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-black"
      />
  
      {progress > 0 && (
        <progress value={progress} max="100" className="w-full h-2 rounded-full bg-gray-200">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${progress}%` }}></div>
        </progress>
      )}
      <button type="submit" className="w-full py-2 px-4 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
        Create Post
      </button>
    </form>
  </div>
  );
}

export default PostInput;
