import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signup = () => {
  const [activeForm, setActiveForm] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [shopName, setShopName] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [shopkeeperFullName, setShopkeeperFullName] = useState('');
  const [shopkeeperEmail, setShopkeeperEmail] = useState('');
  const [shopkeeperPassword, setShopkeeperPassword] = useState('');
  const [shopkeeperPhoneNumber, setShopkeeperPhoneNumber] = useState('');
  const [shopkeeperShopAddress, setShopkeeperShopAddress] = useState('');
  const [adminFullName, setAdminFullName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPhoneNumber, setAdminPhoneNumber] = useState('');

  const navigate = useNavigate();

  


  const delhiAreas = [
    // North West Delhi
    "Adarsh Nagar", "Keshav Puram", "Pitampura", "Shalimar Bagh", "Shastri Nagar", "Rohini",
    // North Delhi
    "Azadpur", "Civil Lines", "Kamla Nagar", "Kashmiri Gate", "Sarai Rohilla", "Mukherjee Nagar", "Majnu-ka-tilla", "Aruna Nagar",
    // North East Delhi
    "Dilshad Garden", "Naveen Shahdara", "Shahdara", "Shastri Park",
    // Central Delhi
    "Chandni Chowk", "Connaught Place", "Karol Bagh", "Bhikaji Cama Place", "Chanakyapuri", "Gole Market", "Paharganj", "Rajender Nagar",
    // New Delhi
    "Patel Chowk", "Janpath", "ITO", "Jama Masjid", "RK Ashram Park", "Aerocity", "Lodhi Colony", "Mahipalpur", "Rajiv Chowk", "Pragati Maidan", "Rajendra Place",
    // East Delhi
    "Mayur Vihar Phase I", "Mayur Vihar Phase II", "Akshardham", "Patparganj", "Nirman Vihar", "Laxmi Nagar", "Preet Vihar", "Anand Vihar",
    // South Delhi
    "Green Park", "Hauz Khas", "IIT Delhi", "Kailash Colony", "Maharani Bagh", "Malviya Nagar", "Mehrauli", "Munirka", "R.K. Puram", "Safdarjung Enclave", "Saket", "Sarojini Nagar", "Shaheen Bagh", "South Extension",
    // South East Delhi
    "Ashram Chowk", "Khan Market", "Okhla NSIC", "Nizamuddin", "Sarai Kale Khan", "Jangpura", "Jasola", "Defence Colony", "Lajpat Nagar", "New Friends Colony", "Nehru Place", "Nehru Enclave", "Govindpuri", "Greater Kailash", "Okhla", "Okhla Phase I", "Okhla Phase II", "Sarita Vihar", "Tughlaqabad", "Badarpur",
    // Southwest Delhi
    "Dwarka", "Dwarka Sector 8", "Dwarka Sector 10", "Dwarka Sector 11", "Dwarka Sector 12", "Dwarka Sector 13", "Dwarka Sector 14", "Dwarka Sector 9", "Dwarka Sector 21", "Dashrath Puri", "Delhi Cantonment", "Dhaula Kuan", "Ghitorni", "Janakpuri", "Moti Bagh", "Naraina", "Palam", "Rama Krishna Puram", "Sagar Pur", "Vasant Kunj", "Vasant Vihar", "Kalkaji",
    // West Delhi
    "Ashok Nagar", "Ramesh Nagar", "Subhash Nagar", "Nawada", "Dwarka Mor", "Kirti Nagar", "Mayapuri", "Moti Nagar", "Paschim Vihar", "Patel Nagar", "Punjabi Bagh", "Rajouri Garden", "Shivaji Place", "Tilak Nagar", "Vikaspuri", "West Patel Nagar", "Uttam Nagar", "Hari Nagar"
  ];
  

  const handleCustomerSignup = async (e) => {
    e.preventDefault(); //stop the bydefault nature of form reloding 
    try {
      const customerdata={
        role: "customer",
        fullName,
        email,
        password,
        phoneNumber,
        address
      }
      const response = await axios.post('http://localhost:3000/signup',customerdata);

      if (response.status === 200) {
        toast.success("Customer account created successfully!");
        navigate("/login");
      }
      else{
           toast.error("error creating an account");
      }

    } catch (error) {
      console.error('Customer signup error:', error);
      toast.error("internal server error");
    }
  };
  
  const handleShopkeeperSignup = async (e) => {
    e.preventDefault();
    try {
      const shopkeeperData = {
        fullName: shopkeeperFullName,
        email: shopkeeperEmail,
        password: shopkeeperPassword,
        shopName: shopName,
        phoneNumber: shopkeeperPhoneNumber,
        shopaddress: shopkeeperShopAddress,
        role: 'shopkeeper',
      };

      const response = await axios.post('http://localhost:3000/signup', shopkeeperData);

      if (response.status === 200) {
        toast.success("Shopkeeper account created successfully!");
        navigate("/login");
      }
      else{
        toast.error("error occur during creating an account")
      }
      
    } catch (error) {
      console.error('Shopkeeper signup error:', error);
      toast.error("internal server eror");
    }
  };
  
 
  const handleAdminSignup = async (e) => {
    e.preventDefault();
    try {
      const adminData = {
        fullName: adminFullName,
        email: adminEmail,
        password: adminPassword,
        phoneNumber: adminPhoneNumber,
        adminKey: adminKey,
        role: 'admin',
      };

      const response = await axios.post('http://localhost:3000/signup', adminData);

      if (response.status === 200) {
        toast.success("Admin account created successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Admin signup failed.");
      }
    } catch (error) {
      console.error("Admin signup error:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred during signup.");
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case "customer":
        return (
          <form className="space-y-6" onSubmit={handleCustomerSignup}>
            <div>
              <label  className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text"  className="w-full border border-gray-300 rounded-md p-2" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="customer-email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="customer-email" className="w-full border border-gray-300 rounded-md p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>

              <input type="password"  className="w-full border border-gray-300 rounded-md p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" className="w-full border border-gray-300 rounded-md p-2" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address (Delhi Area)</label>
              <select  className="w-full border border-gray-300 rounded-md p-2" value={address} onChange={(e) => setAddress(e.target.value)} required>
                <option value="">Select an Area in Delhi</option>
                {delhiAreas.map((area) => (
                  <option  value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-red-500" required />
              <label htmlFor="customer-terms" className="ml-2 text-sm text-gray-700">I agree to the Terms and Conditions</label>
            </div>

            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md">Sign Up as Customer</button>
          </form>
        );

      case "shopkeeper":
        return (
          <form onSubmit={handleShopkeeperSignup} className={`${activeForm === 'shopkeeper' ? 'block' : 'hidden'} space-y-4`}>
            <div className="mb-4">
              <label htmlFor="shopkeeperFullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                id="shopkeeperFullName"
                placeholder="Full Name"
                value={shopkeeperFullName}
                onChange={(e) => setShopkeeperFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shopkeeperEmail" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="text"
                id="shopkeeperEmail"
                placeholder="Email"
                value={shopkeeperEmail}
                onChange={(e) => setShopkeeperEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shopkeeperPassword" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                id="shopkeeperPassword"
                placeholder="Password"
                value={shopkeeperPassword}
                onChange={(e) => setShopkeeperPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shopName" className="block text-gray-700 text-sm font-bold mb-2">Shop Name</label>
              <input
                type="text"
                id="shopName"
                placeholder="Shop Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shopkeeperPhoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <input
                type="text"
                id="shopkeeperPhoneNumber"
                placeholder="Phone Number"
                value={shopkeeperPhoneNumber}
                onChange={(e) => setShopkeeperPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shopkeeperShopAddress" className="block text-gray-700 text-sm font-bold mb-2">Shop Address</label>
              <select
                id="shopkeeperShopAddress"
                value={shopkeeperShopAddress}
                onChange={(e) => setShopkeeperShopAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select your area</option>
                {delhiAreas.map((area, index) => (
                  <option key={index} value={area}>{area}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Sign Up as Shopkeeper
            </button>
          </form>
        );

      case "admin":
        return (
          <form className="space-y-6" onSubmit={handleAdminSignup}>
            <div>
              <label htmlFor="admin-name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="admin-name" className="w-full border border-gray-300 rounded-md p-2" value={adminFullName} onChange={(e) => setAdminFullName(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="admin-email" className="w-full border border-gray-300 rounded-md p-2" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="admin-password" className="w-full border border-gray-300 rounded-md p-2" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="admin-phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="admin-phone" className="w-full border border-gray-300 rounded-md p-2" value={adminPhoneNumber} onChange={(e) => setAdminPhoneNumber(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="admin-key" className="block text-sm font-medium text-gray-700">Admin Key</label>
              <input type="text" id="admin-key" className="w-full border border-gray-300 rounded-md p-2" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} required />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="admin-terms" className="h-4 w-4 text-red-500" required />
              <label htmlFor="admin-terms" className="ml-2 text-sm text-gray-700">I agree to the Administrator Agreement</label>
            </div>

            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md">Sign Up as Admin</button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

          <div className="flex border-b border-gray-300 mb-6">
            {["customer", "shopkeeper", "admin"].map((role) => (
              <button
                key={role}
                onClick={() => {
                  setActiveForm(role);
                  setEmail("");
                  setPassword("");
                  setFullName("");
                  setPhoneNumber("");
                  setAddress("");
                  setShopName("");
                  setAdminKey("");
                  setShopkeeperFullName("");
                  setShopkeeperEmail("");
                  setShopkeeperPassword("");
                  setShopkeeperPhoneNumber("");
                  setShopkeeperShopAddress("");
                  setAdminFullName("");
                  setAdminEmail("");
                  setAdminPassword("");
                  setAdminPhoneNumber("");
                }}
                className={`flex-1 py-3 text-center font-medium ${activeForm === role ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"}`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          {renderForm()}

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 font-medium hover:text-red-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
