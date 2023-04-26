import React from 'react';

const SimilarPosts = ({posts}) => {
  // Define the similarity threshold
  const similarityThreshold = 4.0;

  // Define the similarity score function
  const similarityScore = (post1, post2) => {
    const weightCourse = 0.4;
    const weightProfessor = 0.4;
    const weightVotes = 0.2;

    const courseScore = (post1.course_rating + post2.course_rating) / 2.0;
    const professorScore = (post1.professor_rating + post2.professor_rating) / 2.0;
    const votesScore = post1.num_votes + post2.num_votes;

    return weightCourse * courseScore + weightProfessor * professorScore + weightVotes * votesScore;
  };

  // Implement a BFS algorithm to find similar posts
  const similarPosts = [];
  const visited = new Set([posts.id]);
  const queue = [posts.id];
  while (queue.length > 0) {
    const currentPostId = queue.shift();
    const currentPost = posts[currentPostId];
    for (let id in posts) {
      if (id !== currentPostId && !visited.has(id)) {
        const otherPost = posts[id];
        const score = similarityScore(currentPost, otherPost);
        if (score >= similarityThreshold) {
          similarPosts.push(otherPost.title);
          visited.add(id);
          queue.push(id);
        }
      }
    }
  }

  // Return a list of similar post titles
  return (
    <div>
      <h3>Similar Posts:</h3>
      <ul>
        {similarPosts.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarPosts;
