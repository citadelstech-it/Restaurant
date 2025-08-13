import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/user/home/Home";
import Cart from "./pages/user/cart/Cart";
import Products from "./pages/user/products/Products";
import Checkout from "./pages/user/checkout/Checkout";
import Recipt from "./pages/user/bill/Recipt";
import InventoryManagement from "./components/admin/inventoryManagement/InventoryManagement";
import MenuManagement from "./components/admin/menuManagement/MenuManagement";
import LoginPage from "./components/admin/loginPage/LoginPage";
import UserLogin from "./components/admin/login/UserLogin";
import OrderManagement from "./components/admin/orderManagement/OrderManagement";
import SideBar from "./components/admin/adminSidebar/SideBar";
import Dashboard from "./components/admin/dashboard/Dashboard";
import { AuthProvider } from './context/AuthContext';
import Unauthorized from "./components/admin/unAuthorized/Unauthorized";
import ProtectedRoute from './components/admin/protectedRoutes/ProtectedRoutes';
import OrderHistory from "./components/admin/orderhistory/OrderHistory";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ADMIN ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <MenuManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <OrderManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory-management"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <InventoryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userlogin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserLogin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sidebar"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SideBar />
              </ProtectedRoute>
            }
          />
           <Route
            path="/orderhistory"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <OrderHistory/>
              </ProtectedRoute>
            }
          />
           <Route
            path="/user-login"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserLogin/>
              </ProtectedRoute>
            }
          />

          {/* USER ROUTES */}
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/receipt"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Recipt />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
