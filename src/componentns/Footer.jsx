import React from 'react'
import Logo from "../assets/logo.jpg";


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
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
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
