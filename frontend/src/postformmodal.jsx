import React from "react";
import axios from "axios";

function PostFormModal({ show, onClose, onPostSubmit   }) {

  const postform = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const title = document.getElementById('title').value;
    console.log(title);
    const content = document.getElementById('content').value; 
    console.log(content);
    try {
      const result = await axios.post('http://localhost:4000/posts', {
        userId: user.id,
        title,
        content
      });
      console.log(result.data);
      if(result.status === 201){
        alert('Post Created Successfully');
        onClose();
        onPostSubmit();
      }else {
        console.error('Post creation was not successful', result.data);
      }
    } catch (error) {
      if (error.response) {
        console.error('There was an error creating the post!', error.response.data);
      } else if (error.request) {
        console.error("The request was made but no response was received", error.request);
      } else {
        console.error('Error', error.message);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60">
      <div className="modal flex items-center justify-center w-full h-full">
        <div className="modal-content mx-auto bg-gray-800 w-3/4 sm:w-1/2 md:w-1/3 p-5 flex flex-col text-gray-200 rounded-xl shadow-lg">
          <div className="modal-header flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Create a Post</h2>
            <button className="close text-gray-400 cursor-pointer text-xl" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body flex justify-center">
            <form className="w-full">
              <div className="form-group mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                <input type="text" id="title" name="title" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"/>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
                <textarea id="content" name="content" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"></textarea>
              </div>
              <button type="submit" onClick={postform} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostFormModal;
