import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Home from "./components/Home";
import ItemsAll from "./components/ItemsAll";
import Login from "./components/Login";
import MyInventory from "./components/MyInventory";
import ItemDetails from "./components/ItemDetails";
import AddItem from "./components/AddItem";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="web-title">Cool Inventory, Bro</div>
      <div className="web-subtitle">Tell it again...</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myinventory" element={<MyInventory />} />
        <Route path="/itemdetails/:id" element={<ItemDetails />} />
        <Route path="/additem" element={<AddItem />} />
        {/* <Route path='/createaccount' element={<CreateAccount />} /> */}
      </Routes>
    </>
  );
}

export default App;
