import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Bike, 
  Calendar, 
  Car, 
  Clock, 
  Filter, 
  Fuel, 
  Gauge, 
  MapPin, 
  Settings, 
  ShieldCheck, 
  ToolCase, 
  Camera,
  Loader2,
  X
} from "lucide-react";
import VehicleCard from './VehicleCard';

export default function VehicleServices() {
  const API = "http://localhost:8000/api";
  
  // State variables
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Active Filter states (applied on button click or radio change)
  const [vehicleType, setVehicleType] = useState('four-wheels'); // default to cars
  const [company, setCompany] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [yearRange, setYearRange] = useState('all');

  // Input states (temporary states before clicking "Apply")
  const [tempCompany, setTempCompany] = useState('all');
  const [tempPriceRange, setTempPriceRange] = useState('all');
  const [tempYearRange, setTempYearRange] = useState('all');

  // Modal / Detail state
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Fetch all listings
  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Filter listings based on criteria
  const applyFilters = () => {
    setCompany(tempCompany);
    setPriceRange(tempPriceRange);
    setYearRange(tempYearRange);
  };

  // Reset filters
  const resetFilters = () => {
    setTempCompany('all');
    setTempPriceRange('all');
    setTempYearRange('all');
    setCompany('all');
    setPriceRange('all');
    setYearRange('all');
  };

  // Run dynamic filtering whenever vehicles or filters change
  useEffect(() => {
    let result = vehicles;

    // 0. Filter out hidden vehicles
    result = result.filter(v => v.visible !== false);

    // 1. Vehicle Type (two-wheels / four-wheels)
    result = result.filter(v => {
      if (!v.category) return false;
      const normalizedCategory = v.category.toLowerCase().trim();
      if (vehicleType === 'four-wheels') {
        return normalizedCategory.startsWith('four');
      } else if (vehicleType === 'two-wheels') {
        return normalizedCategory.startsWith('two');
      }
      return false;
    });

    // 2. Company Filter
    if (company !== 'all') {
      result = result.filter(v => v.name.toLowerCase().includes(company.toLowerCase()));
    }

    // 3. Price Range Filter
    if (priceRange !== 'all') {
      if (priceRange === 'low') {
        result = result.filter(v => v.price <= 50000);
      } else if (priceRange === 'medium') {
        result = result.filter(v => v.price > 50000 && v.price <= 150000);
      } else if (priceRange === 'high') {
        result = result.filter(v => v.price > 150000);
      }
    }

    // 4. Year Filter
    if (yearRange !== 'all') {
      if (yearRange === 'newer') {
        result = result.filter(v => v.passingYear >= 2020);
      } else if (yearRange === 'standard') {
        result = result.filter(v => v.passingYear >= 2015 && v.passingYear <= 2019);
      } else if (yearRange === 'express') {
        result = result.filter(v => v.passingYear >= 2010 && v.passingYear <= 2014);
      } else if (yearRange === 'emergency') {
        result = result.filter(v => v.passingYear < 2010);
      }
    }

    setFilteredVehicles(result);
  }, [vehicles, vehicleType, company, priceRange, yearRange]);

  // Open details modal
  const openDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveImageIdx(0);
  };

  return (
    <>
      {/* <!-- Vehicle Services --> */}
      <section className="hero-gradient py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Vehicle Services</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive automotive services for all types of vehicles. Select your vehicle type and use filters to find exactly what you need.
            </p>
          </div>

          {/* Category Selector */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Select Vehicle Category</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[150px]">
                <button 
                  onClick={() => setVehicleType("two-wheels")}
                  className={`w-full text-blue-600 flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    vehicleType === "two-wheels" 
                      ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <Bike className="mb-2 w-8 h-8" />
                  <span className="font-bold">Two Wheels</span>
                </button>
              </div>

              <div className="flex-1 min-w-[150px]">
                <button 
                  onClick={() => setVehicleType("four-wheels")}
                  className={`w-full text-blue-600 flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    vehicleType === "four-wheels" 
                      ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <Car className="mb-2 w-8 h-8" />
                  <span className="font-bold">Four Wheels</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- main section --> */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">

          {/* <!-- sell notice --> */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Want to sell your vehicle?</h3>
              <p className="text-gray-600">Get a fair price for your vehicle with our easy selling process.</p>
            </div>
            <a 
              href="tel:+919426041999"
              className="border border-blue-200 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg transition font-bold whitespace-nowrap shadow-sm text-center active:scale-95"
            >
              Get Quote Now
            </a>
          </div>

          {/* <!-- filter --> */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-gray-800">Filter Listings</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 items-end">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company-select" className="text-sm font-semibold text-gray-700">Company</label>
                  <select 
                    id="company-select"
                    value={tempCompany}
                    onChange={(e) => setTempCompany(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="all">All Brands</option>
                    <option value="Suzuki">Maruti Suzuki</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Tata">Tata</option>
                    <option value="Honda">Honda</option>
                    <option value="Hero">Hero (Bikes)</option>
                    <option value="Bajaj">Bajaj (Bikes)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="price-range-select" className="text-sm font-semibold text-gray-700">Price Range</label>
                  <select 
                    id="price-range-select"
                    value={tempPriceRange}
                    onChange={(e) => setTempPriceRange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Under Rs. 50,000</option>
                    <option value="medium">Rs. 50,000 - Rs. 1.5 Lakh</option>
                    <option value="high">Above Rs. 1.5 Lakh</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="year-select" className="text-sm font-semibold text-gray-700">Year</label>
                  <select 
                    id="year-select"
                    value={tempYearRange}
                    onChange={(e) => setTempYearRange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="all">All Years</option>
                    <option value="newer">2020 & Newer</option>
                    <option value="standard">2015 - 2019</option>
                    <option value="express">2010 - 2014</option>
                    <option value="emergency">Before 2010</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={resetFilters}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-4 rounded-lg transition text-sm cursor-pointer"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={applyFilters}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition text-sm shadow cursor-pointer active:scale-95"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Display grid */}
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-100 pb-4 gap-2">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight" id="section-title">
                  {vehicleType === "two-wheels" ? "Pre-owned Two Wheelers" : "Pre-owned Four Wheelers"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Showing {filteredVehicles.length} listings match your filters</p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-24 bg-gray-50/50 border border-gray-100 rounded-2xl flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <h3 className="text-lg font-bold text-gray-700">Loading listings...</h3>
                <p className="text-gray-400 text-sm">Please wait while we connect to the database</p>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 border border-gray-100 rounded-2xl">
                <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700">No Listings Found</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  We couldn't find any pre-owned vehicles matching the selected filters. Try changing your selection or clicking Reset above.
                </p>
              </div>
            ) : (
              /* <!-- Vehicle Grid --> */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((car) => (
                  <VehicleCard 
                    key={car._id} 
                    car={car} 
                    onViewDetails={openDetails} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* <!-- Why Choose Our Vehicle Services? --> */}
      <section className="py-12 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Vehicle Services?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide top-quality automotive services with a focus on customer satisfaction and technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
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

      {/* Details Dialog Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition duration-300">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative transition transform scale-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-2.5 rounded-full shadow-md z-10 transition text-gray-500 hover:text-gray-800 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
              {/* Photo Display Carousel */}
              <div className="flex flex-col gap-4">
                <div className="h-72 w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner relative">
                  <img 
                    src={selectedVehicle.images[activeImageIdx]} 
                    alt={selectedVehicle.name} 
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Photo Indicators overlay */}
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                    {activeImageIdx + 1} / {selectedVehicle.images.length}
                  </span>
                </div>

                {/* Thumbnails array list */}
                {selectedVehicle.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {selectedVehicle.images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer transition ${
                          activeImageIdx === idx ? 'border-blue-600 shadow' : 'border-gray-100 hover:border-blue-300'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text specifications */}
              <div className="flex flex-col">
                <h3 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">{selectedVehicle.name}</h3>
                
                <div className="flex items-center text-gray-500 text-xs font-semibold gap-3 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {selectedVehicle.location}
                  </span>
                  <span>•</span>
                  <span>Listed {new Date(selectedVehicle.date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                </div>

                <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 mb-6">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider block mb-1">Pricing</span>
                  <span className="text-4xl font-black text-blue-600">Rs. {selectedVehicle.price.toLocaleString()}</span>
                </div>

                <h4 className="text-md font-bold text-gray-800 mb-3 border-b border-gray-100 pb-1.5">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6 text-gray-700 font-medium">
                  <div className="flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Kilometers</span>
                      <span>{selectedVehicle.kilometers.toLocaleString()} km</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Fuel className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Fuel Type</span>
                      <span>{selectedVehicle.fuelType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Model Year</span>
                      <span>{selectedVehicle.passingYear}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Transmission</span>
                      <span>{selectedVehicle.transmission}</span>
                    </div>
                  </div>
                </div>

                {/* Call Seller CTA */}
                <a 
                  href="tel:+919426041999"
                  className="mt-auto w-full py-4 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition active:scale-[0.98] text-base cursor-pointer"
                >
                  Contact Prakash Auto: +91 94260 41999
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
