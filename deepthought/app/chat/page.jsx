"use client"
import React, { useEffect, useState } from 'react';
import Chat from "@/app/ui/chat/Chat"
import List from "@/app/ui/chat/List"
import UserProfile from "@/app/ui/user/userInfo"
import TopicList from "@/app/ui/chat/TopicList"
import Users from '../ui/chat/Users';

export default function Page(){
  const [currentChat, setCurrentChat] = useState({});
  useEffect(() => {
    if (!localStorage.getItem("email")) {
        window.location.href = '/login';; // Redirect to login page if not authenticated
    }
  }, []);


    return (
      <div>
        <div className="container">
        <div className="list">
          <UserProfile/>
          <TopicList setCurrentChat={setCurrentChat}/>        
        </div>
        <main className="main-content">
          <Chat chat={currentChat} />
        </main>
        <div className="list">
          <Users chat={currentChat}/>
        </div>
        </div>
      </div>
    );
}