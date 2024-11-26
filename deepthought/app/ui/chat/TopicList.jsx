"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TopicList(){
  const [addChat, setAddChat] = useState(false)
  const [chats, setChats] = useState([]);
  const [error, setError] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const [user, setUser] = useState({ login: '', email: '' });

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/chat/all?email=${localStorage.getItem('email')}`); 
        setChats(response.data);
        console.log(chats)
      } catch (error) {
        console.log(error);
        setError('Failed to fetch chats. Please try again.');
      }
    };

    fetchChats();
  }, []);

  const handleCreateChat = async () => {
    try {
        const chat = newChatName
        const creator = localStorage.getItem('email')
        const response = await axios.post('http://localhost:8080/api/v1/chat/create', {
          chat,
          creator
        });
        console.log(response.data);
    } catch (error) {
        console.log('Failed to create chat. Please try again.', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : error.message);
    }
};

  const chooseChat = (title) =>{
    console.log("choosen chat", title)
    localStorage.setItem("chat", title)
    console.log("choosen chat", title)
  }

  return (
    <div className="TopicList">
      <div className="search">
      <div className="searchBar">
        <input type="text" placeholder="add new chat"/>
      </div>
      <button className='add' onClick={()=> setAddChat((prev) => !prev)}>
        add
      </button>
      <input placeholder='chatname' id='chatname' type='chatname' value={newChatName}
                              onChange={(e) => setNewChatName(e.target.value)}/>
                    
      <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
              style={{height: '40px', width: '100%'}}
              onClick={handleCreateChat}>Create Chat
      </button>
      </div>
      {chats.map((chat, index)=>(
        <div className="chats">
          <button onClick={chooseChat(chat.title)}>{chat.title}</button>
        </div>
      ))}
    </div>
  )
}
