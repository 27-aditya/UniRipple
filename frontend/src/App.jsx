import React from 'react';
import './App.css';
import Header from './header';
import PostForm from './postform';
import Thread from './thread';
import AuthModal from './authmodal.jsx';

function App() {
  return (
    <div>
      <Header/>
      <PostForm/>
      <AuthModal/>
      <Thread/>
    </div>
  );
}

export default App; 