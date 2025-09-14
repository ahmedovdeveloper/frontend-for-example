import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/m01.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src={Logo} 
                alt="logo" 
                className={`w-[100px] h-[40px] transition-all duration-300 ${
                  isScrolled ? '' : 'filter brightness-0 invert'
                }`} 
              />
            </Link>
          </div>
           
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-light tracking-wide transition-colors duration-200 uppercase text-sm ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black' 
                  : 'text-white hover:text-gray-300'
              }`}
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className={`font-light tracking-wide transition-colors duration-200 uppercase text-sm ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black' 
                  : 'text-white hover:text-gray-300'
              }`}
            >
              коллекция
            </Link>
          </nav>
           
          {/* Cart and Menu Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className={`transition-colors duration-200 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black' 
                  : 'text-white hover:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
             
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden transition-colors duration-200 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black' 
                  : 'text-white hover:text-gray-300'
              }`}
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
          <nav className={`md:hidden mt-4 pt-4 border-t ${
            isScrolled ? 'border-gray-200' : 'border-white/20'
          }`}>
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-left font-light tracking-wide transition-colors duration-200 uppercase text-sm py-2 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-black' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className={`text-left font-light tracking-wide transition-colors duration-200 uppercase text-sm py-2 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-black' 
                    : 'text-white hover:text-gray-300'
                }`}
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