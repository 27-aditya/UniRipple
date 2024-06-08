import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts', { withCredentials: true });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const Post = ({ post }) => {
  const [commentBody, setCommentBody] = useState('');
  const [comments, setComments] = useState(post.Comments);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentBody) return;

    try {
      const response = await axios.post(
        'http://localhost:4000/comments',
        { postId: post.id, userId: 1, body: commentBody }, // Replace userId: 1 with actual userId
        { withCredentials: true }
      );
      setComments([...comments, response.data]);
      setCommentBody('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p className="mt-2">{post.content}</p>
      <p className="text-gray-600 mt-2"><strong>Author:</strong> {post.User.username}</p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const Comment = ({ comment }) => {
  return (
    <div className="border-t border-gray-200 pt-2 mt-2">
      <p>{comment.body}</p>
      <p className="text-gray-600"><strong>Author:</strong> {comment.User ? comment.User.username : 'Unknown'}</p>
    </div>
  );
};

export default Posts;
