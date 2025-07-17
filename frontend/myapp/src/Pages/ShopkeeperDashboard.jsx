


import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeicon.png";
import productIcon from "../assets/producticon.png";
import analyticIcon from "../assets/analyticicon.png";
import logoutIcon from "../assets/logouticon.png";
import { HiMenu } from 'react-icons/hi';
import axios from 'axios';

import Home from '../Pages/Dashboards/Home';
import Product from '../Pages/Dashboards/Product';
import Analytic from "../Pages/Dashboards/Analytic";
import AddProduct from "../Pages/Dashboards/AddProduct";

const ShopkeeperDashboard = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userNameInitial, setUserNameInitial] = useState("");
  const [currentShopName, setCurrentShopName] = useState("");
  const navigate = useNavigate();

  // Load shop info from localStorage
  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) setUserNameInitial(storedFullName.charAt(0).toUpperCase());

    const storedShopName = localStorage.getItem('shopName');
    if (storedShopName) setCurrentShopName(storedShopName);
  }, []);

  // Fetch all products from backend
  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get("http://localhost:3000/product",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
 
  
  
  
  

  const addProduct = async (formData) => {
    const token = localStorage.getItem('token');
    try {
      const requiredFields = ["productname", "price", "category", "stockQuantity"];
      for (let field of requiredFields) {
        if (!formData.get(field)) {
          console.error(`Missing required product field: ${field}`);
          return;
        }
      }
  
      const res = await axios.post("http://localhost:3000/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      setProducts(prev => [...prev, res.data]);
      navigate("/dashboard/product");
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  
  // Edit product
  
  const handleEdit = (product) => {
    setProductToEdit(product);
    setSidebarOpen(false);
    navigate("/dashboard/addproduct");
  };
  

 
  

  // Delete product
 


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Deleted ID:", id);
      setProducts(prevProducts => prevProducts.filter(p => p._id !== id));
  
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };
  

  const clearEdit = () => setProductToEdit(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleAddProduct = () => {
    setProductToEdit(null);
    setSidebarOpen(false);
    navigate("/dashboard/addproduct");
  };

  const location = useLocation();
  const currentPath = location.pathname;
  const updateproduct = async (id, formData) => {
    const token=localStorage.getItem("token")
    try {
      const res = await axios.put(`http://localhost:3000/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Replace the updated product in the list
      setProducts(function(prevProducts) {
        return prevProducts.map(function(p) {
          if (p._id === id) {
            return res.data;
          } else {
            return p;
          }
        });
      });
      
      navigate("/dashboard/product");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };
  
  const navItems = [
    { img: homeIcon, label: "Home", path: "/dashboard/home" },
    { img: productIcon, label: "Products", path: "/dashboard/product" },
    { img: analyticIcon, label: "Analytics", path: "/dashboard/analytic" },
    { img: logoutIcon, label: "Logout", path: "/logout" },
  ];

  return (
    <div className="relative flex min-h-screen bg-white overflow-x-hidden">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(true)}
      >
        <HiMenu size={28} />
      </button>

      {/* Sidebar */}
      <div className="hidden md:block md:w-1/3 p-6 border-r bg-white h-full min-h-screen shadow-lg">
        <h1 className="text-xl font-semibold mb-6">{currentShopName || "Shop Name"}</h1>
        <div className="flex flex-col gap-2">
          {navItems.map((item) =>
            item.label === "Logout" ? (
              <button
                key={item.label}
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <img src={item.img} alt={item.label} className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                to={item.path}
                key={item.label}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                  currentPath.endsWith(item.path) ? "bg-[#f4f0f0]" : ""
                }`}
              >
                <img src={item.img} alt={item.label} className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          )}
        </div>
        <button className="mt-6 w-full bg-[#e92932] text-white py-2 rounded-lg font-bold" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-3/4 bg-white p-4 border-r shadow-lg flex flex-col">
            <button className="self-end mb-4" onClick={() => setSidebarOpen(false)}>✕</button>
            <h1 className="text-xl font-semibold mb-6">{currentShopName || "Shop Name"}</h1>
            <div className="flex flex-col gap-2">
              {navItems.map((item) =>
                item.label === "Logout" ? (
                  <button
                    key={item.label}
                    onClick={() => { setSidebarOpen(false); handleLogout(); }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <img src={item.img} alt={item.label} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    key={item.label}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                      currentPath.endsWith(item.path) ? "bg-[#f4f0f0]" : ""
                    }`}
                  >
                    <img src={item.img} alt={item.label} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              )}
            </div>
            <button className="mt-6 w-full bg-[#e92932] text-white py-2 rounded-lg font-bold" onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
          <div className="flex-1 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{currentShopName || "Shopkeeper Dashboard"}</h2>
          <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg">
            {userNameInitial}
          </div>
        </div>
        <Routes>
          <Route index element={<Home shopName={currentShopName} />} />

          <Route path="home" element={<Home shopName={currentShopName} />} />

          <Route path="product" element={
            <Product
             products={products} 
             onEdit={handleEdit} 
             onDelete={handleDelete} 
             />} />

          <Route path="analytic" element={<Analytic />} />

          <Route path="addproduct" element={
            <AddProduct addProduct={addProduct} productToEdit={productToEdit} 
          clearEdit={clearEdit} 
          updateproduct={updateproduct}
          />} />

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
