import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShopDetails = () => {
  const { shopName } = useParams();
  const [shop, setShop] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    const fetchShop = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/shop/${shopName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShop(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load shop.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchShop();
  }, [shopName]);
  

  

  if (loading) return <div className="p-10 text-center">Loading shop...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  
  if (!shop || Object.keys(shop).length === 0) return <div className="p-10 text-center">Shop not found</div>;

  const handleBuyNow = async (product) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:3000/payment',
        { amount: product.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const order = res.data;
  
      const options = {
        key: 'rzp_test_7l2nsv5t5POMo5', //  Razorpay Key ID
        amount: order.amount,
        currency: 'INR',
        name: product.name,
        description: 'Purchase Product',
        image: product.image,
        order_id: order.id,
        handler: async function () {
          toast.success('Payment Successful!');
          try {
            await axios.post(
              'http://localhost:3000/paymentsuccess',
              {
                productName: product.name,
                price: product.price,
                shopkeeperId: shop.shopkeeperId, // Ensure this is included in shop data
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Stock updated!');
          } catch (err) {
            console.log(err);
            console.log('Payment succeeded, but stock update failed.');
          }
        },
        
        prefill: {
          name: 'fullName',
          email: 'email',
          contact: 'contact',
        },
        theme: {
          color: '#f37254',
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log( err);
      
    }
  };
  

  return (
    
    <div className="bg-slate-50 font-['Work Sans', 'Noto Sans', sans-serif] min-h-screen">
      <header className="flex items-center justify-between border-b border-slate-200 px-10 py-3">
        <div className="flex items-center gap-3 text-slate-900">
          <div className="size-7 text-[var(--primary-color)]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold">{shop.name}</h2>
        </div>
      </header>

      <main className="px-8 py-10 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Product Listing</h1>

          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full border ${selectedCategory === 'All' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Categories
            </button>
            {[...new Set(shop.products.map(p => p.category))].map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full border ${selectedCategory === category ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shop.products
              .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
              .map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl"
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover">
                       <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover"
  />
                    </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-slate-600 mb-3 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xl font-bold text-slate-900">₹{product.price.toFixed(2)}</p>
                      <span
                        className={`text-xs font-semibold bg-${product.stockColor || 'gray'}-100 text-${product.stockColor || 'gray'}-600 px-2 py-1 rounded-full`}
                      >
                        {product.stockStatus}
                      </span>
                    </div>
                

                    <button
  onClick={() => handleBuyNow(product)}
  className={`w-full flex items-center justify-center rounded-lg h-10 px-4 text-white text-sm font-bold tracking-wide transition-colors ${
    product.stockStatus === 'Out of Stock'
      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
      : 'bg-red-500 hover:bg-red-600'
  }`}
  disabled={product.stockStatus === 'Out of Stock'}
>
  Buy Now
</button>

                  </div>
                </div>
              ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/ShopSearch"
              className="min-w-[84px] max-w-[480px] rounded-lg h-11 px-6 bg-slate-200 text-slate-800 hover:bg-slate-300 text-sm font-semibold tracking-wide"
            >
              Back to All Shops
            </Link>
          </div>
        </div>
      </main>
      <ToastContainer position="top-center" autoClose={3000} />

    </div>
  );
};

export default ShopDetails;
