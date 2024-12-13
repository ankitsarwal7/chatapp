import React from "react";
 
import logo from "../componenets/assests/logo.png"
const AuthLayout = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center py-2 h-20 shadow-md bg-gray-400">
        <div><img src={logo} 
        alt="logo"
        width={180}
        height={60}
         /></div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
