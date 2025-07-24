import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';



function Footer() {
  return (
    <>
      <footer className="   bg-orange-600  text-gray-300 py-10 px-6  ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            
          <div>
            <h2 className="text-2xl font-bold  text-white mb-2  ">ShopSphere</h2>
            <p className="text-sm">Connecting small shops to online buyers across India.</p>
          </div>

          <div>
            <h3 className="text-lg  font-semibold text-white mb-2 ">For Buyers</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="" className="text-white  ">Browse Products </Link></li>
              <li><Link to="" className="text-white">Find Shops</Link></li>
              <li><Link to="" className="text-white ">Customer Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2  ">For Shopkeepers</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="" className="text-white ">Join as a Seller</Link></li>
              <li><Link to="" className="text-white   ">Manage Shop</Link></li>
              <li><Link to="" className="text-white">FAQs</Link></li>
            </ul>
          </div>

          <div> 
            <h3 className=" text-lg font-semibold  text-white mb-2 ">Connect</h3>
            <p className="text-sm mb-2  ">Email: support@shopsphere.com</p>
            <div className="flex gap-3 text-xl ">
              <Link to=""/><FaFacebook className="text-white " />
              <Link to=""/><FaTwitter className="text-white  " />
              <Link to=""/><FaInstagram className="text-white " />
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-white-500   mt-8">
          &copy; 2025 ShopSphere. All rights reserved.
        </div>
      </footer>
    </>   
  )
}

export default Footer