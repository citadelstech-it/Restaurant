import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/user/home/Home";
import Dashboard from "./components/admin/menuManagement/dashboard/Dashboard";
import OrderHistory from "./components/admin/menuManagement/orderhistory/OrderHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
