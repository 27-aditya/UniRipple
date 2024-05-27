import Logo from './handshake.svg';
import User from './user.svg';
import Button from './button.jsx';
import React, { useState } from 'react';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <header className='w-full bg-cutcolor-darkgrey p-2'>
        <div className='mx-4 flex'>
          <img src={Logo} className="w-8 h-8 mr-4 ml-2" alt="logo" />
          <h1 className='text-2xl font-bold text-gray-300 px-3'>UniVerse</h1>
          <div className="flex flex-auto">
            <Button className="flex ml-auto mr-2 border border-gray-900 rounded-full p-1">Log In</Button>
            <Button className="flex ml-2 border border-gray-900 rounded-full p-1">Sign Up</Button>
          </div>
          <div className='flex ml-4 relative'>
            <button className="w-7 h-7 rounded-md ml-2" onClick={toggleDropdown}>
              <img src={User} alt="usericon" />
            </button>
            {dropdownVisible && (
              <div className="absolute w-40 right-0 top-9 bg-cutcolor-blue z-10 border border-gray-900 rounded-md overflow-hidden">
                <button className="block w-full text-left py-2 px-3 hover:bg-gray-700 hover:text-white text-sm">
                  Log In / Sign Up  UwU
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
