import React from "react";
import accountImg from "../assets/account.png";
import productImg from "../assets/addproduct.png";
import shareImg from "../assets/link.gif";


const HowItWorks = () => {
  return (
    <div className="bg-[#fdf1e2] min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-[Roboto]">
      <div className="w-full max-w-5xl">
        
        <div className="text-center mb-12">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl text-gray-800 font-[Playfair_Display] font-bold tracking-wide"
            data-aos="fade-up"
          >
            HOW IT WORKS FOR SHOPKEEPERS?
          </h1>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-orange-100 p-4 rounded-full mb-6">
              <img src={accountImg} alt="Create Account" className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Create Account</h2>
            <p className="text-gray-600 text-sm">Sign up and name your store.</p>
          </div>

         
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              <img src={productImg} alt="Add Products" className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Add Products</h2>
            <p className="text-gray-600 text-sm">Upload your items with photos and prices.</p>
          </div>

          {/* Step 3 */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <img src={shareImg} alt="Share Store" className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Share &amp; Sell</h2>
            <p className="text-gray-600 text-sm">
              Share your store link or QR code and start receiving orders.
            </p>
          </div>
        </div>

        {/* Final heading */}
        <div className="text-center mt-16" data-aos="zoom-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
            Everything You Need in One Platform
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;




