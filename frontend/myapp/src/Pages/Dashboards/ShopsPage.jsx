
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShopPage = () => {
  const { shopName } = useParams();
  const navigate = useNavigate();
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const currentShop = localStorage.getItem('shopName');

    // 🚫 Prevent shopkeeper from accessing another shop's page
    if (role === 'shopkeeper' && currentShop !== shopName) {
      alert("You can't access other shop pages.");
      return navigate('/home'); // Redirect to shopkeeper home
    }

    // ✅ If access is allowed, fetch shop data
    const fetchShopData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/shopdata/${shopName}`);
        setShopData(res.data);
      } catch (err) {
        console.error('Failed to fetch shop data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [shopName, navigate]);

  if (loading) return <div className="p-4 text-gray-600">Loading shop...</div>;
  if (!shopData) return <div className="p-4 text-red-500">Shop not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{shopData.name}</h1>
      <p className="text-gray-600">Address: {shopData.address}</p>
      {/* Show products, offers, etc. here */}
    </div>
  );
};

export default ShopPage;
