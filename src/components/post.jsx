import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './post.css';
import { supabase } from '../client';

const Post = (props) => {
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [vote, setVote] = useState(props.vote_count);

    const updateVote = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({voteCount: vote + 1})
            .eq('id', props.id)
        setVote((vote) => vote + 1);
    }

    const deletePost = async(event) => {
        event.preventDefault();
        await supabase.from('Posts').delete().eq('id', props.id);
        window.location = "/";
    }

    const dateTime = new Date(props.created_at);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
    const formattedDateTime = `at ${hours}:${minutes} on ${month}/${day}/${year} `;

    return (
        <div className="card-container">
            <h2>{props.course_name}</h2>
            <h3>by {props.prof_name}</h3>
            <h5>Reviewed by Anonymous ID {props.id} {formattedDateTime}</h5>
            <button className="vote-btn" onClick={updateVote}>{vote} 👍</button>
            <div className="more-btn" onClick={() => setShowMoreMenu(!showMoreMenu)}>
                <div className="dots">...</div>
                {showMoreMenu && (
                    <div className="more-menu">
                        <p><Link to={"edit/" + props.id}>Edit Post</Link></p>
                        <p><Link to={"post/" + props.id}>Show Post</Link></p>
                        <p onClick={deletePost}>Delete Post</p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default Post;