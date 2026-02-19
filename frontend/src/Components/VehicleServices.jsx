import React, { useState } from 'react'
import { Award, Bike, Calendar, Car, Clock, Filter, Fuel, Gauge, MapPin, Settings, ShieldCheck, ToolCase, } from "lucide-react";


export default function VehicleServices() {

    const [vehicleType, setVehicleType] = useState('two-wheels');

    return (
        <>
            {/* <!-- Vehicle Services --> */}
            <section className="hero-gradient py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Vehicle Services</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive automotive services for all types of vehicles. Select your vehicle type and use filters to find exactly what you need.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Vehicle Type</h2>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[150px]">
                                <input type="radio" id="two-wheels" name="vehicle-type" value="two-wheels" onChange={() => setVehicleType("two-wheels")}
                                    checked={vehicleType === "two-wheels"}
                                    className="hidden" />
                                <label htmlFor="two-wheels" className="text-blue-600 flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-400">
                                    <Bike className="mb-2 w-8 h-8" />
                                    <span className="font-medium">Two Wheels</span>
                                </label>
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <input type="radio" id="four-wheels" name="vehicle-type" value="four-wheels" onChange={() => setVehicleType("four-wheels")}
                                    checked={vehicleType === "four-wheels"} className="hidden" />
                                <label htmlFor="four-wheels" className="text-blue-600 flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-400 ">
                                    <Car className="mb-2 w-8 h-8 " />
                                    <span className="font-medium ">Four Wheels</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- main section --> */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">

                    {/* <!-- quote --> */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Want to sell your vehicle?</h3>
                            <p className="text-gray-600">Get a fair price for your vehicle with our easy selling process.</p>
                        </div>
                        <a href="sell-vehicle.html"
                            className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white py-2 px-6 rounded-lg transition-colors font-medium whitespace-nowrap">
                            Get Quote
                        </a>
                    </div>

                    {/* <!-- filter --> */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-10">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Filter className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold text-gray-800">Filter Services</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="service-type" className="text-sm font-medium text-gray-700">Car company</label>
                                    <select id="service-type"
                                        className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                        <option value="all">All Company</option>
                                        <option value="maintenance">Toyota</option>
                                        <option value="repairs">Suzuki</option>
                                        <option value="diagnostics">Hyundai</option>
                                        <option value="custom">Tata</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="price-range" className="text-sm font-medium text-gray-700">Price Range</label>
                                    <select id="price-range"
                                        className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                        <option value="all">All Prices</option>
                                        <option value="low">50k</option>
                                        <option value="medium">50k - 150k</option>
                                        <option value="high">150k +</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="urgency" className="text-sm font-medium text-gray-700">Year</label>
                                    <select id="urgency"
                                        className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                        <option value="all">2020 & Newer </option>
                                        <option value="standard">2015 - 2019</option>
                                        <option value="express">2010 - 2014</option>
                                        <option value="emergency">Before 2010 </option>
                                    </select>
                                </div>

                                <div className="flex gap-2">
                                    <button id="reset-filters"
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
                                        Reset
                                    </button>
                                    <button id="apply-filters"
                                        className="flex-1 btn-primary font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800" id="section-title">Two-Wheel Services</h2>
                            </div>
                        </div>

                        {/* <!-- Vehicle Grid --> */}
                        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* <!-- Vehicle Card 1 --> */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm car-card">
                                <div className="relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                        alt="Toyota Camry" className="w-full car-image" />
                                </div>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900">Toyota Camry</h2>
                                        <div className="flex items-center text-gray-600 mt-2">
                                            <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                                            <span className="text-sm">New York, NY</span>
                                            <span className="mx-2">•</span>
                                            <Clock className="w-4 h-4 text-blue-600 mr-2" />
                                            <span className="text-sm">Listed 2 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 my-4"></div>
                                    <div className="mb-5">
                                        <span className="text-3xl font-bold text-gray-900">$15,800</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="flex items-center">
                                            <Gauge className="w-4 h-4 text-blue-600 mr-2" />
                                            <span className="text-gray-700">42,000 miles</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Fuel className="w-4 h-4 text-blue-600 mr-2" />
                                            <span className="text-gray-700">Petrol</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                                            <span className="text-gray-700">2019</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Settings className="w-4 h-4 text-blue-600 mr-2" />
                                            <span className="text-gray-700">Automatic</span>
                                        </div>
                                    </div>
                                    {/* <button
                                        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center"
                                        // className=""
                                        >
                                        View Details &nbsp;
                                        <Car className="w-5 h-5"/>
                                    </button> */}

                                    <button className="group w-full cursor-pointer relative overflow-hidden
                                            flex items-center justify-center gap-2
                                            rounded-full px-6 py-3
                                            border border-blue-600/30
                                            bg-white
                                            text-blue-600 font-semibold
                                            shadow-[0_6px_18px_-12px_rgba(37,99,235,0.35)]
                                            transition-all duration-300 ease-out
                                            hover:bg-blue-600 hover:border-blue-600
                                            hover:text-white hover:-translate-y-0.5
                                            hover:shadow-[0_14px_35px_-14px_rgba(37,99,235,0.75)]
                                            active:translate-y-0 active:scale-[0.98]
                                            focus:outline-none focus:ring-4 focus:ring-blue-300/40">
                                        
                                        {/* Shine effect */}
                                        <span
                                            className="pointer-events-none absolute inset-0
                                            opacity-0 group-hover:opacity-100
                                            transition-opacity duration-300
                                            bg-gradient-to-r from-white/30 via-white/10 to-transparent"/>
                                        <span className="relative transition-colors duration-300">View Details</span>
                                        <Car className="relative w-5 h-5 text-blue-600 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" />
                                    </button>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </section>

            {/* <!-- Why Choose Our Vehicle Services? --> */}
            <section className="py-12 hero-gradient">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Vehicle Services?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We provide top-quality automotive services with a focus on customer satisfaction and technical excellence.</p>
                    </div>

                    <div className="grid   grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">


                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="text-blue-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Turnaround</h3>
                            <p className="text-gray-600">We complete most services within 24-48 hours without compromising quality.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="text-blue-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Warranty Included</h3>
                            <p className="text-gray-600">All our services come with a warranty for your peace of mind.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ToolCase className="text-blue-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Modern Equipment</h3>
                            <p className="text-gray-600">We use state-of-the-art diagnostic tools and equipment for precise repairs.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
