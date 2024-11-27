"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users({chat}){
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/chat/members/all?id=${chat.id}`); // Adjust the URL as needed
            setUsers(response.data);
          } catch (error) {
            console.error('Failed to fetch users:', error);
            setError('Failed to fetch users. Please try again.');
          }
        };
    
        if (chat && chat.id) {
          fetchUsers();
        }
      }, [chat]);

    return (
        <div>
            <p>Members:</p>
            <ul className="users-list">
                {users.map((user) => (
                <li key={user.id} className="user-item">
                    <span className="user-email">{user.email}</span>
                    <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </li>
        ))}
      </ul>
        </div>
      );
    }