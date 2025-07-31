import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/m01.png"
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky  top-0 z-50 bg-white shadow border-b border-gray-100 ">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/"><img src={Logo} alt="logo" className='w-[100px] h-[40px]' /></Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-black font-light tracking-wide transition-colors duration-200 uppercase text-sm"
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className="text-gray-700 hover:text-black font-light tracking-wide transition-colors duration-200 uppercase text-sm"
            >
              коллекция
            </Link>

              <Link
              to="/catalog"
              className="text-gray-700 hover:text-black font-light tracking-wide transition-colors duration-200 uppercase text-sm"
            >
            </Link>
          
          </nav>

          {/* Cart and Menu Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="text-gray-700 hover:text-black transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-black transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-left text-gray-700 hover:text-black font-light tracking-wide transition-colors duration-200 uppercase text-sm py-2"
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className="text-left text-gray-700 hover:text-black font-light tracking-wide transition-colors duration-200 uppercase text-sm py-2"
              >
                коллекция
              </Link>
             
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
