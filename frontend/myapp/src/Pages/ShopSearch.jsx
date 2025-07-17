
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ShopCard = ({ shop }) => {
  const handleCopyLink = async (e) => {
    e.stopPropagation();
    const link = `${window.location.origin}/shop/${shop.shopName}`;
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy link.');
    }
  };

  return (
    <div className="flex flex-1 gap-4 rounded-xl border bg-white p-4 items-center shop-card transition-all duration-200 ease-in-out">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-12 h-12 shrink-0"
        style={{ backgroundImage: `url(${shop.image || 'https://via.placeholder.com/50'})` }}
      ></div>
      <div className="flex flex-col justify-center flex-grow">
        <h3>{shop.name}</h3>
        <div className="flex items-center mt-1">
          <Link
            to={`/shop/${shop.shopName}`}
            className="text-blue-600 text-xs break-all mr-2 hover:underline"
          >
            {`${window.location.origin}/shop/${shop.shopName}`}
          </Link>
          <button
            onClick={handleCopyLink}
            className="bg-blue-500 text-white py-0.5 px-2 rounded text-xs hover:bg-blue-600 transition-colors duration-200"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

const ShopSearchPage = () => {
  const [query, setQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [userInitial, setUserInitial] = useState('');
  const [fullName, setFullName] = useState('');
  const [userarea, setuserarea] = useState('');
  const navigate = useNavigate();

  const fetchShops = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `http://localhost:3000/shoplinks${query ? `?query=${query}` : ''}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShops(response.data);
    } catch (err) {
      console.error('Failed to load shops:', err);
    }
  };

  useEffect(() => {
  
    const storedName = localStorage.getItem('fullName');
    
    const userrole=localStorage.getItem('role'); // Make sure this exists!

    if (storedName) {
      setFullName(storedName);
      setUserInitial(storedName.charAt(0).toUpperCase());
    }
    if (userrole === 'customer') {
      const storedarea = localStorage.getItem('userarea');
      if (storedarea) {
        setuserarea(storedarea);  // for showing area
      }
    }
   

    fetchShops();
  }, [query]);

  const handleLogout = () => {
    localStorage.clear();
    setUserInitial('');
    setFullName('');
    setuserarea('');
    navigate('/');
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <nav className="px-4 py-3 flex items-center bg-white text-gray-800 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex-none">
          <Link to="/" className="text-xl font-bold">
            ShopSphere
          </Link>
        </div>

        <div className="flex-1 flex justify-center mx-4">
          <label className="h-10 max-w-xl w-full">
            <div className="flex w-full items-stretch h-full bg-white rounded-full border border-gray-300">
              <div className="text-gray-500 flex items-center justify-center pl-3 rounded-l-full">
                <svg fill="currentColor" height="20px" width="20px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for products"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-full text-gray-800 focus:outline-none focus:ring-0 border-none h-full px-4 pl-2 text-sm font-medium leading-normal"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </label>
        </div>

        <div className="flex-none flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="text-orange-500 bg-white px-4 py-2 rounded-full font-semibold hover:bg-orange-100"
          >
            Logout
          </button>

          <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-full shadow">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
              {userInitial}
            </div>
            <span className="text-sm font-semibold text-orange-600">
              {fullName}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="px-4 py-2 pt-20 flex-1 overflow-y-auto h-full">
        {query.trim() ? (
          <>
            <h2 className="text-gray-800 text-lg font-semibold mb-3">
              Search Results for "{query}"
            </h2>
            {shops.length > 0 ? (
              <div className="flex flex-col w-full gap-4">
                {shops.map((shop, index) => (
                  <ShopCard shop={shop} key={index} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                "{query}" is not available in any shops.
              </div>
            )}
          </>
        ) : (
          <>
          
              <h2 className="text-gray-800 text-lg font-semibold pb-3 pt-2">
  {userarea ? `Nearby Shops Shown (${userarea})` : 'All Shops'}
</h2>

            
            <div className="flex flex-col w-full gap-4">
              {shops.map((shop, index) => (
                <ShopCard shop={shop} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopSearchPage;
