import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthModal(props) {
  const [modalType, setModalType] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const visibleClass = props.show ? "visible" : "hidden";

  useEffect(() => {
    if (isRegistered || isLoggedIn) {
      props.onClose();
    }
  }, [isRegistered, isLoggedIn, props]);

  const register = async (e) => {
    e.preventDefault();
    const collegeDomain = "nitc.ac.in";
    const emailDomain = email.split('@')[1];
    //if (emailDomain !== collegeDomain) {
      //alert('Please use your college email');
      //return;
    //}
    try {
      const result = await axios.post('http://localhost:4000/register', {
        username,
        email,
        password
      });
      console.log(result.data);
      if(result.data.success){
        alert('Registered Successfully');
        setIsRegistered(true);
      }
      
    } catch (error) {
      console.error('There was an error registering the user!', error.response.data);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:4000/login', {
        username,
        password
      });
      console.log(result.data);
      if(result.data.success){
        alert('Logged in Successfully');
      setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('There was an error logging in the user!', error.response.data);
    }
  };

  return (
    <div className={`top-0 left-0 w-screen h-screen z-20 flex content-center fixed ${visibleClass}`} style={{ backgroundColor: 'rgba(0,0,0,.6)' }}>
      <div className="bg-cutcolor-darkgrey w-3/4 sm:w-1/2 md:w-3/4 mx-auto flex flex-col text-cutcolor-lightgrey p-5 self-center rounded-xl">
        <h1 className="flex mb-3 mx-6 text-sky-400 text-xl">
          {modalType === "login" ? "LogIN" : "Register"}
        </h1>

        {modalType === "register" && (
          <input type="text" placeholder="Email :]" className="mb-4 my-2" value={email} onChange={e => { setEmail(e.target.value); }} />
        )}

        <input type="text" placeholder="USERID :]" className="mb-4 my-2" value={username} onChange={e => setUsername(e.target.value)} />

        <input type="password" placeholder="PASSWORD ;]" className="mb-3 my-2" value={password} onChange={e => setPassword(e.target.value)} />

        {modalType === "login" && (
          <button onClick={login}>
            Log IN
          </button>
        )}

        {modalType === "register" && (
          <button onClick={register}>
            Sign UP
          </button>
        )}

        {modalType === "login" && (
          <div className="text-gray-300 mx-5 mt-3">
            New Here?
            <button className="text-cutcolor-blue" onClick={() => setModalType('register')}>Sign UP!!!</button>
          </div>
        )}

        {modalType === "register" && (
          <div className="text-gray-300 mx-5 mt-3">
            Already Have An Account?
            <button className="text-cutcolor-blue" onClick={() => setModalType('login')}>Log IN!!!</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
