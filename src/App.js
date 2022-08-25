import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
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