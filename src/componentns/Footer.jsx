import React from 'react';
import Logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
          <img
            src={Logo}
            alt="logo"
            className="w-20 h-20 rounded-full mb-6"
          />
          <p className="text-gray-400 font-light mb-6 leading-relaxed max-w-xl">
            Премиальные очки для тех, кто ценит качество, стиль и комфорт.
            Создаем продукцию с пожизненной гарантией.
          </p>
          <div className="mb-6">
            <a
              href="https://www.instagram.com/mihlievs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 underline hover:text-white transition"
            >
              Мы в Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
