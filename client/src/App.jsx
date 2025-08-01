import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/user/home/Home";
import Dashboard from "./components/admin/menuManagement/dashboard/Dashboard";
import OrderHistory from "./components/admin/menuManagement/orderhistory/OrderHistory";
// import { useState } from "react";
import Cart from "./pages/user/cart/Cart";
import Recipt from "./pages/user/bill/Recipt";
import InventoryManagement from "./components/admin/inventoryManagement/InventoryManagement";
import MenuManagement from "./components/admin/menuManagement/MenuManagement";

import OrederManagement from "./components/admin/orderManagement/OrederManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/cart" element={<  Cart />} />
        <Route path="/recipt" element={<Recipt />} />
        <Route path="/inventory-management" element={<  InventoryManagement />} />
        <Route path="/menu" element={<MenuManagement />} />
        {/* <Route path="/cart" element={<  Cart/>}/> */}
        <Route path="/order" element={<OrederManagement/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
