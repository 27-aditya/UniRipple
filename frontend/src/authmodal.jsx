import React from "react";
import Input from "./input";  
import Button from "./button";
import { useState } from "react";
import axios from "axios";

function AuthModal() {
  const [modalType,setModalType] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function register(e){
    e.preventDefault();
    const collegeDomain = "nitc.ac.in";
    const emailDomain = email.split('@')[1];
    console.log(emailDomain);
    if(emailDomain !== collegeDomain){
      alert('Please use your college email');
      return;
    }
    else{
      console.log('Email is valid');
    }
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-20 flex content-center fixed " style={{backgroundColor:'rgba(0,0,0,.6)'}}>
      <div className="bg-cutcolor-darkgrey w-3/4 sm:w-1/2 md:w-3/4 mx-auto flex flex-col text-cutcolor-lightgrey p-5 flex self-center w-full align-middle mx-4 rounded-xl">
        <h1 className="flex mb-3 mx-6 text-sky-400 text-xl">
          {modalType === "login" ? "LogIN" : "Register"}
        </h1>
        
        {modalType === "register" && (
          <Input type="text" placeholder="Email :]" className="mb-4 my-2" value={email} onChange={e => { setEmail(e.target.value); }}/>
        )}
        
        <Input type="text" placeholder="USERID :]" className="mb-4 my-2 " value={username} onChange={u => setUsername(u.target.value)}/>
        
        <Input type="password" placeholder="PASSWORD ;]" className="mb-3 my-2" value={password} onChange={p => setPassword(p.target.value)}/>
        
        {modalType === "login" &&(
          <Button >
            Log IN
          </Button>
        )}
          
        {modalType === "register" &&(
          <Button onClick={(e) => register(e)} >
            Sign UP
          </Button>
        )}

        {modalType == "login" && (
          <div className="text-gray-300 mx-5 mt-3">
            New Here? 
            <button className="text-cutcolor-blue" onClick={() => setModalType('register')} >Sign UP!!!</button>
          </div>
        )}
        
        {modalType == "register" && (
          <div className="text-gray-300 mx-5 mt-3">
            Already Have An Account? 
            <button className="text-cutcolor-blue" onClick={() => setModalType('login')} >Log IN!!!</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
