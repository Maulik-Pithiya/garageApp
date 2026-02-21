import React from 'react';
import { Users, Search , Trash2, Users as Settings } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const Admin = () => {
    const API = "http://localhost:8000/api";

        const [fetchedData, setData] = React.useState([]);
        
        useEffect(() => {    
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API}/allmessages`);
                    setData(response.data);
                } catch (error) {
                    console.log("Error fetching messages:", error);
                }
            }
            fetchData();
        }, []);

        //delete User
        const deleteUserMessage = async (id) => {
          // console.log("Deleting user with ID:", id);
          try {
            await axios.delete(`${API}/delete/message/${id}`);
            // toast.success("User deleted successfully", {icon: ''});

            toast.success('Message deleted successfully!', {
              style: {
                borderRadius: '8px',
                background: '#f0fdf4',        // light green background
                color: '#166534',              // dark green text (Tailwind green-800)
                padding: '12px 16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                border: '1px solid #86efac',   // light green border (Tailwind green-300)
                fontFamily: 'system-ui, sans-serif',
              },
              iconTheme: {
                primary: '#16a34a',            // green check icon (Tailwind green-600)
                secondary: '#f0fdf4',          // background for the icon (matches toast bg)
              },
            });

            setData(prevData => prevData.filter(user => user._id !== id));
          } catch (error) {
            // console.error("Error deleting user:", error);
            toast.error("Failed to delete Message");
          }
        };
  
    return (
    <div className="min-h-screen bg-gray-50">
     
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">GarageAdmin</h1>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg">Dashboard</a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">Customers</a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">Appointments</a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">Services</a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">Settings</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Title and Customer Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Customer Messages</h1>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Messages</p>
              <p className="text-2xl font-semibold text-gray-900">{fetchedData.length}</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Customers Table */}
        {fetchedData.length !== 0 ? 

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-base font-bold text-gray-800 uppercase ">No</th>
                  <th className="px-6 py-4 text-left text-base font-bold text-gray-800 uppercase ">Name</th>
                  <th className="px-6 py-4 text-left text-base font-bold text-gray-800 uppercase ">Email</th>
                  <th className="px-6 py-4 text-left text-base font-bold text-gray-800 uppercase ">Phone</th>
                  <th className="px-6 py-4 text-left text-base font-bold text-gray-800 uppercase ">Message</th>
                  <th className="px-6 py-4 text-center text-base font-bold text-gray-800 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 ">
                {fetchedData.map((item, index) => (
                  
                  <tr key={item._id} className="hover:bg-gray-100 transition duration-150">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 min-w-[200px] max-w-[300px]">{item.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      
                      <div className="flex items-center justify-center gap-3">  
                        <button className="text-red-600 hover:text-red-800 transition" title="Delete" onClick={() => deleteUserMessage(item._id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Simple Pagination */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 1 to {fetchedData.length} of {fetchedData.length} entries</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100">Previous</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
        
        :<div className='text-2xl font-bold text-blue-600 text-center sm:mt-10 sm:mb-0'>No Records </div>}
      </div>
    </div>
  );
};

export default Admin;