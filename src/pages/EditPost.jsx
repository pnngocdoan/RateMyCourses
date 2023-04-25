import { React, useState, useEffect } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import './EditPost.css';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';


const EditPost = () => {
    const { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [subject, setSubject] = useState("");
    const subjects = ["General Education", "Arts", "Biology", "Chemistry", "Economics", "Environmental Studies", "Geography", "History", "Humanities", "International Studies", "Languages", "Literature", "Mathematics", "Philosophy", "Physics", "Political Science", "Psychology", "Social Behavioral Science", "Sociology", "Writing"]
    const [courseRating, setCourseRating] = useState(0);
    const [hoverCourseRating, setHoverCourseRating] = useState(0);
    const [profRating, setProfRating] = useState(0);
    const [hoverProfRating, setHoverProfRating] = useState(0);
    const [courseName, setCourseName] = useState("");
    const [profName, setProfName] = useState("");
    const [comment, setComment] = useState("");

    const fetchData = async () => {
        const { data } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: true })
        if (data) {
            const selectedPost = data.filter(item => item.id == id)[0];
            if (selectedPost) {
                setPost(selectedPost)
                setCourseRating(selectedPost.course_rating);
                setProfRating(selectedPost.prof_rating);
                setCourseName(selectedPost.course_name);
                setProfName(selectedPost.prof_name);
                setComment(selectedPost.comment);
            }
        };
    }

    fetchData();

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase.from('Posts')
            .update({
                course_name: courseName,
                subject: subject,
                prof_name: profName,
                course_rating: courseRating,
                prof_rating: profRating,
                comment: comment
            })
            .eq('id', id);

        window.location = "/";
    };

    return (
        <div>
            {post && (
                <form>

                    <label for="course_name">Course Name </label>
                    <input type="text" id="course_name" name="course_name" defaultValue={courseName} onChange={(e) => setCourseName(e.target.value)} />

                    <br />

                    <label for="subject">Subject </label>
                    <select className="input" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                        {subjects.map((eachsubject) => (
                            <option key={eachsubject} value={eachsubject}>{eachsubject}</option>
                        ))};
                    </select>

                    <br />

                    <label for="prof_name">Professor Name</label>
                    <input type="text" id="prof_name" name="prof_name" defaultValue={profName} onChange={(e) => setProfName(e.target.value)} />

                    <br />

                    <label for="course-rating">
                        Rate This Course
                        {[1, 2, 3, 4, 5].map((ratingValue) => (
                            <span
                                key={ratingValue}
                                id="course-rating"
                                onClick={() => {
                                    setCourseRating(ratingValue);
                                    console.log(`course rating updated: ${courseRating}, ${ratingValue}`)}}
                                onMouseEnter={() => setHoverCourseRating(ratingValue)}
                                onMouseLeave={() => setHoverCourseRating(0)}
                            >
                                <FaStar
                                    color={(hoverCourseRating || courseRating) >= ratingValue ? "#ffc107" : "#e4e5e9"}
                                    size={30}
                                    style={{ cursor: "pointer" }}

                                />
                            </span>
                        ))} </label>

                    <label for="prof-rating">
                        Rate This Professor
                        {[1, 2, 3, 4, 5].map((ratingValue) => (
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
                                    style={{ cursor: "pointer" }}
                                />
                            </span>
                        ))} </label>


                    <label for="comment">Comment</label>
                    <textarea id="comment" name="comment" defaultValue={comment} onChange={(e) => setComment(e.target.value)} />

                    <input type="submit" value="Submit" onClick={updatePost} />
                </form>
            )};
        </div>
    )
}

export default EditPost;
