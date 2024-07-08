import React, { useState } from 'react';
import './App.css';
import Header from './header';
import AuthModal from './authmodal.jsx';
import Posts from './post.jsx';

function App() {

  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false);
    console.log('handleCloseModal called');
  };

  return (
    <div>
      <Header/>
      {showModal && <AuthModal show={showModal} onClose={handleCloseModal}/>}
      <Posts/>
      </div>
  );
}

export default App;
    