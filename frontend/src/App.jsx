import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './index.css'

import Navbar from './Components/Navbar';
import Herosection from './Components/Herosection';
import Footer from './Components/Footer';
import VehicleServices from './Components/VehicleServices';
import Product from './Components/Product';
import Admin from './Components/Admin';
import Test from './Components/Test';

import DashBoard from "./Components/Admin/DashBoard";
import Messages from "./Components/Admin/Messages";
import AdminProduct from "./Components/Admin/AdminProduct";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Toaster toastOptions={{ duration: 3000 }} />
      <Routes>

        <Route path="/" element={<Herosection />} />
        <Route path="/vehicle" element={<VehicleServices />} />
        <Route path="/product" element={<Product />} />
        <Route path="/test" element={<Test />} />

        {/* for admin navigation */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="manageVehicles" element={<AdminProduct isSoldSection={false} />} />
          <Route path="soldVehicles" element={<AdminProduct isSoldSection={true} />} />
        </Route>

      </Routes>

      <Footer />
    </BrowserRouter>

  )
}
export default App
