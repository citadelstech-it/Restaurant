import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home from "./pages/user/home/Home";
import Dashboard from "./components/admin/menuManagement/dashboard/Dashboard";
import OrderHistory from "./components/admin/menuManagement/orderhistory/OrderHistory";
import Cart from "./pages/user/cart/Cart";
import Products from "./pages/user/products/Products";
import Checkout from "./pages/user/checkout/Checkout";
import Recipt from "./pages/user/bill/Recipt";
import InventoryManagement from "./components/admin/inventoryManagement/InventoryManagement";
import MenuManagement from "./components/admin/menuManagement/MenuManagement";
import OrderManagement from "./components/admin/orderManagement/OrderManagement";
import SideBar from "./components/admin/adminSidebar/sideBar";
import OrederManagement from "./components/admin/orderManagement/OrederManagement";
import LoginPage from "./components/admin/loginPage/LoginPage";
import UserLogin from "./components/admin/login/UserLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/cart" element={<  Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/pro" element={<Products />} />
        <Route path="/recipt" element={<Recipt />} />
        <Route path="/inventory-management" element={<  InventoryManagement />} />
        <Route path="/menu" element={<MenuManagement />} />
        <Route path="/order" element={<OrderManagement />} />
        <Route path="/order" element={<OrederManagement />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-login" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
