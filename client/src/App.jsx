import { useState } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/user/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
