import React from "react";
import './App.css';
import AdminLogin from "./components/AdminLogin";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import Navbar from "./components/Navbar";
import UserSignup from "./components/UserSignup";
import Dashboard from "./components/Dashboard";
import Workers from "./components/Workers";
import Worker from "./components/Worker";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services/:service" element={<Workers />} />
        <Route path="/services/:service/:workerId" element={<Worker />} />
      </Routes>
    </div>
  );
}

export default App;
