import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import Inventory from "./components/Inventory";
import AddMedicine from "./components/AddMedicine";
import UpdateMedicine from "./components/UpdateMedicine";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route exact path="/" element={<AdminLogin />} />
        <Route exact path="/inventory" element={<Inventory />} />
        <Route exact path="/register" element={<AdminRegister />} />
        <Route exact path="/addmedicine" element={<AddMedicine />} />
        <Route exact path="/updatemedicine" element={<UpdateMedicine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

