import React from 'react'
import UserLogin from "./components/UserLogin";
import Navbar from "./components/Navbar";
import UserSignUp from "./components/UserSignUp";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Workers from './components/Workers';
import Worker from './components/Worker';
import UserServicesDashboard from './pages/userServicesDashboard';


function UserRoutes() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<UserServicesDashboard />} />
                <Route path="/signup" element={<UserSignUp />} />
                <Route path="/login" element={<UserLogin />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/services/:serviceId" element={<Workers />} />
                <Route path="/services/:serviceId/:workerId" element={<Worker />} />

            </Routes>
        </div>
    )
}

export default UserRoutes