import React from "react";
import './App.css';
import AdminLogin from "./components/AdminLogin";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import Navbar from "./components/Navbar";
import UserSignUp from "./components/UserSignUp";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/" exact element={<UserSignUp />} />
        <Route path="/signup" exact element={<UserLogin />} />
      </Routes>
    </div>
  );
}

export default App;
