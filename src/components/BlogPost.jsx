import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backend_Url } from '../config';
import Loading from './Loading';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`Fetching blog post with id: ${id}`);
    axios.get(`${backend_Url}/api/v1/post/post/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        console.log('Response from server:', response.data);
        setBlog(response.data.post);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className='flex justify-center mt-10'><Loading /></div>;
  }

  if (!blog) {
    return <div className="container mx-auto mt-10 p-5">Blog post not found</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
    <div className="blog-post max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={blog.imageUrl} alt={blog.caption} className="w-full h-96 object-cover" />
      <div className="p-6 content">
        <h1 className="text-3xl font-bold text-gray-800">{blog.caption}</h1>
        <p className="text-sm text-gray-600">by {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
        <div className="mt-4 text-gray-700 leading-relaxed">{blog.content}</div>
      </div>
      <div className="p-6 border-t border-gray-100 comments">
        <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800">Leave a comment</h3>
          <form className="mt-4">
            <textarea className="w-full h-32 text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your comment here..."></textarea>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}
export default BlogPost;
