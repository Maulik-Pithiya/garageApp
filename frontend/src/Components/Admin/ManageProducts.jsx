import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Plus,
  Trash2,
  Edit2,
  Package,
  DollarSign,
  Tag,
  Settings,
  Upload,
  X,
  Image as ImageIcon,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Archive,
  ShoppingBag,
  FileText
} from 'lucide-react';

const ManageProducts = () => {
  const API = "http://localhost:8000/api";

  // State variables
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [adminToken, setAdminToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    description: '',
    price: '',
    mrp: '',
    image: '',
    inStock: true,
    visible: true
  });

  // Cloudinary Upload presets/states
  const [uploadPreset, setUploadPreset] = useState('');
  const [cloudName, setCloudName] = useState('dytjsoyyz');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch product list.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch server configuration on mount
  useEffect(() => {
    const fetchConfigAndProducts = async () => {
      try {
        const configResponse = await axios.get(`${API}/config`);
        setAdminToken(configResponse.data.adminToken);
        setUploadPreset(configResponse.data.uploadPreset);
        setCloudName(configResponse.data.cloudName);
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
      fetchProducts();
    };

    fetchConfigAndProducts();
  }, []);

  // Image Upload handler for Cloudinary (direct frontend upload)
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const toastId = toast.loading("Uploading product image to Cloudinary...");

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
          image: responseData.secure_url
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

  // Toggle Visibility action (Show/Hide product on website)
  const toggleVisibility = async (product) => {
    const newVisibility = product.visible === false ? true : false;
    const toastId = toast.loading(newVisibility ? "Showing product on site..." : "Hiding product from site...");

    try {
      await axios.put(`${API}/product/${product._id}`, {
        ...product,
        visible: newVisibility
      }, {
        headers: {
          'x-admin-token': adminToken
        }
      });

      toast.success(newVisibility ? "Product is now visible to users!" : "Product has been hidden from users!", { id: toastId });
      fetchProducts();
    } catch (error) {
      console.error("Toggle visibility error:", error);
      const errMsg = error.response?.data?.message || "Failed to update product visibility.";
      toast.error(errMsg, { id: toastId });
    }
  };

  // Toggle In Stock status
  const toggleInStock = async (product) => {
    const newInStock = product.inStock === false ? true : false;
    const toastId = toast.loading(newInStock ? "Marking product as in stock..." : "Marking product as out of stock...");

    try {
      await axios.put(`${API}/product/${product._id}`, {
        ...product,
        inStock: newInStock
      }, {
        headers: {
          'x-admin-token': adminToken
        }
      });

      toast.success(newInStock ? "Product is marked In Stock!" : "Product is marked Out of Stock!", { id: toastId });
      fetchProducts();
    } catch (error) {
      console.error("Toggle in-stock error:", error);
      const errMsg = error.response?.data?.message || "Failed to update stock status.";
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
      image: tempImageUrl.trim()
    }));
    setTempImageUrl('');
    toast.success("Image URL added!");
  };

  // Remove image
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
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

    if (!formData.image) {
      toast.error("Product image is required!");
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
        await axios.put(`${API}/product/${editingId}`, formData, config);
        toast.success("Product updated successfully!");
      } else {
        // Create Action
        await axios.post(`${API}/product`, formData, config);
        toast.success("New product added successfully!");
      }

      // Reset form
      setFormData({
        title: '',
        brand: '',
        description: '',
        price: '',
        mrp: '',
        image: '',
        inStock: true,
        visible: true
      });
      setEditingId(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Submit error:", error);
      const errMsg = error.response?.data?.message || error.response?.data?.errorMessage || "An error occurred. Check your Admin Token settings.";
      toast.error(errMsg, { duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit setup
  const startEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      title: product.title,
      brand: product.brand || '',
      description: product.description,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      inStock: product.inStock !== undefined ? product.inStock : true,
      visible: product.visible !== undefined ? product.visible : true
    });
    setShowForm(true);
  };

  // Delete Action
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API}/product/${id}`, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      const errMsg = error.response?.data?.message || "Failed to delete product. Verify your Admin Token settings.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-4 px-2">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Package className="h-10 w-10 text-blue-600" />
            Manage Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, or remove store products from the website listings.
          </p>
        </div>

        <button
          onClick={() => {
            if (showForm) {
              setEditingId(null);
              setFormData({
                title: '',
                brand: '',
                description: '',
                price: '',
                mrp: '',
                image: '',
                inStock: true,
                visible: true
              });
            }
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-md active:scale-95 cursor-pointer"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {/* Addition & Update Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full h-[85vh] max-h-[85vh] shadow-2xl relative transition transform scale-100 animate-in fade-in zoom-in-95 duration-200 flex flex-col">

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: '',
                  brand: '',
                  description: '',
                  price: '',
                  mrp: '',
                  image: '',
                  inStock: true,
                  visible: true
                });
                setShowForm(false);
              }}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full shadow-sm transition text-gray-500 hover:text-gray-800 cursor-pointer active:scale-95"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                <ShoppingBag className="text-blue-600" /> {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="space-y-6 overflow-y-auto pr-3 flex-1" style={{ scrollbarWidth: 'thin' }}>

                  {/* Brand & Title */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Name</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="e.g. Castrol, Fuchs"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. MAGNATEC 5W-30 T Full-Synthetic"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      placeholder="Enter key details, synthetic type, sizes available, and features..."
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* MRP & Actual Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">MRP (Rs.) *</label>
                      <input
                        type="number"
                        name="mrp"
                        value={formData.mrp}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="e.g. 2625"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Actual Price (Rs.) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="e.g. 2200"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Image uploads */}
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h4 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                      <ImageIcon className="w-5 h-5 text-blue-600" /> Product Image *
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {/* File input (Cloudinary) */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Upload directly to Cloudinary</label>
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
                        </div>
                      </div>

                      {/* Direct link fallback */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Paste Image URL Link</label>
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            value={tempImageUrl}
                            onChange={(e) => setTempImageUrl(e.target.value)}
                            placeholder="https://..."
                            className="bg-white border border-gray-300 rounded-lg py-2.5 px-3 focus:outline-none focus:border-blue-500 text-sm"
                          />
                          <button
                            type="button"
                            onClick={addImageUrlManually}
                            className="px-5 py-2 bg-blue-50 border border-blue-300 text-blue-700 font-medium text-sm rounded-lg hover:bg-blue-100 hover:border-blue-400 transition cursor-pointer"
                          >
                            Add URL
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Show current image */}
                    {formData.image && (
                      <div className="mt-4 flex justify-center">
                        <div className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-[4/3] w-48 bg-white shadow-sm">
                          <img src={formData.image} alt="Product Upload" className="w-full h-full object-contain p-2" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button
                              type="button"
                              onClick={removeImage}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer"
                              title="Remove image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stock & Visibility Toggles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Stock status toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">Stock Availability</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Toggle if the item is in-stock or out of stock.</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          name="inStock"
                          checked={formData.inStock}
                          onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                          className="peer sr-only"
                        />
                        <div className="relative h-6 w-11 rounded-full bg-red-500 transition-colors duration-200 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform after:duration-200 after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-5"></div>
                      </label>
                    </div>

                    {/* Visibility status toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">Website Visibility</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Show or hide this product on the public page.</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          name="visible"
                          checked={formData.visible}
                          onChange={(e) => setFormData(prev => ({ ...prev, visible: e.target.checked }))}
                          className="peer sr-only"
                        />
                        <div className="relative h-6 w-11 rounded-full bg-gray-400 transition-colors duration-200 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform after:duration-200 after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-5"></div>
                      </label>
                    </div>
                  </div>

                </div>

                <div className="sticky bottom-0 bg-white pt-4 flex justify-between items-center border-t border-gray-100 mt-4">
                  {editingId ? (
                    <button
                      type="button"
                      className="bg-red-50 px-4 py-2 rounded-lg text-red-600 text-sm font-medium hover:bg-red-100 transition cursor-pointer"
                      onClick={() => deleteProduct(editingId)}
                    >
                      Delete Product
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({
                          title: '',
                          brand: '',
                          description: '',
                          price: '',
                          mrp: '',
                          image: '',
                          inStock: true,
                          visible: true
                        });
                        setShowForm(false);
                      }}
                      className="border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2.5 text-white font-semibold rounded-lg shadow-sm transition flex items-center gap-2 text-sm ${isSubmitting
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 active:scale-95 cursor-pointer'
                        }`}
                    >
                      {isSubmitting ? 'Saving...' : editingId ? 'Save Changes' : 'Add Product'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Existing Products List */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-1.5 mt-6">
        Existing Products ({products.length})
      </h2>

      {loading ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 font-semibold text-sm">Loading product records...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No products found. Click "Add Product" to create one.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Prices</th>
                  <th className="py-4 px-6">Availability</th>
                  <th className="py-4 px-6">Visibility</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {products.map((product) => {
                  const savings = product.mrp - product.price;
                  return (
                    <tr key={product._id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Product Thumbnail & Title */}
                      <td className="py-4 px-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-1 shrink-0">
                          <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-950 line-clamp-1">{product.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                        </div>
                      </td>

                      {/* Prices */}
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                          <span className="text-xs text-gray-400 line-through ml-2">₹{product.mrp.toLocaleString()}</span>
                        </div>
                      </td>

                      {/* Stock Status */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleInStock(product)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer active:scale-95 transition ${product.inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                        >
                          {product.inStock ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" /> In Stock
                            </>
                          ) : (
                            <>
                              <Lock className="h-3 w-3" /> Out Of Stock
                            </>
                          )}
                        </button>
                      </td>

                      {/* Visibility status */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleVisibility(product)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer active:scale-95 transition ${product.visible !== false
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}
                        >
                          {product.visible !== false ? (
                            <>
                              <Eye className="h-3.5 w-3.5" /> Visible
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3.5 w-3.5" /> Hidden
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => startEdit(product)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
