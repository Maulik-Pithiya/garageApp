import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css'
import Navbar from './Components/Navbar'; 
import Herosection from './Components/Herosection';
import Footer from './Components/Footer';
import VehicleServices from './Components/VehicleServices';
import Product from './Components/Product';
import Admin from './Components/Admin';
import Test from './Components/Test';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    
      <BrowserRouter>
      <Toaster  toastOptions={{duration: 3000}} />
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
          
          <Route path="/test" element={<Test />} />

        </Routes>
        <Footer />
      </BrowserRouter>

  )
}
export default App
