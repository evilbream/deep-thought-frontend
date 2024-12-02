"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users({ chat }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [usersOpen, setUsersOpen] = useState(false)
  const [member, setMember] = useState({ login: '', email: '' });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/chat/members/all?id=${chat.id}`); // Adjust the URL as needed
        setUsers(response.data);
        
      } catch (error) {
        console.log('Failed to fetch users:', error);
        setError('Failed to fetch users. Please try again.');
      }
    };

    const fetchMember = async () => {
      try {
          const email = localStorage.getItem('email')
          const response = await axios.get(`http://localhost:8080/api/v1/chat/member?email=${email}&chatID=${chat.id}`);
          setMember(response.data)
      } catch (error) {
          console.log('Failed to fetch member.', error.response ? error.response.data : error.message);
          setError(error.response ? error.response.data : error.message);
      }
  };

    if (chat && chat.id) {
      fetchMember();
      fetchUsers();
    }
  }, [chat]);

  const toggleUsersOpen = () => {
    setUsersOpen((prevUsersOpen) => !prevUsersOpen);
  };

  const handleDeleteUser = async (user_email) => {
    try {
      if (chat.id){
        const deleted = await axios.post(`http://localhost:8080/api/v1/chat/remove?email=${user_email}&chatID=${chat.id}`);
        if (deleted){
          setUsers((prevUsers) => prevUsers.filter(user => user.email !== user_email));
        }
      }
      else{
        console.log("choose chat before adding user")
      }
    } catch (error) {
        console.log('Failed to create chat. Please try again.', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : error.message);
    }
  };


  return (
    <div className='members'>
      <button className="btn" style={{width: '70px'}} onClick={toggleUsersOpen}>Users</button>
      {usersOpen && (
        <div className='TopicList'>
          {users.map((user) => (
            <div key={user.user.id} className="user-item">
              <span>{user.user.email}</span>
              {(member.chatRole === "CHAT_ADMIN" && member.user.email != user.user.email) && <button onClick={() => handleDeleteUser(user.email)}>Remove</button>}
              {(member.user.email == user.user.email) && <button onClick={() => handleDeleteUser(user.user.email)}>Leave</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}