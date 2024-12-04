"use client"

import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        setError(null)
        try {
            if (!login || !email || !password) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match")
                throw new Error("Passwords do not match");
            }

            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                login,
                email,
                password
            }, );

            localStorage.setItem('user', response.data)
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('login', login);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            console.log(response.data);
            e.preventDefault();
            window.location.href = '/chat';
        } catch (error) {
            console.log('Signup failed:', error.response ? error.response.data : error.message);
            console.log('Signup failed:', error.response)
            setError(error.response.data.msg);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '300px', height: 'auto'}}>
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    <input  className="mb-3 styled-input" id='Login' placeholder={"login"} value={login} type='text'
                              onChange={(e) => setLogin(e.target.value)}/>
                    <input  className="mb-3 styled-input" placeholder='Email Address' id='email' value={email} type='email'
                              onChange={(e) => setEmail(e.target.value)}/>
                    <input className="mb-3 styled-input" placeholder='Password' id='password' type='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                    <input className="mb-3 styled-input" placeholder='ConfirmPassword' id='password' type='password' value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <div className="text-center">{error && <p style={{ color: 'red', alignContent: "center"}}>{error}</p>}</div>
                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                            style={{height: '40px', width: '100%'}}
                            onClick={handleSignup}>Sign Up
                    </button>
                    <div className="text-center">
                    
                        <p>Already Register? <a href="/login">Login</a></p>
                    </div>
            </div>
        </div>
    );
}

export default SignupPage;