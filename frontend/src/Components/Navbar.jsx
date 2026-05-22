import { useState } from 'react';
import { CarFront, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";


function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const closeMenu = () => {
        setIsMobileMenuOpen(false);
        window.scrollTo({
            top: 0,
        });
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <CarFront className="text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">Prakash Auto</span>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex space-x-8">
                        <NavLink to="/" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Home</NavLink>
                        <NavLink to="vehicle" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Vehicles</NavLink>
                        <NavLink to="product" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Products</NavLink>
                        <NavLink to="admin/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Admin</NavLink>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <a href="tel:+919426041999"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors shadow-md">
                            Contact Us
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} aria-label="Open menu"
                            className="text-gray-600 focus:outline-none">
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-3 mt-4">
                            <NavLink to="/" className={({ isActive }) =>
                                `px-4 py-3 rounded-xl ${isActive
                                    ? "bg-blue-100 text-blue-600 "
                                    : "text-gray-600"
                                }`} onClick={closeMenu}>Home</NavLink>

                            <NavLink to="/vehicle" className={({ isActive }) =>
                                `px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-600"
                                }`} onClick={closeMenu}>Vehicles</NavLink>

                            <NavLink to="/product" className={({ isActive }) =>
                                `px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-600"
                                }`} onClick={closeMenu}>Products</NavLink>

                            <NavLink to="/admin" className={({ isActive }) =>
                                `px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-600"
                                }`} onClick={closeMenu}>Admin</NavLink>

                            <a href="tel:+919426041999" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-center mt-2">Contact Us</a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;