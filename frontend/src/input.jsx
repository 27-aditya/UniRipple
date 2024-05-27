import React from "react";

function Input (props) {
  return (
    <input {...props} className={"bg-cutcolor-darkgrey text-cutcolor-blue p-2 border border-gray-900 mr-5 ml-5 rounded-md block mb-2"}/>
  );
}

export default Input;