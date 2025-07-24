
import React from 'react';
import ShopkeeperDashboard from '../../assets/dashboard.png';
import links  from '../../assets/link.png';
import login from '../../assets/login.png';
import photo from '../../assets/photo.png';
import delihevery from '../../assets/delivery.png';
import Analytic from '../../assets/analytics.png';
import admin from '../../assets/admin.png';
const features = [
  { icon: <img src={ShopkeeperDashboard} alt="Dashboard" className="w-6 h-6" />, text: "Shopkeeper Dashboard" },
  { icon: <img src={links} alt="Link" className="w-6 h-6" />, text: "Unique Store Link" },
  { icon: <img src={login} alt="Login" className="w-6 h-6" />, text: "Role-based Login" },
  { icon: <img src={photo} alt="Photo" className="w-6 h-6" />, text: "Image Upload from Mobile" },
  { icon: <img src={delihevery} alt="Delivery" className="w-6 h-6" />, text: "Order & Delivery Management" },
  { icon: <img src={Analytic} alt="Analytics" className="w-6 h-6" />, text: "Analytics Dashboard" },
  { icon: <img src={admin} alt="Admin" className="w-6 h-6" />, text: "Admin Panel" },
];

function Needs() {
  return (
    <div className="bg-[#fdf1e2] flex flex-col justify-center items-center sm:p-3 md:p-3 lg:p-3 xl:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[25px] justify-center items-center text-center m-3">
        {features.map((ftr, idx) => (
          <div
            className="shadow-xl rounded-2xl min-w-30 min-h-30 max-w-40 flex flex-col justify-center items-center p-3 bg-white"
            key={idx}
          >
            <p className="p-1 m-1">{ftr.icon}</p>
            <p className="text-xl font-semibold text-gray-700 mt-1 text-center">{ftr.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Needs;
