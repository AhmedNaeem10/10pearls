import React from 'react'
import UserLogin from "./components/UserLogin";
import Navbar from "./components/Navbar";
import UserSignup from "./components/UserSignup";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from 'react-router-dom';
import ResetPassword from './components/ResetPassword';


function UserRoutes() {
  return (
    <div>
        <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        
      </Routes>
    </div>
  )
}

export default UserRoutes