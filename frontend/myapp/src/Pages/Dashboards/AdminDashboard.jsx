import React, { useEffect, useState } from "react";
import shopIcon from '../../assets/shop.png';
import userIcon from '../../assets/user.png';
import logoutIcon from '../../assets/logouticon.png';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ShopsPage from './ShopsPage';
import CustomersPage from './CustomersPage';

const ShopsAdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userNameInitial, setUserNameInitial] = useState("");
  const [fullName, setFullName] = useState("Admin"); // Default to "Admin" if not found
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the current overview title based on the path
  const getHeaderTitle = () => {
    if (location.pathname.includes("/admin")) {
      return "Customers Overview";
    } else {
      return "Shops Overview"; // Default title if not customers, or if it's the base /admin/ path
    }
  };

  useEffect(() => {
    console.log("AdminDashboard - Current pathname:", location.pathname);
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
      setUserNameInitial(storedFullName.charAt(0).toUpperCase());
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]); // Added location.pathname to dependency array

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    navigate('/');
  };

  const navItems = [
    { img: shopIcon, label: "Shops", path: "/admin/shops" },
    { img: userIcon, label: "Customers", path: "/admin/customers" },
    { img: logoutIcon, label: "Logout", path: "/logout" },
  ];

  return (
    <div className="relative flex h-screen bg-gray-50 font-['Inter','Noto Sans',sans-serif]">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded shadow"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Desktop Sidebar (md+ screens) */}
      <div className="hidden md:block md:w-1/3 p-6 border-r bg-white h-full min-h-screen shadow-lg">
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
         
          <Link to="/" className="text-red-500 text-xl font-bold">ShopSphere</Link>
        </div>
        <nav className="p-4 space-y-2 flex-grow">
          {navItems.map((item) => (
            item.label === "Logout" ? (
              <button
                key={item.label}
                onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm hover:bg-gray-100 text-gray-600`}
          >
                <img src={item.img} alt={item.label} className="w-6 h-6" />
                <p>{item.label}</p>
              </button>
            ) : (
              <Link
                to={item.path}
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm ${
                  location.pathname.includes(item.path)
                    ? "bg-red-100 text-red-500"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
          >
                <img src={item.img} alt={item.label} className="w-6 h-6" />
                <p>{item.label}</p>
              </Link>
            )
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-3/4 bg-white p-4 border-r h-full shadow-lg flex flex-col">
            <button
              className="self-end mb-4 text-gray-600"
              onClick={toggleSidebar}
              aria-label="Close menu"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 p-6 border-b border-gray-200">
              
              <Link to="/" onClick={() => setSidebarOpen(false)} className="text-red-500 text-xl font-bold">ShopSphere</Link>
            </div>
            <nav className="p-4 space-y-2 flex-grow">
              {navItems.map((item) => (
                item.label === "Logout" ? (
                  <button
                    key={item.label}
                    onClick={() => { toggleSidebar(); handleLogout(); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm hover:bg-gray-100 text-gray-600`}
              >
                    <img src={item.img} alt={item.label} className="w-6 h-6" />
                    <p>{item.label}</p>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    key={item.label}
                onClick={toggleSidebar} // Close sidebar on navigation
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm ${
                      location.pathname.includes(item.path)
                        ? "bg-red-100 text-red-500"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
              >
                    <img src={item.img} alt={item.label} className="w-6 h-6" />
                    <p>{item.label}</p>
                  </Link>
                )
              ))}
            </nav>
          </div>
          {/* Overlay background */}
          <div className="flex-1 bg-black bg-opacity-30" onClick={toggleSidebar} />
        </div>
      )}

      {/* Main Content Area for Conditional Rendering */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-6 border-b border-gray-200 flex items-center justify-between mb-6">
          <h2 className="text-gray-900 text-2xl font-semibold">{getHeaderTitle()}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg">
                {userNameInitial}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{fullName}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        <div className="p-6 space-y-6 flex-grow overflow-y-auto overflow-x-auto">
          {console.log("Rendering ShopsPage based on shops path:", location.pathname.includes("/admin/shops"))}
          {location.pathname.includes("/admin/shops") && <ShopsPage />}
          {console.log("Rendering CustomersPage based on customers path:", location.pathname.includes("/admin/customers"))}
          {location.pathname.includes("/admin/customers") && <CustomersPage />}
          {console.log("Rendering ShopsPage as default:", !location.pathname.includes("/admin/shops") && !location.pathname.includes("/admin/customers"))}
          {!location.pathname.includes("/admin/shops") && !location.pathname.includes("/admin/customers") && <ShopsPage />}
        </div>
      </div>
    </div>
  );
};

export default ShopsAdminPanel;
