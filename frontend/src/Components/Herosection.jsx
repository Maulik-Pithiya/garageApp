import React from 'react'
import business_photo from '../assets/Business deal-bro.png'
import { Bike, Car, ShoppingCart, Send, MapPin, Clock, Phone, CheckCircle } from "lucide-react";

import { useForm } from "react-hook-form"
import axios from 'axios';
import { toast } from 'react-hot-toast';


export default function Herosection() {
   
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  
  const submitForm = async (data) => {
    //   console.log("Form Data:", data);
      
  try {
    const response = await axios.post("http://localhost:8000/api/message/", data);
    // console.log("Response:", response.data);
      toast.success("Message Sent Successfully", {
          position: "top-center",
          style: {
              border: "1px solid #2563eb", // Tailwind blue-600
              padding: "12px 16px",
              color: "#2563eb",
              backgroundColor: "#f0f9ff", // Tailwind blue-50 (soft background)
              borderRadius: "8px",
              fontWeight: "500",
          },
          icon: <Send size={22} color="#2563eb" />,
      });

    reset();

  } catch (error) {
    // console.error("Error:", error);
    toast.error("Failed to send message. Please try again.");  }
};
    
    return (
        <>
            {/* <!-- Hero Section --> */}
            <section className="hero-gradient py-10 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-7">Professional Auto Services & Oil
                                Traders</h1>
                            <p className="text-gray-600 text-lg mb-3">We specialize in buying and selling quality second-hand
                                vehicles and provide a wide range of automotive products.</p>
                            <p className="text-gray-600 text-lg mb-7">We offer a wide selection of well-maintained second-hand
                                two-wheelers and four-wheelers for sale, and we also buy vehicles from customers.</p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <a href=""
                                    className="btn-primary py-3 px-6 rounded-lg text-center font-medium shadow-md">Two-Wheel
                                    Services</a>
                                <a href=""
                                    className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg text-center font-medium shadow-sm transition-colors">Four-Wheel
                                    Services</a>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center md:ms-8 ms-0">
                            <div className="relative">
                                <img src={business_photo} alt="Garage Interior" className="w-[30rem] h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Services Overview --> */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We offer comprehensive automotive services for all types of
                            vehicles with state-of-the-art equipment and certified technicians.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="service-card bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">

                                    <Bike className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Two-Wheel Services</h3>
                            </div>
                            <p className="text-gray-600 mb-4">Comprehensive maintenance and repair services for motorcycles,
                                scooters, and bicycles of all makes and models.</p>
                        </div>

                        <div className="service-card bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <Car data-lucide="car" className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Four-Wheel Services</h3>
                            </div>
                            <p className="text-gray-600 mb-4">Complete automotive care for cars, trucks, and SUVs using the latest
                                diagnostic equipment and genuine parts.</p>
                        </div>

                        <div className="service-card bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <ShoppingCart data-lucide="shopping-cart" className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Auto Products</h3>
                            </div>
                            <p className="text-gray-600 mb-4">High-quality automotive parts, accessories, oils, and lubricants for
                                all your vehicle maintenance needs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- CTA Section --> */}
            <section className="py-12 hero-gradient">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Your Vehicle Serviced?</h2>
                    <p className="max-w-2xl mx-auto mb-8">Schedule an appointment today and experience the AutoCare Garage
                        difference. Quality service, fair prices, and customer satisfaction guaranteed.</p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="tel:+919426041999"
                            className="bg-blue-600 text-white hover:bg-blue-700 py-3 px-8 rounded-lg font-medium shadow-md transition-colors">Call
                            Now: +919426041999</a>
                    </div>
                </div>
            </section>

            {/* <!-- get in touch --> */}
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Have questions about our services or need assistance? We're here
                        to help. Reach out to us and we'll get back to you as soon as possible.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* <!-- Contact Form --> */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>

                        <form id="contact-form" className="space-y-6" onSubmit={handleSubmit(submitForm)}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" id="name" {...register("name")}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 input-focus transition-colors focus:outline-none"
                                    placeholder="" required />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" id="email" {...register("email")}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 input-focus transition-colors focus:outline-none"
                                    placeholder="" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" id="phone" {...register("phone")}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 input-focus transition-colors focus:outline-none"
                                    placeholder="" required />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea id="message" rows="4" {...register("message")}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 input-focus transition-colors focus:outline-none resize-none"
                                    placeholder="Please provide details about your inquiry..."></textarea>
                            </div>

                            <button type="submit" disabled={isSubmitting}
                                className="w-full btn-primary py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                                <Send className="w-5 h-5 mr-2" />
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* <!-- Location & Info --> */}
                    <div>
                        {/* Location & Hours */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-5">
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold text-gray-900">Location & Hours</h3>
                            </div>

                            <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                </div>

                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-900">Our Location</h4>
                                    <p className="text-base text-gray-600 mt-1 leading-relaxed">
                                        Sharekand Talav, By Pass Road, Nadiad, Gujarat 387001
                                    </p>

                                    <a href="https://maps.app.goo.gl/K6sDK1eXMxGz1pjc9"
                                        target="_blank" rel="noreferrer" className="inline-flex items-center text-base font-medium text-blue-600 hover:text-blue-700 mt-3">
                                        Get Directions →
                                    </a>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="flex items-start gap-4 py-5 border-b border-gray-100">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h4 className="text-lg font-semibold text-gray-900">Business Hours</h4>
                                    </div>

                                    <div className="mt-2 space-y-2 text-base text-gray-600">
                                        <div className="flex items-center justify-between text-pretty">
                                            <span className="font-medium text-gray-700">Monday - Saturday</span>
                                            <span>8:00 AM - 9:00 PM</span>
                                        </div>
                                        <div className="flex items-center justify-between text-pretty">
                                            <span className="font-medium text-gray-700">Sunday</span>
                                            <span>8:00 AM - 4:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="flex items-start gap-4 pt-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                    <Phone className="h-5 w-5 text-blue-600" />
                                </div>

                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-900">Contact Info</h4>

                                    <div className="mt-2 space-y-2 text-base">
                                        <p className="text-gray-600 ">
                                            Phone :{" "}
                                            <a href="tel:+919426041999" className="font-medium text-gray-900 hover:text-blue-600">
                                                +91 94260 41999
                                            </a>
                                        </p>

                                        <p className="text-gray-600">
                                            Email :{" "}
                                            <a href="mailto:info@autoprogarage.com" className="font-medium text-gray-900 hover:text-blue-600">
                                                demo@garage.com
                                            </a>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
                            <ul className="text-gray-600 space-y-3">
                                <li className="flex items-center">
                                    <CheckCircle className="text-blue-500 mr-2" />
                                    Certified technicians
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="text-blue-500 mr-2" />
                                    Competitive pricing
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="text-blue-500 mr-2" />
                                    Quality guaranteed
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}