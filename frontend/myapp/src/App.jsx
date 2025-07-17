import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Homepage from "./Pages/Homepage";
import HowItWorks from "./Pages/Howitworkspage";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/SignUp";
import ShopSearch from "./Pages/ShopSearch";
import ShopDetails from "./Pages/ShopDetails";
import ShopDashboard from "./Pages/ShopkeeperDashboard"
import ShopsAdminPanel from "./Pages/Dashboards/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute"

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Routes>
    

        <Route path="/" element={<>
  <Homepage />
  <HowItWorks />
</>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/shop/:shopName" element=
        {
          <ProtectedRoute 
        allowedRoles={["customer"]}
        >
          <ShopDetails />
          </ProtectedRoute>
        } />

        {/* Protected Routes without separate Unauthorized page */}
        <Route
          path="/shopsearch"
          element={
            <ProtectedRoute allowedRoles={["customer", "shopkeeper"]}>
              <ShopSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["shopkeeper"]}>
              <ShopDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ShopsAdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
  path="/shop/:shopName"
  element={
    <ProtectedRoute allowedRoles={["customer", "shopkeeper"]}>
      <ShopDetails />
    </ProtectedRoute>
  }
/>


        {/* Catch-all for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
