import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostFormModal from './postformmodal';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/posts', { withCredentials: true });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = () => {
    fetchPosts(); // Fetch posts again after a new post is submitted
    setShowPostForm(false);
  };

  const handleClosePostForm = () => {
    setShowPostForm(false);
  };

  const handleCommentSubmit = async (postId, commentBody, setCommentBody) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/comments',
        { postId, userId: 15, body: commentBody }, // Replace userId with actual logged-in user ID
        { withCredentials: true }
      );

      const newComment = response.data;

      // Update posts state to reflect the new comment
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            Comments: [...post.Comments, newComment],
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      setCommentBody(''); // Clear comment input field after submission

    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <button
        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-4"
        onClick={() => setShowPostForm(true)}
      >
        Create Post
      </button>
      {showPostForm && (
        <PostFormModal show={showPostForm} onClose={handleClosePostForm} onPostSubmit={handlePostSubmit} />
      )}
      {posts.map(post => (
        <Post key={post.id} post={post} onCommentSubmit={handleCommentSubmit} />
      ))}
    </div>
  );
};

const Post = ({ post, onCommentSubmit }) => {
  const [commentBody, setCommentBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentBody) return;
    try {
      await onCommentSubmit(post.id, commentBody, setCommentBody);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <h3 className="text-lg text-gray-600">Author: {post.User ? post.User.username : 'Unknown'}</h3>
      <p className="mt-2">{post.content}</p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        {post.Comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <form onSubmit={handleSubmit} className="mt-4">
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
  const authorName = comment.User && comment.User.username ? comment.User.username : 'Unknown';

  return (
    <div className="border-t border-gray-200 pt-2 mt-2">
      <p>{comment.body}</p>
      <p className="text-gray-600"><strong>Author:</strong> {authorName}</p>
    </div>
  );
};

export default Posts;

