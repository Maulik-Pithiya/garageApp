import React, { useState, useEffect } from 'react'
import axios from 'axios'

import logo1 from '../assets/1st.png'
import logo2 from '../assets/2nd.png'
import logo3 from '../assets/3rd.png'
import logo4 from '../assets/4th.png'
import logo5 from '../assets/5th.png'
import logo6 from '../assets/6th.png'
import { Ban } from 'lucide-react'


export default function Product({ machine }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const visibleProducts = products.filter(product => product.visible !== false);

    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            {/* --- Hero Section --- */}
            <section className="hero-gradient py-8 sm:py-8 border-b border-slate-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Premium Auto Products
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover our curated selection of high-performance automotive products, <br className="hidden sm:block" />
                            oils, and lubricants engineered for your vehicle.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Main Content --- */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-7xl mx-auto">

                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                            <div>
                                <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                    {/* Assuming 'machine' is passed as a prop or imported */}
                                    {machine && <img src={machine} className="w-8 h-8 opacity-90" alt="Icon" />}
                                    Our Collection
                                </h2>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {loading ? (
                            <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-2xl">
                                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                                <p className="text-slate-500 font-semibold text-sm">Loading premium products...</p>
                            </div>
                        ) : visibleProducts.length === 0 ? (
                            <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-2xl">
                                <Ban className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                                <p className="text-slate-500 font-semibold text-sm">No products available at the moment. Please check back later!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {visibleProducts.map((product) => {
                                    const savings = product.mrp - product.price;
                                    return (
                                        <div key={product._id} className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden relative">

                                            {/* Out of Stock Badge */}
                                            {!product.inStock && (
                                                <div className="absolute top-3 right-3 z-10 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                                                    Out of Stock
                                                </div>
                                            )}

                                            {/* Image Container */}
                                            <div className="relative aspect-4/3 bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className={`h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 ${!product.inStock ? 'opacity-50' : ''}`}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 flex flex-col grow">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                                                    {product.brand || 'Premium'}
                                                </span>

                                                <h3 className="text-base font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer">
                                                    {product.title}
                                                </h3>

                                                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                                                    {product.description}
                                                </p>

                                                {/* Footer / Price */}
                                                <div className="mt-auto pt-6 flex items-end justify-between">
                                                    <div>
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-xl font-bold text-slate-900 tracking-tight">₹{product.price.toLocaleString()}</span>
                                                            <span className="text-sm font-medium text-slate-400 line-through">₹{product.mrp.toLocaleString()}</span>
                                                        </div>
                                                        {savings > 0 && (
                                                            <span className="text-xs font-medium text-emerald-600 mt-0.5 block">
                                                                Save ₹{savings.toLocaleString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- Featured Brands --- */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Trusted by Industry Leaders</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We partner with leading automotive brands to guarantee the highest quality and reliability.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center">
                        {[
                            logo1, logo2, logo3, logo4, logo5, logo6
                        ].map((logo, index) => (
                            <div key={index} className="flex items-center justify-center transition-all duration-300 cursor-pointer">
                                <img src={logo} className="object-contain object-center w-30 h-30 aspect-3/4" alt="Brand Logo" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Sleek CTA Section --- */}
            <section className="py-14 hero-gradient">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Need Expert Advice?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our automotive specialists are ready to help you match the exact products to your vehicle's specifications.
                    </p>
                    <a
                        href="tel:+919426041999"
                        className="mt-8 inline-flex items-center justify-center bg-white text-slate-900 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        Call Us: +91 94260 41999
                    </a>
                </div>
            </section>
        </div>
    );
}
