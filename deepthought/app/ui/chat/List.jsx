"use client"

import UserProfile from "@/app/ui/user/userInfo"
import TopicList from "@/app/ui/chat/TopicList"

export default function List(){
  return (
    <div className="list">
        <UserProfile/>
        <TopicList/>        
    </div>
  )
}
