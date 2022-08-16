import React from 'react'
import UserLogin from "./components/UserLogin";
import Navbar from "./components/Navbar";
import UserSignup from "./components/UserSignup";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from 'react-router-dom';


function UserRoutes() {
  return (
    <div>
        <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        
      </Routes>
    </div>
  )
}

export default UserRoutes