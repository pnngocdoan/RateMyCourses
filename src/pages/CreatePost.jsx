import { React, useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
    const [subject, setSubject] = useState("");
    const subjects = ["General Education", "Arts", "Biology", "Chemistry", "Economics", "Environmental Studies", "Geography", "History", "Humanities", "International Studies", "Languages", "Literature", "Mathematics", "Philosophy", "Physics", "Political Science", "Psychology", "Social Behavioral Science", "Sociology", "Writing"]
    const [courseRating, setCourseRating] = useState(0);
    const [hoverCourseRating, setHoverCourseRating] = useState(0);
    const [profRating, setProfRating] = useState(0);
    const [hoverProfRating, setHoverProfRating] = useState(0);

    const createPost = async(event) => {
        event.preventDefault();
        const course_name = document.getElementById('course_name').value;
        const prof_name = document.getElementById('prof_name').value;
        const comment = document.getElementById('comment').value;

        console.log(course_name, subject, prof_name, courseRating, profRating, comment);
        await supabase.from('Posts')
                      .insert({
                            course_name: course_name,
                            subject: subject,
                            prof_name: prof_name,
                            course_rating: courseRating,
                            prof_rating: profRating,
                            comment: comment,
                            voteCount: 0})
                      .select();
        
        window.location = "/";

    };
    return(
        <div>
            <form>

                <label for="course_name">Course Name </label> 
                <input type="text" id="course_name" name="course_name" placeholder="Enter the course name"/>

                <br />

                <label for="subject">Subject </label>
                <select className="input" id="subject" onChange={(e) => setSubject(e.target.value)}>
                    {subjects.map((eachsubject) => (
                        <option key={eachsubject} value={eachsubject}>{eachsubject}</option>
                    ))};
                </select>

                <br />

                <label for="prof_name">Professor Name</label> 
                <input type="text" id="prof_name" name="prof_name" placeholder="Please follow the following format: Ngoc D." />

                <br />

                <label for="course-rating">
                Rate This Course 
                {[1,2,3,4,5].map((ratingValue) => (
                    <span 
                        key={ratingValue} 
                        id="course-rating" 
                        onClick={() => setCourseRating(ratingValue)} 
                        onMouseEnter={() => setHoverCourseRating(ratingValue)} 
                        onMouseLeave={() => setHoverCourseRating(0)} 
                    >
                        <FaStar 
                            color={(hoverCourseRating || courseRating) >= ratingValue ? "#ffc107" : "#e4e5e9"} 
                            size={30}
                            style={{cursor: "pointer"}}
                        />
                    </span>      
                ))} </label> 

                <label for="prof-rating">
                Rate This Professor 
                {[1,2,3,4,5].map((ratingValue) => (
                    <span 
                        key={ratingValue} 
                        id="prof-rating" 
                        onClick={() => setProfRating(ratingValue)} 
                        onMouseEnter={() => setHoverProfRating(ratingValue)} 
                        onMouseLeave={() => setHoverProfRating(0)} 
                    >
                        <FaHeart 
                            color={(hoverProfRating || profRating) >= ratingValue ? "#F44336" : "#e4e5e9"} 
                            size={30}
                            style={{cursor: "pointer"}}
                        />
                    </span>      
                ))} </label> 
                

                <label for="comment">Comment</label>
                <textarea id="comment" name="comment" placeholder="What do you think about this course taught by this professor?" />

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}
export default CreatePost;