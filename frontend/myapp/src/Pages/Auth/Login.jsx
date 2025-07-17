import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import logingif from'../../assets/logingif.gif';
const Login = () => {
  const [activeTab, setActiveTab] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('signupRole');

    if (storedRole) {
      setActiveTab(storedRole);
      localStorage.removeItem('signupRole');
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setEmail("");
    setPassword("");
    setAdminKey("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      role: activeTab.toLowerCase(),
      password: activeTab === "Admin" ? adminKey : password,
    };

    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role.toLowerCase());
        localStorage.setItem("fullName", data.user.fullName);
        localStorage.setItem("userarea",data.user.area);
        if (data.user.role === "shopkeeper") {
          localStorage.setItem("shopName", data.user.shopName);
        }

        toast.success(`${data.user.role} login successfully!`);

        
setTimeout(() => {
  if (data.user.role === "admin") {
    navigate("/admin");
  } else if (data.user.role === "shopkeeper") {
    navigate("/dashboard/home");
  } else {
    navigate("/shopsearch");
  }
}, 1500); // Delay to show toast
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred during login.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md">
       

        <header className="mb-6 text-center">
  <Link to="/" className="text-4xl font-bold text-red-500 ">
    ShopSphere
  </Link>
</header>


        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        <div className="flex justify-center mb-6 space-x-2">
          {["Customer", "Shopkeeper", "Admin"].map((role) => (
            <button
              key={role}
              className={`tab-button flex-1 py-2 px-2 text-xs sm:text-sm font-medium focus:outline-none ${
                activeTab === role
                  ? "active border-red-500 text-red-500 rounded-lg"
                  : "border border-gray-200 text-gray-500 rounded-lg"
              }`}
              onClick={() => handleTabClick(role)}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <img
            alt="Link GIF"
            className="w-24 h-24 rounded-full border-4 border-red-200"
            src={logingif}
          />
        </div>

        <form onSubmit={handleLogin}>
          {/* Email for all */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              {activeTab === "Admin" ? "Admin Email" : "Email"}
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 placeholder-gray-400 text-gray-700"
              id="email"
              name="email"
              type="email"
              placeholder={activeTab === "Admin" ? "Enter admin email" : "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Admin Key */}
          {activeTab === "Admin" ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="adminKey">
                Admin Key
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 placeholder-gray-400 text-gray-700"
                id="adminKey"
                name="adminKey"
                type="password"
                placeholder="Enter Admin Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
              />
            </div>
          ) : (
            // Password for Customer & Shopkeeper
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 placeholder-gray-400 text-gray-700"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {activeTab !== "Admin" && (
            <div className="flex justify-end mb-6">
              <a href="#" className="text-sm text-red-600 hover:text-red-700 hover:underline">
                Forgot Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            Sign In
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-red-600 hover:text-red-700 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
