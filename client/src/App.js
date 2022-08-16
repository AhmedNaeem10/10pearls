import React from "react";
import './App.css';
import AdminLogin from "./components/AdminLogin";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UserRoutes from "./UserRoutes"
import Services from "./components/Services"
function App() {
  return (
    <div>
      
      <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
      <Route path="/viewservices" element={<Services />} />
      <Route path="*" element={<UserRoutes />} />
      </Routes>
      
      
    </div>
  );
}

export default App;
