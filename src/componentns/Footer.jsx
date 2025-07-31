import React from 'react';
import Logo from "../assets/logo.jpg";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center text-center">
                    <img src={Logo} alt="logo" className="w-20 h-20 rounded-full mb-6" />
                    <p className="text-gray-400 font-light mb-6 leading-relaxed max-w-xl">
                        Премиальные очки для тех, кто ценит качество, стиль и комфорт.
                        Создаем продукцию с пожизненной гарантией.
                    </p>
                    <div className="flex justify-center space-x-4 mb-6">
                        <a
                            href="https://www.instagram.com/mihlievs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07... (оставь как есть)" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left">
                        {/* Copyright */}
                        <div className="text-gray-400 text-sm font-light">
                            © 2025 Hill's Eyewear. Все права защищены.
                        </div>

                        {/* Payment Methods */}
                        <div className="flex space-x-2">
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

                        {/* Legal Links */}
                        <div className="text-sm">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white font-light transition duration-300"
                            >
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
