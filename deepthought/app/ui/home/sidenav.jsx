import React from 'react';

export default function Sidenav(){
  return (
    <div className="sidenav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="chat">Chat</a></li>
        <li><a href="login">login</a></li>
      </ul>
      <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
    </div>
  );
};