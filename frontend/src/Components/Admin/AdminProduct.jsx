import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Plus,
  Trash2,
  Edit2,
  Car,
  DollarSign,
  MapPin,
  Gauge,
  Calendar,
  Fuel,
  Settings,
  Upload,
  X,
  Image as ImageIcon,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminProduct = () => {
  const API = "http://localhost:8000/api";

  // State variables
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [adminToken, setAdminToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    kilometers: '',
    fuelType: 'Petrol',
    passingYear: new Date().getFullYear(),
    transmission: 'Manual',
    category: 'four-wheels',
    images: []
  });

  // Cloudinary Upload presets/states
  const [uploadPreset, setUploadPreset] = useState('');
  const [cloudName, setCloudName] = useState('dytjsoyyz');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');

  // Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Failed to fetch vehicle listings.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch server configuration on mount
  useEffect(() => {
    const fetchConfigAndVehicles = async () => {
      try {
        const configResponse = await axios.get(`${API}/config`);
        setAdminToken(configResponse.data.adminToken);
        setUploadPreset(configResponse.data.uploadPreset);
        setCloudName(configResponse.data.cloudName);
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
      fetchVehicles();
    };

    fetchConfigAndVehicles();
  }, []);

  // Image Upload handler for Cloudinary (direct frontend upload)
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const toastId = toast.loading("Uploading image to Cloudinary...");

    try {
      const file = files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: data
      });

      const responseData = await res.json();

      if (responseData.secure_url) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, responseData.secure_url]
        }));
        toast.success("Image uploaded successfully!", { id: toastId });
      } else {
        throw new Error(responseData.error?.message || "Upload failed. Verify Cloudinary preset in your backend .env file.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to upload image. Verify settings or paste a URL manually.", { id: toastId, duration: 6000 });
    } finally {
      setUploadingImage(false);
    }
  };

  // Toggle Visibility action (Show/Hide listing on website)
  const toggleVisibility = async (vehicle) => {
    const newVisibility = vehicle.visible === false ? true : false;
    const toastId = toast.loading(newVisibility ? "Showing vehicle listing..." : "Hiding vehicle listing...");

    try {
      await axios.put(`${API}/vehicle/${vehicle._id}`, {
        ...vehicle,
        visible: newVisibility
      }, {
        headers: {
          'x-admin-token': adminToken
        }
      });

      toast.success(newVisibility ? "Listing is now visible on the website!" : "Listing has been hidden from public view!", { id: toastId });
      fetchVehicles();
    } catch (error) {
      console.error("Toggle visibility error:", error);
      const errMsg = error.response?.data?.message || "Failed to update listing visibility.";
      toast.error(errMsg, { id: toastId });
    }
  };

  // Manual image URL add
  const addImageUrlManually = () => {
    if (!tempImageUrl.trim()) return;
    if (!tempImageUrl.startsWith('http://') && !tempImageUrl.startsWith('https://')) {
      toast.error("Please enter a valid URL starting with http:// or https://");
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, tempImageUrl.trim()]
    }));
    setTempImageUrl('');
    toast.success("Image URL added!");
  };

  // Remove image from array
  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove)
    }));
  };

  // Input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit Handler (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error("At least one vehicle image is required!");
      return;
    }

    setIsSubmitting(true);
    const config = {
      headers: {
        'x-admin-token': adminToken
      }
    };

    try {
      if (editingId) {
        // Update Action
        await axios.put(`${API}/vehicle/${editingId}`, formData, config);
        toast.success("Vehicle listing updated successfully!");
      } else {
        // Create Action
        await axios.post(`${API}/vehicle`, formData, config);
        toast.success("New vehicle listing added successfully!");
      }

      // Reset form
      setFormData({
        name: '',
        location: '',
        price: '',
        kilometers: '',
        fuelType: 'Petrol',
        passingYear: new Date().getFullYear(),
        transmission: 'Manual',
        category: 'four-wheels',
        images: []
      });
      setEditingId(null);
      setShowForm(false);
      fetchVehicles();
    } catch (error) {
      console.error("Submit error:", error);
      const errMsg = error.response?.data?.message || error.response?.data?.errorMessage || "An error occurred. Check your Admin Token in settings!";
      toast.error(errMsg, { duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit setup
  const startEdit = (vehicle) => {
    setEditingId(vehicle._id);
    setFormData({
      name: vehicle.name,
      location: vehicle.location,
      price: vehicle.price,
      kilometers: vehicle.kilometers,
      fuelType: vehicle.fuelType,
      passingYear: vehicle.passingYear,
      transmission: vehicle.transmission,
      category: vehicle.category || 'four-wheels',
      images: vehicle.images
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Action
  const deleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle listing?")) return;

    try {
      await axios.delete(`${API}/vehicle/${id}`, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      toast.success("Listing deleted successfully!");
      fetchVehicles();
    } catch (error) {
      console.error("Delete error:", error);
      const errMsg = error.response?.data?.message || "Failed to delete listing. Verify your Admin Token in settings!";
      toast.error(errMsg);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-4 px-2">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Car className="text-blue-600 w-8 h-8" />
            Manage Vehicles
          </h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or remove pre-owned cars from the system</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (showForm) {
                setEditingId(null);
                setFormData({
                  name: '',
                  location: '',
                  price: '',
                  kilometers: '',
                  fuelType: 'Petrol',
                  passingYear: new Date().getFullYear(),
                  transmission: 'Manual',
                  category: 'four-wheels',
                  images: []
                });
              }
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-md active:scale-95 cursor-pointer"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? "Cancel" : "Add Vehicle"}
          </button>
        </div>
      </div>

      {/* Addition & Update Form block (Popup Modal Box) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative transition transform scale-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button at Top-Right of Modal */}
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: '',
                  location: '',
                  price: '',
                  kilometers: '',
                  fuelType: 'Petrol',
                  passingYear: new Date().getFullYear(),
                  transmission: 'Manual',
                  category: 'four-wheels',
                  images: []
                });
                setShowForm(false);
              }}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full shadow-sm transition text-gray-500 hover:text-gray-800 cursor-pointer active:scale-95"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <h2 className=" text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                <Car className="text-blue-600" /> {editingId ? 'Edit Vehicle Listing' : 'Register New Pre-owned Vehicle'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Car Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Maruti Suzuki Swift VXI"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="e.g. 450000"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Kilometers */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Gauge className="w-4 h-4 text-gray-400" /> Kilometers *
                    </label>
                    <input
                      type="number"
                      name="kilometers"
                      value={formData.kilometers}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="e.g. 52000"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" /> Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Nadiad, Gujarat"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Passing Year */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" /> Passing Year *
                    </label>
                    <input
                      type="number"
                      name="passingYear"
                      value={formData.passingYear}
                      onChange={handleInputChange}
                      required
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      placeholder="e.g. 2021"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Fuel className="w-4 h-4 text-gray-400" /> Fuel Type *
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-gray-700"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>

                  {/* Transmission Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Settings className="w-4 h-4 text-gray-400" /> Transmission *
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-gray-700"
                    >
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Car className="w-4 h-4 text-gray-400" /> Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-gray-700"
                    >
                      <option value="two-wheels">Two Wheeler</option>
                      <option value="four-wheels">Four Wheeler</option>
                    </select>
                  </div>
                </div>

                {/* Image Gallery uploads */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                    <ImageIcon className="w-5 h-5 text-blue-600" /> Vehicle Images *
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* File input (Cloudinary) */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Upload File directly to Cloudinary</label>
                      <div className="relative border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-4 bg-white text-center cursor-pointer transition">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-600 block">
                          {uploadingImage ? 'Uploading...' : 'Choose file or drag & drop'}
                        </span>
                        <span className="text-xs text-gray-400">Directly goes to Cloudinary cloud (dytjsoyyz)</span>
                      </div>
                    </div>

                    {/* Direct image link paste fallback */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Paste Image URL Link manually</label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          value={tempImageUrl}
                          onChange={(e) => setTempImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/... or cloudinary url"
                          className="flex-1 bg-white border border-gray-300 rounded-lg py-2.5 px-3 focus:outline-none focus:border-blue-500 text-sm"
                        />
                        <button
                          type="button"
                          onClick={addImageUrlManually}
                          className="px-5 py-2.5 bg-blue-50 border border-blue-300 text-blue-700 font-medium text-sm rounded-lg hover:bg-blue-100 hover:border-blue-400 hover:shadow-md transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
                        >
                          Add URL
                        </button>
                      </div>
                      <span className="text-xs text-gray-400 mt-2 block leading-relaxed">
                        Paste raw image link if your upload preset fails or you already have images uploaded.
                      </span>
                    </div>
                  </div>

                  {/* Uploaded Images List layout */}
                  <div className="mt-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">Images Added ({formData.images.length})</span>
                    {formData.images.length === 0 ? (
                      <div className="text-center py-6 text-gray-400 text-sm bg-white rounded-lg border border-gray-100 font-medium">
                        No images added yet. Upload files or enter image links above to continue.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {formData.images.map((url, idx) => (
                          <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-video bg-white shadow-sm hover:shadow">
                            <img src={url} alt={`Vehicle Upload ${idx}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer"
                                title="Remove image"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">#{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form actions */}
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        name: '',
                        location: '',
                        price: '',
                        kilometers: '',
                        fuelType: 'Petrol',
                        passingYear: new Date().getFullYear(),
                        transmission: 'Manual',
                        category: 'four-wheels',
                        images: []
                      });
                      setShowForm(false);
                    }}
                    className="px-5 py-2.5 text-sm font-semibold border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    Close Form
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md active:scale-95 flex items-center gap-2 cursor-pointer text-sm"
                  >
                    {isSubmitting ? 'Saving...' : editingId ? 'Save Changes' : 'Register Vehicle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Table / Listing list */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-1.5">
        <Car className="w-5 h-5 text-blue-600" /> Existing Listings ({vehicles.length})
      </h2>

      {loading ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 font-semibold text-sm">Loading vehicle records...</p>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-700">No Vehicles Registered</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto mt-1 leading-relaxed">
            There are no vehicles listed in the Prakash Auto database. Click the "Add Vehicle" button above to publish your first pre-owned car.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Pricing</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {vehicles.map((car) => (
                  <tr key={car._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                          {car.images && car.images[0] ? (
                            <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-gray-300 m-auto mt-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 leading-snug">{car.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-blue-500" />
                            {car.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-gray-700">
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">{car.fuelType}</span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">{car.transmission}</span>
                          <span className={`${car.category === 'two-wheels' ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'} px-2 py-0.5 rounded-full uppercase`}>
                            {car.category === 'two-wheels' ? '2-Wheel' : '4-Wheel'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          {car.kilometers.toLocaleString()} km • Year {car.passingYear}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-extrabold text-gray-900 text-base">Rs. {car.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => toggleVisibility(car)}
                          className={`p-2 border rounded-lg transition active:scale-95 shadow-sm cursor-pointer ${car.visible !== false
                            ? 'border-green-200 hover:border-green-300 text-green-600 bg-green-50/50 hover:bg-green-50'
                            : 'border-gray-200 hover:border-gray-300 text-gray-400 bg-gray-50 hover:bg-gray-100'
                            }`}
                          title={car.visible !== false ? "Visible to Public (Click to Hide)" : "Hidden from Public (Click to Show)"}
                        >
                          {car.visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => startEdit(car)}
                          className="p-2 border border-gray-200 hover:border-blue-200 text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50/50 rounded-lg transition active:scale-95 shadow-sm cursor-pointer"
                          title="Edit vehicle details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteVehicle(car._id)}
                          className="p-2 border border-gray-200 hover:border-red-200 text-gray-600 hover:text-red-600 bg-white hover:bg-red-50/50 rounded-lg transition active:scale-95 shadow-sm cursor-pointer"
                          title="Delete listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
