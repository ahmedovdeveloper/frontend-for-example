import React from 'react';
import Logo from "../assets/logo.jpg"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">



            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 text-center">
                        <img src={Logo} alt="logo" className='w-[70px] h-[70px] rounded-[100%]' />
                        <p className="text-gray-400 font-light mb-8 leading-relaxed max-w-2xl mx-auto">
                            Премиальные очки для тех, кто ценит качество, стиль и комфорт.
                            Создаем продукцию с пожизненной гарантией.
                        </p>

                        <div className="flex justify-center space-x-4">

                            <a href="https://www.instagram.com/mihlievs/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

                        {/* Copyright */}
                        <div className="text-gray-400 font-light text-sm">
                            © 2025 Hill's Eyewear. Все права защищены.
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                                    <span className="text-xs text-white font-bold">V</span>
                                </div>
                                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                                    <span className="text-xs text-white font-bold">MC</span>
                                </div>
                                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                                    <span className="text-xs text-white font-bold">P</span>
                                </div>
                            </div>
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center space-x-4 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white font-light transition-colors duration-300">
                                Политика конфиденциальности
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;