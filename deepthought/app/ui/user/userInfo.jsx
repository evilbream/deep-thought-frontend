"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function UserProfile(){
  const [user, setUser] = useState({ login: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [about, setAbout] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('email');
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

  const handleUpdate = async () => {
    const updatedProfile = {
      firstName: firstName || user.profile.firstName,
      lastName: lastName || user.profile.lastName,
      middleName: middleName || user.profile.middleName,
      about: about || user.profile.about,
      status: status || user.profile.status,
    };
    try {
      const updatedProfile = {
        firstName: firstName || user.profile.firstName,
        lastName: lastName || user.profile.lastName,
        middleName: middleName || user.profile.middleName,
        about: about || user.profile.about,
        status: status || user.profile.status,
      };
      user.profile = { ...user.profile, ...updatedProfile };
      const response = await axios.post(`http://localhost:8080/api/v1/user/profile/update`, user); // Adjust the URL as needed
      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.log('Failed to update user:', error);
      setError('Failed to update user. Please try again.');
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2 className="profile-name">{user.profile?.firstName} {user.profile?.middleName} {user.profile?.lastName}</h2>
        <p className="profile-email">@{user.login}</p>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="profile-body">
        {editMode ? (
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e)=> setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={middleName}
                onChange={(e)=> setMiddleName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">About</label>
              <textarea
                id="bio"
                name="bio"
                value={about}
                onChange={(e)=> setAbout(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                name="status"
                value={status}
                onChange={(e)=> setStatus(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="btn save-btn" onClick={handleUpdate}>Save</button>
            <button className="btn cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <div className="profile-info">
            <p><strong>About:</strong> {user.profile?.about}</p>
            <p><strong>Status:</strong> {user.profile?.status}</p>
            <button className="btn edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}  