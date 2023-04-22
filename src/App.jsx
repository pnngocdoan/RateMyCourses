import { useState } from 'react'
import './App.css'
import { useRoutes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create",
      element: <CreatePost />,
    },
    {
      path: "/edit/:id",
      element: <EditPost />,
    },
    {
      path: "/post/:id",
      element: <PostDetail />,
    }
  ]);
  return(
    <div className="App">
      <div className="header">
        <h3>Course Ratings at College A</h3>
        <Link to="/"><button className="header-btn">Home</button></Link>
        <Link to="/create"><button className="header-btn">Rate a course</button></Link>
      </div>
      {element}
    </div>

  )
}

export default App
