"use client"

import React from "react"
import { useState, useEffect, useRef} from "react"
import { Stomp, Client } from '@stomp/stompjs';
import axios from 'axios';

export default function Chat({chat}){
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [numUsers, setNumUsers] = useState(1);
  const [user, setUser] = useState({id: "", email: ""})
  const messagesEndRef = useRef(null);
    useEffect(() => {
      const fetchNumUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/chat/members/count?id=${chat.id}`); // Adjust the URL as needed
          setNumUsers(response.data);
        } catch (error) {
          console.log('Failed to fetch number of users:', error);
        }
      };

      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/user/find?email=${localStorage.getItem("email")}`); // Adjust the URL as needed
          setUser(response.data);
        } catch (error) {
          console.log('Failed to fetch number of users:', error);
        }
      };
      if (localStorage.getItem("email")){
        fetchUser()
      }

      const fetchOldMessages = async () =>{
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/message/all?chatId=${chat.id}`); // Adjust the URL as needed
          console.log(response.data)
          setMessages(response.data);
        } catch (error) {
          console.log('Failed to fetch messages:', error);
        }
    };

      if (chat && chat.id) {
        fetchNumUsers();
        fetchOldMessages();
      }


      const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws', // Adjust the URL as needed
        onConnect: () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe(`/user/messages/${chat.id}`, (message) => {
              const receivedMessage = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);

        },

    });
    stompClient.activate();
    setClient(stompClient);

        return () => {
           // if (stompClient) {
               // stompClient.disconnect();
           // }
        };
    }, [chat]);

    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages]);

    const sendMessage = () => {
      if (client && client.connected) {
          const mes = {text: message, email: user.email, chat: chat.id, id:null}
          console.log(messages)
          client.publish({ destination: '/app/broker', body: JSON.stringify(mes)});
          //setMessages((prevMessages) => [...prevMessages, mes]); // temp solution
          setMessage('');
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" ){
      sendMessage()
    }
};

  return (
    <div className="chat">
      <div className="top">
      <div className="topic">
        <div className="caption">
        <span>Chat: {chat.title}</span>
        </div>
        <span> Members: {numUsers}</span>
      </div>
      </div>
      <div className="center">
      {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="texts">
            <span>From: {msg.email}</span>
            <p >{msg.text}</p>
              <span>Just now</span>
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} />
      </div>
      <div className="bottom">
        <input className="inp" type="text" 
                placeholder="Enter ur message" 
                onChange={e=> setMessage(e.target.value)}
                value={message}
                onKeyDown={handleKeyDown}
              />
        <button className="SendButton" onClick={sendMessage}>Send</button>

      </div>

    </div>
  )
}
