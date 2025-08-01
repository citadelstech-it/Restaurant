// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/user/home/Home";
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
        <Route path="/cart" element={<  Cart />} />
        <Route path="/recipt" element={<Recipt />} />
        <Route path="/inventory-management" element={<  InventoryManagement />} />
        <Route path="/menu" element={<MenuManagement />} />
        <Route path="/cart" element={<  Cart/>}/>
        <Route path="/order" element={<OrederManagement/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
