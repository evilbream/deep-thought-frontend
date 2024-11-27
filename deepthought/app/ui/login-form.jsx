"use client"

import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        try {
            if (!login || !password) {
                setError('Please fill in all fields.');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                login,
                email,
                password
            });
            console.log(response.data);
            localStorage.setItem('user', response.data)
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('login', login);
            localStorage.setItem('email', email);

            e.preventDefault();
            window.location.href = '/chat';
        } catch (error) {
            console.log('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}>
                    <h2 className="mb-4 text-center">Log In Page</h2>
                    <input id='login' placeholder={"login"} value={login} type='text'
                              onChange={(e) => setLogin(e.target.value)}/>
                    <input placeholder='Email Address' id='email' value={email} type='email'
                              onChange={(e) => setEmail(e.target.value)}/>
                    <input placeholder='Password' id='password' type='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
              
                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                            style={{height: '40px', width: '100%'}}
                            onClick={handleLogin}>Sign In
                    </button>

                    <div className="text-center">
                        <p>Not Registered? <a href="/register">Sign Up</a></p>
                    </div>
            </div>
        </div>
    );
}