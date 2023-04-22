import React, { useState, useEffect } from 'react';
import Post from '../components/post';
import { supabase } from '../client';
import './Home.css'

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await supabase
                                    .from('Posts')
                                    .select()
                                    .order('created_at', { ascending: true})
            setPosts(data);
        }
        fetchData();
    }, [posts]);
    return(
        <div className="home-page">
            {
            posts && posts.length > 0 ? 
            posts.map((post, index) => 
            <Post id={post.id} course_name={post.course_name} prof_name={post.prof_name} created_at={post.created_at} vote_count={post.voteCount} />)
            :
            <h2>No Ratings Yet</h2>}
        </div>
    )
}

export default Home;
