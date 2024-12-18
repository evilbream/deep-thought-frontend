"use client"

import React from "react"
import { useState, useEffect, useRef} from "react"
import { Stomp, Client } from '@stomp/stompjs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Импорт библиотеки uuid

export default function Chat({chat}){
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [numUsers, setNumUsers] = useState(0);
  const [user, setUser] = useState({id: "", email: ""})
  const [prevMes, setPrevMes] = useState({id: "", email: ""})
  const messagesEndRef = useRef(null);
    useEffect(() => {
      setMessage([])
      const fetchNumUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/chat/members/count?id=${chat.id}`,
            {auth: {
              username: localStorage.getItem('login'),
              password: localStorage.getItem('password')
        }}
          ); 
          setNumUsers(response.data);
        } catch (error) {
          console.log('Failed to fetch number of users:', error);
        }
      };

      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/user/find?email=${localStorage.getItem("email")}`,
          {auth: {
            username: localStorage.getItem('login'),
            password: localStorage.getItem('password')
      }}); 
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
          const response = await axios.get(`http://localhost:8080/api/v1/message/all?chatId=${chat.id}`,
            {auth: {
              username: localStorage.getItem('login'),
              password: localStorage.getItem('password')
        }}
          ); 
          console.log(response.data)
          const sortedMessages = Array.from(response.data.values()).sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
          setMessages(sortedMessages);
        } catch (error) {
          console.log('Failed to fetch messages:', error);
        }
    };

      if (chat && chat.id) {
        fetchNumUsers();
        fetchOldMessages();
      }
      const username = localStorage.getItem('login');
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      const encodedCredentials = btoa(`${username}:${password}`);
      const stompClient = new Client({
        brokerURL: `ws://localhost:8080/ws`,
        connectHeaders: {
          login: 'test',
          passcode: 'test'
      },
        
        onConnect: () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe(`/user/messages/${chat.id}`,  (message) => {
              const receivedMessage = JSON.parse(message.body);
              setMessages((prevMessages) => {
                const uniqueMessages = new Map(prevMessages.map(msg => [msg.id, msg]));
                uniqueMessages.set(receivedMessage.id, receivedMessage);
                const sortedMessages = Array.from(uniqueMessages.values()).sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
                return sortedMessages;
              });
            }, {Username: 'test',
              Password: 'test'});
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
          const mes = {text: message, email: user.email, chat: chat.id, id: uuidv4()}
          console.log(messages)
          client.publish({ destination: '/app/broker', body: JSON.stringify(mes)});
          
          // setMessages((prevMessages) => [...prevMessages, mes]); // temp solution
          setMessage('');
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" ){
      sendMessage()
    }
};

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyChatLink = () => {
    const chatLink = `chat/${chat.id}`;
    navigator.clipboard.writeText(chatLink).then(() => {
      alert('Chat link copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy chat link:', error);
    });
  };

  return (
    <div className="chat">
      <div className="top">
      <div className="topic">
        <div className="caption">
        <p className="top_text">{chat.title}</p>
        </div>
        <div className="copyLink btn_marg"><button className="btn" onClick={copyChatLink}>Copy Link</button></div>
      </div>
      </div>
      <div className="center">
      {messages.map((msg, index) => {
          const showDate = index === 0 || formatDate(messages[index - 1].postedAt) !== formatDate(msg.postedAt);
          return (
            <React.Fragment key={index}>
              {showDate && <div className="date-label">{formatDate(msg.postedAt)}</div>}
              <div key={index} className={msg.email === user.email ? 'message-outgoing' : 'message'}>
                <div className="texts"> 
                {msg.email != user.email && <span>{msg.email}</span>}
                <p >{msg.text}</p>
                  <span>{formatTime(msg.postedAt)}</span>
                </div>
          </div>
            </React.Fragment>
          );
        })}
      
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
