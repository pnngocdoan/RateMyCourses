import React, { useState, useEffect } from 'react';
import Post from '../components/post';
import { supabase } from '../client';
import './Home.css'
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("Newest");
    const fetchData = async() => {
        if (sort == "Newest") {
            const {data} = await supabase
                            .from('Posts')
                            .select()
                            .order('created_at', { ascending: false})
            setPosts(data);
        }
        else {
            const {data} = await supabase
                            .from('Posts')
                            .select()
                            .order('voteCount', { ascending: false})  
            setPosts(data);          
        }
    }
    useEffect(() => {
        fetchData();
        console.log(posts);
    }, [sort]);
    return(
        <div className="home-page">
            <div className="sort-container">
                <h4> Sorted by </h4>
                <button className="sort-btn" onClick={() => {
                    setSort("Newest");
               //     fetchData();
                }}>Newest</button>
                <button className="sort-btn" onClick={() => {
                    setSort("Popular");
                //    fetchData();
                }}>Popular</button>
            </div>
            <div className="posts-container">
                {
                posts && posts.length > 0 ? posts.map((post, index) => 
                    <Post key={post.id} id={post.id} course_name={post.course_name} prof_name={post.prof_name} created_at={post.created_at} vote_count={post.voteCount} />)
                :
                    <h2>No Ratings Yet</h2>
                }
            </div>

        </div>
    )
}

export default Home;
