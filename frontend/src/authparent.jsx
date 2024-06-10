import React, { useState } from 'react';
import AuthModal from './authmodal';

function AuthParent() {
  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false);
    console.log('handleCloseModal called');
  };
  return (
    <div>
      {showModal && <AuthModal show={showModal} onClose={handleCloseModal} />}
    </div>
  );
}

export default AuthParent;
