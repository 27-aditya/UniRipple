import React, { useState } from 'react';
import './App.css';
import Header from './header';
import PostForm from './postform';
import Thread from './thread';
import AuthModal from './authmodal.jsx';
import Posts from './post.jsx';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(true);

  const handleClose = () => {
    setShowAuthModal(false);
  };

  return (
    <div>
      <Header/>
      <PostForm/>
      <Thread/>
      <Posts/>
    </div>
  );
}

export default App;
