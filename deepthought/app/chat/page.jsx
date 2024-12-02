"use client"
import React, { useEffect, useState } from 'react';
import Chat from "@/app/ui/chat/Chat"
import List from "@/app/ui/chat/List"
import UserProfile from "@/app/ui/user/userInfo"
import TopicList from "@/app/ui/chat/TopicList"
import Users from '../ui/chat/Users';

export default function Page(){
  const [currentChat, setCurrentChat] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("email")) {
        window.location.href = '/login';
    }
    else{
      setLoading(false)
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

    return (
      <div>
        <div className="container">
          <TopicList setCurrentChat={setCurrentChat}/>       
        {currentChat && currentChat.id && <Chat chat={currentChat} />}
        {currentChat && currentChat.id && <Users chat={currentChat} />}
        </div>
      </div>
    );
}