import React from "react";
import './App.css';
import AdminLogin from "./components/AdminLogin";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Workers from "./components/Workers";
import Worker from "./components/Worker";
import AdminDashboard from "./pages/adminRequests";
import AdminPanel from "./components/AdminPanel";
import Services from "./components/Services";
import UserRoutes from "./UserRoutes";
import Requests from "./components/Requests";
import Staff from "./components/Staff";
import WorkerDetails from "./components/WorkerDetails";
import Sidebar from "./components/Sidebar";
import AdminRequests from "./pages/adminRequests";
import AdminServicesPanel from "./pages/adminServicesPanel";
import NewServiceForm from "./pages/newServiceForm";
import NewWorkerForm from "./pages/newWorkerForm";
import AdminRoutes from "./AdminRoutes";
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      <Routes>

        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="*" element={<UserRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
