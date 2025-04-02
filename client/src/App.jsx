import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import Home from "./components/Home";
import ItemsAll from "./components/ItemsAll";
import Login from "./components/Login";
import MyInventory from "./components/MyInventory";
import ItemDetails from "./components/ItemDetails";



function App() {


  return (
    <>
    <div className='web-title' >Cool Inventory</div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/user/myinventory' element={<MyInventory />} />
      <Route path='/itemdetails/:id' element={<ItemDetails />} />

      {/* <Route path='/createaccount' element={<CreateAccount />} /> */}
    </Routes>
    </>
  )
}

export default App
