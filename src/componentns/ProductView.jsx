// src/components/ProductView.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefualtHeader from './DefualtHeader';

const ProductView = () => {
  const { id } = useParams(); // id з URL, наприклад "1", "2", "3", "4"
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Той самий масив продуктів, що й у ProductCards (з уніфікованими зображеннями)
    const products = [
    {
      _id: "1",
      name: "CHELSEA BLACK/BLUE",
      price: "385.000 uzs",
      originalPrice: "600.000 uzs",
      images: [
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603549/uploads/xp8i1txivzp8ildi4uzt.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603609/uploads/nlyorrjsoj1ydy2o6zqf.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603663/uploads/udizegkmpbtxi2fyibp7.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603724/uploads/am41thknuqhsxxnc9rq0.jpg"
      ],
      soldOut: false
    },
    {
      _id: "2",
      name: "Roland Tortoise White",
      price: "350.000 uzs",
      originalPrice: "550.000 uzs",
      images: [
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603775/uploads/kt8txzbiywzekwosfryi.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603810/uploads/sk5duovigsrfhctsbhii.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603857/uploads/mfwmcn8eekjhwnozlfm3.png",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603961/uploads/jc9l7jlrlwdigtyrsdtg.jpg"
      ],
      soldOut: false
    },
    {
      _id: "3",
      name: "Roland Tortoise Blue Chameleon",
      price: "420.000 uzs",
      originalPrice: "599.000 uzs",
      images: [
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603995/uploads/lsh05uikpt4fpn6yyhyp.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604016/uploads/jgbpn77axon8zj8vkmzu.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604084/uploads/tu4o27x0nkak2exmurri.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604138/uploads/kmc2fixm7ncrtrawp8pn.jpg",
      ],
      soldOut: false
    },
    {
      _id: "4",
      name: "Chelsea Black Chameleon",
      price: "455.000 uzs",
      originalPrice: "700.000 uzs",
      images: [
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604495/uploads/o3mimvv3nqoyawn3ogh0.png",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604205/uploads/ak7te1svbacdzjg8maly.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604238/uploads/jdlfuherprkc9uapoe2g.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767605868/uploads/tgymlurmbressatnrgm4.jpg",
      ],
      soldOut: false
    }]

  // Правильний пошук продукту за _id (рядок)
  const product = products.find(p => p._id === id);

  if (!product) {
    return (
      <div className="text-center py-32 text-red-600">
        <h1 className="text-4xl font-bold">Товар не знайдено</h1>
        <button onClick={() => navigate(-1)} className="mt-6 text-blue-600 underline">
          ← Повернутися назад
        </button>
      </div>
    );
  }

  // Функція парсингу ціни (як у ProductCards)
  const parsePrice = (priceString) => {
    return parseInt(priceString.toString().replace(/[^\d]/g, ''), 10) || 0;
  };

  const addToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: parsePrice(product.price),
      originalPrice: product.originalPrice ? parsePrice(product.originalPrice) : undefined,
      quantity: 1,
      image: product.images[0],
    };

    const saved = localStorage.getItem('cartItems');
    let cart = saved ? JSON.parse(saved) : [];

    const existing = cart.find(item => item.id === cartItem.id);
    if (existing) {
      cart = cart.map(item =>
        item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    alert(`${product.name} додано до кошика!`);
  };

  return (
    <div className="bg-white min-h-screen">

    <DefualtHeader/>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Галерея зображень */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {product.images.length}
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4 justify-center flex-wrap">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === i ? 'border-black' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Інформація про товар */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <h1 className="text-4xl font-light uppercase tracking-wider mb-6">
                {product.name}
              </h1>

              <div className="text-3xl font-medium">
                {parsePrice(product.price).toLocaleString()} uzs
                {product.originalPrice && parsePrice(product.originalPrice) > parsePrice(product.price) && (
                  <span className="ml-6 text-xl text-gray-500 line-through">
                    {parsePrice(product.originalPrice).toLocaleString()} uzs
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-black text-white py-4 rounded-lg uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors"
            >
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;