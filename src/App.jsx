import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Post from './components/Post';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import BlogPost from './components/BlogPost';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute element={Home} />} /> {/* Use PrivateRoute */}
          <Route path="/post" element={<PrivateRoute element={Post}/>} />
          <Route path='/blog/:id' element = {<BlogPost/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
