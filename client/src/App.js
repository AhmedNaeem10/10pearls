import React from "react";
import logo from './logo.svg';
import './App.css';
import AdminLogin from "./components/AdminLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/" exact element={<UserLogin />} />
      </Routes>
    </div>
  );
}

export default App;
