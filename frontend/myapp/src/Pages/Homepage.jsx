import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('fullName');
    if (token && fullName) {
      setIsLoggedIn(true);
      setUserInitial(fullName.charAt(0).toUpperCase());
    } else {
      setIsLoggedIn(false);
      setUserInitial("");
    }
  }, []);

  const handleOpenShopClick = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      if (role === 'shopkeeper') {
        navigate('/dashboard/home');
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/shopsearch');
      }
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('shopName');
    setIsLoggedIn(false);
    setUserInitial("");
    navigate('/');
  };

  return (
    <div className="font-[Poppins] relative w-full h-screen overflow-visible">
      {/* Background Image */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHw1J1xUxxbLDOoOh3KK2CVD9nLwyn3ImcUxKVDe7gPXbmbEVl3PcBrmIe92vYLoy_Vpe5A2Z0Tm8gPCqK-SDAsNF4oX1PiVs21kPQlptkRtC3coNp79xCL5cR_sG0nDMvYztALIOQJRyP8zBNQ6PQUoGvyv_pEb05-b4wIfMMNNPa_BM7pNjYuYzuiqXeElhsseFWUZR7bodPWBlwjhrCckSQjK_GjuQ5WIfoO0DqsJJ3eoRdd0nmDbafCo-O3ZCAeZD67_gmyhyT')"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center h-full bg-orange-600 bg-opacity-90 p-10 md:w-1/2 rounded-r-lg shadow-xl">
        <h1 className="text-white font-[Playfair_Display] text-6xl md:text-7xl font-extrabold mb-2 leading-tight">Welcome to</h1>
        <h2 className="text-white font-[Playfair_Display] text-6xl md:text-7xl font-extrabold mb-6 leading-tight">EASY BAZAAR</h2>
        <p className="text-white text-lg md:text-xl text-justify w-3/4 max-w-lg mb-8">
          A simple AaaS platform to launch your online shop in minutes – no technical skills required.
        </p>
        <div className="flex gap-6 mt-5">
          <button
            onClick={handleOpenShopClick}
            className="bg-white text-orange-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 text-lg md:py-4 md:px-8"
          >
            Open Shop
          </button>
          <Link to="/shopsearch" className="bg-white text-orange-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 text-lg md:py-4 md:px-8">Buy Now</Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="absolute top-4 right-6 z-20 hidden md:flex gap-4 text-sm font-[Lato]">
        <Link to="/" className="text-white hover:text-orange-500 px-4 py-2">Home</Link>
        <Link to="/about" className="text-white hover:text-orange-500 px-4 py-2">About</Link>
        <Link to="/contact" className="text-white hover:text-orange-500 px-4 py-2">Contact</Link>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="text-orange-500 bg-white px-4 py-2 rounded-full font-semibold hover:bg-orange-100">Logout</button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                {userInitial}
              </div>
              <span className="text-white">{localStorage.getItem('fullName')}</span>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-orange-500 bg-white px-4 py-2 rounded-full font-semibold hover:bg-orange-100">Login</Link>
            <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">Sign Up</Link>
          </>
        )}
      </nav>

      {/* Hamburger Menu for Mobile */}
      <div className="absolute top-4 right-6 z-20 md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex justify-start">
          <div className="w-3/4 h-full bg-white text-orange-500 shadow-lg flex flex-col p-6">
            <button
              className="self-end mb-6 text-gray-600"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 hover:text-orange-700">Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="py-2 hover:text-orange-700">About</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="py-2 hover:text-orange-700">Contact</Link>
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      {userInitial}
                    </div>
                    <span className="text-orange-500">{localStorage.getItem('fullName')}</span>
                  </div>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="py-2 hover:text-orange-700 text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2 hover:text-orange-700">Login</Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="py-2 hover:text-orange-700">Sign Up</Link>
                </>
              )}
            </nav>
          </div>
          {/* Overlay background */}
          <div className="flex-1 bg-black bg-opacity-30" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Homepage;
