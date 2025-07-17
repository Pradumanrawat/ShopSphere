
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Home = ({ shopName  }) => {
  const [stats, setStats] = useState({
    products: 0,
    sales: 0,
    orders: 0,
    
  });

 

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
const res = await axios.get('http://localhost:3000/analytic', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const data = res.data;

  
        setStats({
          products: data.totalproducts || 0,
          sales: data.totalRevenue || 0,
          
          orders: data.totalOrdersFromCustomers||0 // Replace with actual data if needed
        });
      } catch (error) {
        console.error("Error fetching shop stats:", error);
      }
    };
  
    fetchStats();
  }, []);
  

  return (
    <div className="p-8">
      {/* <ToastContainer /> */}
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back, {shopName} 👋</h2>
      <p className="text-lg text-gray-600 mb-10">Here's a  overview of your shop performance .</p>

      {/* Share Link */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8 mb-10">
        <h4 className="text-lg font-semibold text-gray-600 mb-4">Share Your Shop Link</h4>
        <div className="flex items-center space-x-4">
          <p className="text-blue-600 text-sm break-all flex-grow">
            {`${window.location.origin}/shop/${shopName}`}
          </p>
          <button
            onClick={() => {
              const link = `${window.location.origin}/shop/${shopName}`;
              navigator.clipboard.writeText(link)
                .then(() => alert('Shop link copied to clipboard!'))
                .catch(err => {
                  console.error('Failed to copy link:', err);
                  alert('Failed to copy link.');
                });
            }}
            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition-colors"
          >
            Copy Link
          </button>
        </div>
      </div>




      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-600">Total Products</h4>
          <p className="text-3xl font-bold text-[#e92932] mt-4">{stats.products}</p>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-600">Today's Sales</h4>
          <p className="text-3xl font-bold text-[#e92932] mt-4">₹{stats.sales}</p>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-600">Order Received</h4>
          <p className="text-3xl font-bold text-[#e92932] mt-4">{stats.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
