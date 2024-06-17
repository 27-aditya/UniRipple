import React, { useState } from 'react';
import './App.css';
import Header from './header';
import PostForm from './postform';
import Thread from './thread';
import AuthModal from './authmodal.jsx';
import Posts from './post.jsx';
import PostFormModal from './postformmodal.jsx';

function App() {

  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false);
    console.log('handleCloseModal called');
  };

  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const handleClosePostFormModal = () => {
    setShowPostFormModal(false);
    console.log('handleClosePostFormModal called');
  };

  return (
    <div>
      <Header/>
      <PostForm onClick={() => setShowPostFormModal(true)}/>
      {showModal && <AuthModal show={showModal} onClose={handleCloseModal}/>}
      <Posts/>
      {showPostFormModal && <PostFormModal show={showPostFormModal} onClose={handleClosePostFormModal}/>}
    </div>
  );
}

export default App;
