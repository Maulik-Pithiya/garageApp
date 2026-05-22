import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";


export default function Product() {
    return (
        <>
            <section className="hero-gradient py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Auto Products</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">Discover our premium selection of automotive products,<br />oils and lubricants for all your vehicle needs.</p>
                    </div>
                </div>
            </section>

            {/* <!-- Main Content --> */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="lg:flex-row gap-8">
                        {/* <!-- Results Header --> */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        {/* <!-- Products Grid --> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* <!-- Product Card 1 --> */}
                            <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                                <div className="h-72 w-full flex items-center justify-center p-4 bg-white relative">
                                    <img src="https://th.bing.com/th/id/OPAC.3L3LD9OUdiuDyQ474C474" alt="Product"
                                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                                </div>

                                <div className="px-5 pb-5 flex flex-col grow">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fuchs</span>
                                    <h3 className="text-lg font-bold text-gray-900 leading-snug mt-1 cursor-pointer">Castrol MAGNATEC 5W-30 T Full-Synthetic Engine Oil (3.5 ml)</h3>
                                    <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2 mb-4">High-performance fully synthetic engine oil with advanced additives.</p>

                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                                        <div className="flex flex-col">
                                            <div className="text-xs text-gray-400 font-medium line-through">M.R.P. 2625</div>
                                            <div className="text-2xl font-bold text-gray-900">Rs. 2200</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* <!-- Featured Brands --> */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Brands</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We partner with leading automotive brands to bring you the highest quality products.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24">
                            <span className="">
                                <img src="https://logos-world.net/wp-content/uploads/2022/07/Castrol-Logo-500x281.png" className="object-contain h-20 w-full" alt="" />
                            </span>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24">
                            <span className="">
                                <img src="https://images.seeklogo.com/logo-png/49/1/mobil-1-racing-oils-logo-png_seeklogo-492206.png" className="object-contain h-20 w-full" alt="" />
                            </span>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24">
                            <span className="">
                                <img src="https://logos-world.net/wp-content/uploads/2020/11/Shell-Logo-700x394.png" className="object-contain h-20 w-full" alt="" />
                            </span>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24">
                            <span className="">
                                <img src="https://logos-world.net/wp-content/uploads/2023/03/Valvoline-Logo-500x281.png" className="object-contain h-20 w-full" alt="" />
                            </span>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24">
                            <span className="">
                                <img src="https://logos-world.net/wp-content/uploads/2023/05/TotalEnergies-Logo-500x281.png" className="object-contain h-20 w-full" alt="" />
                            </span>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24">
                            <span className="">
                                <img src="https://logos-world.net/wp-content/uploads/2021/08/Chevron-Logo-700x394.png" className="object-contain h-20 w-full" alt="" />
                            </span>
                        </div>
                    </div>

                </div>
            </section>

            {/* <!-- CTA Section --> */}
            <section className="py-10 mt-6 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing Products?</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8">Our automotive experts are here to help you find the right products for your vehicle. Get personalized recommendations based on your needs.</p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="tel:+919426041999" className="bg-white border border-white text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-8 rounded-lg font-medium transition-colors">Call Now: +91 9426041999</a>
                    </div>
                </div>
            </section>
        </>
    )
}
