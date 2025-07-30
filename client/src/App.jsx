// import { useState } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/user/home/Home";
import Cart from "./pages/user/cart/Cart";
import Checkout from "./pages/user/checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<  Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
