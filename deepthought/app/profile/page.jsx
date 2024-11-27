
"use client"
import React, { useEffect } from 'react';


export default function ProfilePage() {
  useEffect(() => {
    if (!localStorage.getItem("email")) {
        window.location.href = '/login'; // Redirect to login page if not authenticated
    }
  }, []);
  return (
    <main className="flex items-center justify-center md:h-screen">
        <p>Hello {localStorage.getItem("email")}</p>
    </main>
  );
}