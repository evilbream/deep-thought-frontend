import React from 'react';

export default function Sidenav(){
  return (
    <div className="sidenav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="chat">Chat</a></li>
        <li><a href="login">login</a></li>
        <li><a href="register">register</a></li>
        <li><a href="profile">My profile</a></li>
        <li><a href="logout">log out</a></li>
      </ul>
    </div>
  );
};