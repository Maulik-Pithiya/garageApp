import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import './index.css'
import Navbar from './Components/Navbar'; 
import Herosection from './Components/Herosection';
import Footer from './Components/Footer';
import VehicleServices from './Components/VehicleServices';
import Product from './Components/Product';
import Admin from './Components/Admin';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
         
          {/* page 1 */}
          <Route path="/" element={<Herosection />} />

          {/* page 2 */}
          <Route path="/vehicle" element={<VehicleServices />} />

          {/* page 3 */}
          <Route path="/product" element={<Product />} />

          {/* page 3 */}
          <Route path="/admin" element={<Admin />} />

        </Routes>
        <Footer />
      </BrowserRouter>


    </>
  )
}
export default App
