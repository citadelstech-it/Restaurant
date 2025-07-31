// import { useState } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/user/home/Home";
import Cart from "./pages/user/cart/Cart";
import Recipt from "./pages/user/bill/Recipt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<  Cart/>}/>
        <Route path="/recipt" element={<Recipt/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
