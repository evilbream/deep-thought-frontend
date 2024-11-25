"use client"

import { useState } from "react"

export default function TopicList(){
  const [addChat, setAddChat] = useState(false)
  return (
    <div className="TopicList">
      <div className="search">
      <div className="searchBar">
        <input type="text" placeholder="add new chat"/>
      </div>
      <button className='add' onClick={()=> setAddChat((prev) => !prev)}>
        add
      </button>
      </div>
      <div className="chats">
        <p>CHAT 1</p>
      </div>
      <div className="chats">
        <p>CHAT 2</p>
      </div>
      <div className="chats">
        <p>CHAT 3</p>
      </div>
      <div className="chats">
        <p>CHAT 4</p>
      </div>
    </div>
  )
}
