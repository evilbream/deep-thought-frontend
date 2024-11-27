"use client"
import React, { useEffect, useState } from 'react';

export default function UserProfile(){
  const [user, setUser] = useState({ login: '', email: '' });

  useEffect(() => {
    const login = localStorage.getItem('login');
    const email = localStorage.getItem('email');
    setUser({ login, email });
  }, []);

  return (
    <div className="UserProfile">
      <p>Signed as: {user.email}</p>
    </div>
  );
  }
  