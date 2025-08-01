// import { useState } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import  Home  from "./pages/user/home/Home";
import Cart from "./pages/user/cart/Cart";
import SideBar from "./components/admin/adminSidebar/sideBar";
// import ItemsList from "./pages/user/itemsList/ItemList"; 
import Products from "./pages/user/products/Products";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<  Cart />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/pro" element={<Products/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
