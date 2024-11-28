"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function UserProfile(){
  const [user, setUser] = useState({ login: '', email: '' });

  useEffect(() => {
    const email = localStorage.getItem('email');
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/user/find?email=${localStorage.getItem("email")}`); // Adjust the URL as needed
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.log('Failed to fetch number of users:', error);
      }
    };
    if (localStorage.getItem("email")){
      fetchUser()
    }
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-header">
        <p> Login: {user.email}</p>
        <p> Email: {user.email}</p>
      </div>
      <div className="profile-body">
        <h3 className='top_text'>About Me</h3>
        <p className="profile-bio">{user.bio || 'There may be ur bio.'}</p>
      </div>
    </div>
  );
  }
  