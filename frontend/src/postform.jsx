import React, { useState } from 'react';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission
    console.log('Post submitted:', { title, content });
    // Reset form fields
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={formGroupStyle}>
        <label htmlFor="title" style={labelStyle}>Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="content" style={labelStyle}>Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
        />
      </div>
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
}

// CSS-in-JS styles
const formStyle = {
  position:'relative',
  left: '0',
  display: 'flex-inline',
  flexDirection: 'row',
  margin: '80px auto 20px',
  height:'100px',
  width: '100%', 
  padding: '20px',
  boxSizing: 'border-box',
  border: '1px solid #ccc',
  borderRadius: '8px',
  paddingleft: '20px',
};

const formGroupStyle = {

  marginBottom: '15px',
  marginRight: '15px',
  height: '30px',
};

const labelStyle = {
  backgroundColor: '#333',
  marginBottom: '5px',
  marginRight: '5px',
  fontWeight: 'bold',
  transform: 'translateX(-50%)',
};

const inputStyle = {
  marginRight: '5px',
  width: '50vh',
  height: '30px',
  padding: '8px',
  boxSizing: 'border-box',
};

const textareaStyle = {

  color: '#000',  
  width: '100vh',
  height: '30px',
  padding: '8px',
  boxSizing: 'border-box',
};

const buttonStyle = {

  height: '50px',
  padding: '10px 15px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  
};

export default PostForm;
