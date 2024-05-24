import React from 'react';

function Thread({ title, content, upvotes, onUpvote, onComment }) {
  return (
    <div style={threadStyle}>
      <h2 style={titleStyle}>{title}</h2>
      <p style={contentStyle}>{content}</p>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={onUpvote}>Upvote {upvotes}</button>
        <button style={buttonStyle} onClick={onComment}>Comment</button>
      </div>
    </div>
  );
}

// CSS-in-JS styles
const threadStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '10px',
};

const contentStyle = {
  marginBottom: '10px',
};

const buttonContainerStyle = {
  display: 'flex',
};

const buttonStyle = {
  marginRight: '10px',
  padding: '8px 16px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Thread;
