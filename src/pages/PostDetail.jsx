import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { FaStar, FaHeart } from "react-icons/fa";

const PostDetail = () => {
    const {id} = useParams();

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);

    const fetchData = async() => {
        const {data} = await supabase
                                .from('Posts')
                                .select()
                                .order('created_at', { ascending: true})
        setPosts(data);
        const post = posts.filter(item => item.id == id)[0];
        setPost(post);
    }
    fetchData();
    return (
        <div>
            {post && (
                <form>
                    <label id="course_name">Course Name: {post.course_name}</label> 
                    <br />
            
                    <label id="subject">Subject: {post.subject} </label>
                    <br />
            
                    <label id="prof_name">Professor Name: {post.prof_name}</label> 
                    <br />
            
                    <label for="course-rating">This Course's Rating: 
                        {[1,2,3,4,5].map((ratingValue) => (
                            <span 
                                key={ratingValue} 
                                id="course-rating" 
                            >
                            <FaStar 
                                color={(post.course_rating) >= ratingValue ? "#ffc107" : "#e4e5e9"} 
                                        size={30}
                                />
                            </span>      
                        ))} </label> 
            
                    <label for="prof-rating"> This Professor's Rating: 
                        {[1,2,3,4,5].map((ratingValue) => (
                            <span 
                                key={ratingValue} 
                                id="prof-rating" 
                            >
                            <FaHeart 
                                color={(post.prof_rating) >= ratingValue ? "#F44336" : "#e4e5e9"} 
                                        size={30}
                                />
                                </span>      
                            ))} </label> 
                            
            
                            <label for="comment">Comment: </label>
                            <p id="comment">{post.comment}</p>
            
                        </form>
            )}
        </div>
    )
}

export default PostDetail;