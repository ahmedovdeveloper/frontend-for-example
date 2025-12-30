// src/components/ProductView.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefualtHeader from './DefualtHeader';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const products = {
    "1": {
      _id: "1",
      name: "CHELSEA BLACK/BLUE",
      price: 385000,
      originalPrice: 600000,
      images: [
        "/product/img2.jpeg",
        "/product/2.jpeg",
        "/product/3.jpeg",
        "/product/5.jpeg"
      ],
      colors: ["Black/Blue"]
    },
    "2": {
      _id: "2",
      name: "Roland Tortoise White",
      price: 350000,
      originalPrice: 550000,
      images: [
        "/product/tr1.jpeg",
        "/product/tr2.jpeg",
        "/product/tr3.png",
        "/product/tr5.jpeg"
      ],
      colors: ["Tortoise White"]
    },
    "3": {
      _id: "3",
      name: "Roland Tortoise Blue Chameleon",
      price: 420000,
      images: [
        "/product/rbh1.jpeg",
        "/product/rht2.jpeg",
        "/product/rhm3.jpeg",
        "/product/rhm4.jpeg"
      ],
      colors: ["Blue Chameleon"]
    },
    "4": {
      _id: "4",
      name: "Chelsea Black Chameleon",
      price: 455000,
      originalPrice: 700000,
      images: [
        "/product/chb1.jpeg",
        "/product/cbh2.jpeg",
        "/product/cbh3.jpeg",
        "/product/cbh4.jpeg"
      ],
      colors: ["Black Chameleon"]
    }
  };

  const product = products[id];

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

  const addToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
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
      <DefualtHeader />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Галерея */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
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
              <div className="flex gap-4 justify-center">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                      selectedImage === i ? 'border-black' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Інформація */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light uppercase tracking-wider mb-4">
                {product.name}
              </h1>
              <div className="text-3xl">
                {product.price.toLocaleString()} uzs
                {product.originalPrice && (
                  <span className="ml-4 text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()} uzs
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-black text-white py-4 rounded-lg uppercase tracking-wider hover:bg-gray-800"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;