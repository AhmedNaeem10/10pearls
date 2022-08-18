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
import DashboardElements from "./pages/Services";
import AdminDashboard from "./pages/adminDashboard";
import AdminPanel from "./components/AdminPanel";
import Services from "./components/Services";
import UserRoutes from "./UserRoutes";
import Requests from "./components/Requests";
import Staff from "./components/Staff";
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>

        <Route path="/admin/requests" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/viewservices" element={<Services />} />
        <Route path="/viewrequests" element={<Requests />} />
        <Route path="/viewstaff" element={<Staff />} />
        <Route path="*" element={<UserRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
