import React from 'react'
import UserLogin from "./components/UserLogin";
import Navbar from "./components/Navbar";
import UserSignup from "./components/UserSignup";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from 'react-router-dom';
import DashboardElements from './pages/Services';
import Workers from './components/Workers';
import Worker from './components/Worker';


function UserRoutes() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<DashboardElements />} />
                <Route path="/signup" element={<UserSignup />} />
                <Route path="/login" element={<UserLogin />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/services/:serviceId" element={<Workers />} />
                <Route path="/worker/:workerId" element={<Worker />} />

            </Routes>
        </div>
    )
}

export default UserRoutes