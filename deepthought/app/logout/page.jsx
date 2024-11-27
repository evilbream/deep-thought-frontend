
"use client"
import React, { useEffect } from 'react';


export default function LoginPage() {
useEffect(() => {
    // log out
    localStorage.clear();
    window.location.href = '/login';
    }, []);
  return (
    <main className="flex items-center justify-center md:h-screen">
    </main>
  );
}