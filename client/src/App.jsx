// import { useState } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/user/home/Home";
import Cart from "./pages/user/cart/Cart";
import OrederManagement from "./components/admin/orderManagement/OrederManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<  Cart/>}/>
        <Route path="/order" element={<OrederManagement/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
