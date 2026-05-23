import React from 'react'
import { CarFront, MapPin, Phone, Mail } from "lucide-react";



export default function Footer() {
    return (
        <>
            <footer className="bg-gray-800 py-5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <CarFront className="text-blue-400" />
                                <span className="text-xl font-bold text-white">Prakash Auto</span>
                            </div>
                            <p className="text-gray-300">Your trusted partner for all automotive needs. Quality service and customer
                                satisfaction guaranteed.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="index.html" className="hover:text-blue-400 transition-colors">Home</a></li>
                                <li><a href="vehicle.html" className="hover:text-blue-400 transition-colors">Vehicles</a></li>
                                <li><a href="product.html" className="hover:text-blue-400 transition-colors">Products</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="https://maps.app.goo.gl/Y7mPoVm7cK92rqaH7" className="flex items-center">
                                    <MapPin className="mr-2 text-blue-400" /> Sharekand Talav, By Pass Road,
                                    Nadiad</a></li>
                                <li><a href="tel: +919426041999" className="flex items-center">
                                    <Phone
                                        className="mr-2 text-blue-400" /> +91 9426041999</a></li>
                                <li><a href="mailto:vaibhavlaxmiparwani@gmail.com" className="flex items-center">
                                    <Mail
                                    className="mr-2 text-blue-400" /> demo mail</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-6 text-center pt-4 text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Prakash Oil Traders All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
