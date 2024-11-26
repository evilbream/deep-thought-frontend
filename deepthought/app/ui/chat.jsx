import React, { useState, useEffect } from "react";


export default function Chat(){

  function getShowDate(timestamp) {
    const fulldays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(parseInt(timestamp));
    const nowDate = new Date();
    if (this.isSameDay(date, nowDate))
        return { day: 'Today', time: this.addZero(date.getHours()) + ' : ' + this.addZero(date.getMinutes()) }
    else if (this.isSameDay(date, new Date(nowDate.getTime - 86400000))) {
        return { day: 'Yesterday', time: this.addZero(date.getHours()) + ' : ' + this.addZero(date.getMinutes()) }
    } else {
        return {
            day: `${fulldays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
            time: this.addZero(date.getHours()) + ' : ' + this.addZero(date.getMinutes())
        }
    }
}
const [messages, setMessages] = useState([
  { text: 'Some incoming', type: 'left' },
]);
  const [input, setInput] = useState('');


  const [message, setMessage] = useState('');
  
  const messageArray = []

  // wait from back and add to 

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log('Message sent:', message); 
    setMessages([...messages, { text: message, type: 'right' }]);
    
    setMessage(''); 

  };

    return (

      <div className="card-container">
        <div className="card-header">
          <div className="img-avatar"></div>
          <div className="text-chat">Some Chat</div>
        </div>
        <div className="card-body">
          <div className="messages-container">
            {messages.map((message, index) => (
            <div key={index} className={`message-box ${message.type}`}>
              <p>{message.text}</p>
            </div>
          ))}
          </div>
          <div className="message-input">
            <form onSubmit={handleSubmit}>
              <input
              className="message-send"
              type="text"
              value={message}
              onChange={handleChange}
              placeholder="Type your message here"
              required/>
              <span className="input-border"></span>
              <button type="submit" className="button-send">Send</button>
            </form>
          </div>
        </div>
    </div>

    )
}
