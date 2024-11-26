"use client"
import Chat from "@/app/ui/chat/Chat"
import List from "@/app/ui/chat/List"
import Sidenav from "../ui/home/sidenav";

export default function Page(){
    return (
      <div>
        <div className="container">
          <Chat/>
          <List/>
        </div>
        </div>
    );
}
