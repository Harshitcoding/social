// frontend/src/components/Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_Url } from '../config';
import Loading from './Loading';
import Like from './Like';
function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${backend_Url}/api/v1/post/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        setBlogs(response.data.posts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='flex justify-center mt-10'><Loading/></div>;
  }

  return (
    <div className="mt-10">
  <div className="flex justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map(blog => (
        <div key={blog.id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
          <div className="relative">
            <img src={blog.imageUrl} className="w-full h-64 object-cover rounded-t-lg"/>
            <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition duration-300"></div>
          </div>
          <div className="p-4">
            <h1 className="text-lg font-semibold text-gray-800  truncate">{blog.caption}</h1>
            <p className="text-sm text-gray-600"> - {new Date().toLocaleDateString()}</p>
            <div className="mt-4 flex justify-between items-center">
              <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                <Like /> Like
              </button>
              <a href={`/blog/${blog.id}`} className="text-blue-500 text-sm font-medium hover:underline">Read More</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default Home;
