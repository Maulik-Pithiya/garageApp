import React from 'react';
import { MapPin, Clock, Gauge, Fuel, Calendar, Settings, Camera, Car } from 'lucide-react';

export default function VehicleCard({ car, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full">
      {/* Image Banner with Photo Count */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        {car.images && car.images[0] ? (
          <img 
            src={car.images[0]} 
            alt={car.name} 
            className="w-full h-full object-center object-cover transition-transform duration-500 hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Car className="w-12 h-12" />
          </div>
        )}
        
        {/* Photo indicator count badge */}
        {car.images && car.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-extrabold px-2.5 py-1.5 rounded-md flex items-center gap-1 shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            {car.images.length} Photos
          </div>
        )}
      </div>
      
      {/* Card Body */}
      <div className="p-6 flex flex-col grow">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {car.fuelType}
            </span>
            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {car.transmission}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 leading-snug line-clamp-1">{car.name}</h3>
          
          <div className="flex items-center text-gray-500 mt-2 text-xs font-semibold gap-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {car.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {new Date(car.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
            </span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 my-4"></div>
        
        <div className="mb-5 flex justify-between items-baseline">
          <span className="text-3xl font-extrabold text-blue-600 leading-none">Rs. {car.price.toLocaleString()}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 text-sm text-gray-600 font-medium mt-auto">
          <div className="flex items-center">
            <Gauge className="w-4 h-4 text-blue-500 mr-2" />
            <span>{car.kilometers.toLocaleString()} km</span>
          </div>
          <div className="flex items-center">
            <Fuel className="w-4 h-4 text-blue-500 mr-2" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-blue-500 mr-2" />
            <span>Year {car.passingYear}</span>
          </div>
          <div className="flex items-center">
            <Settings className="w-4 h-4 text-blue-500 mr-2" />
            <span>{car.transmission}</span>
          </div>
        </div>

        {/* View Details CTA Button */}
        <button 
          onClick={() => onViewDetails(car)}
          className="group w-full cursor-pointer relative overflow-hidden flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-blue-600/30 bg-white text-blue-600 font-bold shadow-sm transition duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        >
          <span className="relative transition-colors duration-300">View Details</span>
          <Car className="relative w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
