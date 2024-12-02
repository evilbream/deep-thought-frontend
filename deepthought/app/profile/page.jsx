
"use client"
import React, { useEffect, useState } from 'react';
import UserProfile from '@/app/ui/user/userInfo'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("email")) {
        window.location.href = '/login'; // Redirect to login page if not authenticated
    }
    else{
      setLoading(false)
    }
  }, []);
  if (loading) {
    return <div>Loading...</div>; 
  }
  return (
    <main className="flex items-center justify-center md:h-screen">
        <UserProfile/>
    </main>
  );
}