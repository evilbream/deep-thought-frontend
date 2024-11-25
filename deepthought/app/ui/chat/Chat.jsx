"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Stomp, Client } from '@stomp/stompjs';

export default function Chat(){
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);

    useEffect(() => {
      const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws', // Adjust the URL as needed
        onConnect: () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe('/user/messages', (message) => {
              console.log(message)
                setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body).text]);

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
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
      console.log("message", message)
      if (client && client.connected) {
          console.log("message", message)
          client.publish({ destination: '/app/broker', body: JSON.stringify({"text": message})});
          setMessages((prevMessages) => [...prevMessages, message]);
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
        <div className="caption"></div>
        <span>Chat 1</span>
      </div>
      </div>
      <div className="center">
      {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="texts">
              <p>{msg}</p>
              <span>Just now</span>
            </div>
          </div>
        ))}

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
