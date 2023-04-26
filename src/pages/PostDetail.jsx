import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { FaStar, FaHeart } from "react-icons/fa";
import './PostDetail.css'
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
                <form className="form-container">
                    <p>Reviewed by Anonymous ID {post.id}</p>
                    <div className="field">
                        <h3 className="title">Course Name: </h3>
                        <h3 className="value">{post.course_name}</h3>
                    </div>
                    <div className="field">
                        <h3 className="title">Subject: </h3>
                        <h3 className="value">{post.subject}</h3>
                    </div>
                    <div className="field">
                        <h3 className="title">Professor Name: </h3>
                        <h3 className="value">{post.prof_name}</h3>
                    </div>
                    <div className="field">
                        <h3 className="title">This Course's Rating: 
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
                        ))} 
                        </h3>
                    </div>
                    <div className="field">
                        <h3 className="title"> This Professor's Rating: 
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
                            ))} 
                        </h3> 
                    </div>
                    <h3 className="title">Comment: </h3>
                    <h3 className="value">{post.comment}</h3>
            </form>
            )}
        </div>
    )
}

export default PostDetail;