"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TopicList({ setCurrentChat }){
  const [addChat, setAddChat] = useState(false)
  const [addUser, setAddUser] = useState('')
  const [chats, setChats] = useState([]);
  const [error, setError] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const [user, setUser] = useState({ login: '', email: '' });
  const [curChat, setCurChat] = useState({})

  useEffect(() => {
    setUser(localStorage.getItem('user'))
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/chat/all?email=${localStorage.getItem('email')}`); 
        //setChats(response.data);
        const uniqueChats = new Map(response.data.map(chat => [chat.id, chat]));
        setChats(Array.from(uniqueChats.values()));
        console.log(Array.from(uniqueChats.values()));
      } catch (error) {
        console.log(error);
        setError('Failed to fetch chats. Please try again.');
      }
    };

    fetchChats();
  }, []);

  const handleCreateChat = async () => {
    try {
        if (newChatName.indexOf('chat/')>-1){
          const joinedUser = localStorage.getItem('email')
          const chatId = newChatName.split('/')[1]
          const response = await axios.post(`http://localhost:8080/api/v1/chat/add?email=${joinedUser}&chatID=${chatId}`);
          console.log(response.data);
          setChats((prevChats) => [...prevChats, response.data.chat]);
          setNewChatName("")
        } 
        else if (newChatName != ""){
          const chat = newChatName
          const creator = localStorage.getItem('email')
          const response = await axios.post('http://localhost:8080/api/v1/chat/create', {
            chat,
            creator
          });
          setChats((prevChats) => [...prevChats, response.data]);
          setNewChatName("")
      }
    } catch (error) {
        console.log('Failed to create chat. Please try again.', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : error.message);
    }
};

const handleAddUser = async () => {
  try {
    if (curChat.id && addUser != ""){
      const response = await axios.post(`http://localhost:8080/api/v1/chat/add?email=${addUser}&chatID=${curChat.id}`);
      console.log(response.data);
      setAddUser("")
    }
    else{
      console.log("choose chat before adding user")
    }
  } catch (error) {
      console.log('Failed to create chat. Please try again.', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
  }
};

  const chooseChat = (current_chat) =>{
    setCurrentChat(current_chat)
    setCurChat(current_chat)
    console.log("Current User Chat", current_chat.title)

  }
  const handleKeyDownChat = (e) => {
    if (e.key === "Enter" ){
      handleCreateChat()
    }
};
  const handleKeyDownUser = (e) => {
    if (e.key === "Enter" ){
      handleAddUser()
    }
  };

  return (
    <div className="TopicList">
      <p className="top_text">Signed as {localStorage.getItem("email")}</p>
      <div className="search">
      <input
          placeholder='Enter chat name or link'
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          onKeyDown={handleKeyDownChat}
        />
        <button className="btn" onClick={handleCreateChat}>
          Create/Join
        </button>
        {curChat.id && ( 
          <div className="search">
        <input
          placeholder='Enter user email'
          value={addUser}
          onChange={(e) => setAddUser(e.target.value)}
          onKeyDown={handleKeyDownUser}
        />
        <button className="btn" onClick={handleAddUser}>
          Add User
        </button>
        </div>
        )}
        {!curChat.id && ( 
          <p className="top_text1">Choose, create or join chat to start messaging</p>
          )}
      </div>
      <p className="top_text">Chats:</p>
      {chats.map((chat) => (
        <div key={chat.id} className="item">
          <button onClick={() => chooseChat(chat)}>{chat.title}</button>
        </div>
      ))}
    </div>
  );
}
