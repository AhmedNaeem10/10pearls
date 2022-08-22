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


function AdminRoutes() {
    return (
        <>
            <Sidebar />
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/admin/adminpanel" element={<AdminPanel />} />
                <Route path="/viewservices" element={<AdminServicesPanel />} />
                <Route path="/viewrequests" element={<AdminRequests />} />
                <Route path="/viewstaff" element={<Staff />} />
                <Route path="/addservice" element={<NewServiceForm />} />
                <Route path="/addstaff" element={<NewWorkerForm />} />
                <Route path="/workerdetails/:workerId" element={<WorkerDetails />} />
                <Route path="*" element={<UserRoutes />} />

            </Routes>
        </>
    )
}

export default AdminRoutes