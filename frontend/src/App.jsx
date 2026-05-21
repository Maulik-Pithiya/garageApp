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
import DashBoard from "./Components/Admin/DashBoard";
import Messages from "./Components/Admin/Messages";
import AdminProduct from "./Components/Admin/AdminProduct";
import Sidebar from "./Components/Admin/Sidebar";


function App() {

  return (
    
      <BrowserRouter>
        <Navbar />
        <Toaster  toastOptions={{duration: 3000}} />
        <Routes>
       
          <Route path="/" element={<Herosection />} />
          <Route path="/vehicle" element={<VehicleServices />} />
          <Route path="/product" element={<Product />} />
          <Route path="/test" element={<Test />} />
         
          
        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard to="dashboard" replace />} />
        
          <Route index path="dashboard" element={<DashBoard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="products" element={<AdminProduct />} />
        </Route>
        

        </Routes>


        <Footer />
      </BrowserRouter>

  )
}
export default App
