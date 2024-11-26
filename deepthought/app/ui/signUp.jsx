"use client"

import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            if (!login || !email || !password) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                login,
                email,
                password
            });
            console.log(response.data);
        } catch (error) {
            console.log('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}>
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    <input id='login' placeholder={"login"} value={login} type='text'
                              onChange={(e) => setLogin(e.target.value)}/>
                    <input placeholder='Email Address' id='email' value={email} type='email'
                              onChange={(e) => setEmail(e.target.value)}/>
                    <input placeholder='Password' id='password' type='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                    <input placeholder='confirmPassword' id='confirmPassword' type='confirmPassword' value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}/>
                    
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