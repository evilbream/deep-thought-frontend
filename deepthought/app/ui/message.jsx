import React, {useState, useEffect} from 'react';

export default function ChatMessage({ message }) {

  return (

    <div className="chat-message">
      <p>{message.user}: {message.text}</p>

    </div>

  );

}