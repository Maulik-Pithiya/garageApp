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
      