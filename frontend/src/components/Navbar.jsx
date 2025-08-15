import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-removed.png'; // adjust the path as needed

const Navbar = () => {
  return (
    <header className="bg-slate-700 text-white font-bold text-l shadow mb-10 ">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
           Yellow Stone
        </Link>

        {/* Center Nav Links */}
        <ul className="flex space-x-6 text-base font-medium">
          <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
          <li><Link to="/services" className="hover:text-yellow-300 transition">Services</Link></li>
          <li><Link to="/about" className="hover:text-yellow-300 transition">About Us</Link></li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex space-x-3">
          <Link
            to="/login"
            className="px-4 py-1 border border-white rounded-md hover:bg-white hover:text-indigo-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-1 bg-white text-indigo-600 rounded-md hover:bg-yellow-300 hover:text-black transition"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
