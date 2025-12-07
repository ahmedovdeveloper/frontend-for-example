// src/components/ProductView.jsx — РАБОТАЕТ БЕЗ FETCH!
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefualtHeader from './DefualtHeader';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  // Локальные товары (вместо fetch)
  const products = {
    "1": {
      _id: "1",
      name: "CHELSEA BLACK/BLUE",
      price: 549000,
      originalPrice: 600000,
      images: [
        "/src/assets/product/img2.jpeg",
        "/src/assets/product/2.jpeg",
        "/src/assets/product/3.jpeg",
        "/src/assets/product/5.jpeg"
      ],
      colors: ["Black/Blue", "Tortoise"]
    },
    "2": {
      _id: "2",
      name: "Roland Tortoise White",
      price: 499000,
      originalPrice: 550000,
      images: [
        "/src/assets/product/tr1.jpeg",
        "/src/assets/product/tr2.jpeg",
        "/src/assets/product/tr3.jpeg",
        "/src/assets/product/tr5.jpeg"
      ],
      colors: ["Tortoise White"]
    },
    "3": {
      _id: "3",
      name: "Roland Tortoise Blue Chameleon",
      price: 599000,
      originalPrice: null,
      images: [
        "/src/assets/product/rbh1.jpeg",
        "/src/assets/product/rht2.jpeg",
        "/src/assets/product/rhm3.jpeg",
        "/src/assets/product/rhm4.jpeg"
      ],
      colors: ["Blue Chameleon"]
    },
    "4": {
      _id: "4",
      name: "Chelsea Black Chameleon",
      price: 649000,
      originalPrice: 700000,
      images: [
        "/src/assets/product/chb1.jpeg",
        "/src/assets/product/cbh2.jpeg",
        "/src/assets/product/cbh3.jpeg",
        "/src/assets/product/cbh4.jpeg"
      ],
      colors: ["Black Chameleon"]
    }
  };

  const product = products[id];

  // Если товар не найден
  if (!product) {
    return (
      <div className="text-center py-32">
        <h1 className="text-4xl font-bold text-red-600">Товар не найден</h1>
        <button onClick={() => navigate(-1)} className="mt-6 text-blue-600 underline">
          ← Вернуться назад
        </button>
      </div>
    );
  }

  // Swipe и drag
  const imageContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const goToNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const goToPrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleMouseDown = (e) => {
    if (product.images.length > 1) {
      setIsDragging(true);
      setStartX(e.clientX);
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setDragDistance(deltaX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (Math.abs(dragDistance) > 50) {
        dragDistance > 0 ? goToPrevImage() : goToNextImage();
      }
      setIsDragging(false);
      setDragDistance(0);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragDistance, startX]);

  // Touch support
  const handleTouchStart = (e) => {
    if (product.images.length > 1) {
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (product.images.length > 1) {
      const deltaX = e.touches[0].clientX - startX;
      setDragDistance(deltaX);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragDistance) > 50) {
      dragDistance > 0 ? goToPrevImage() : goToNextImage();
    }
    setDragDistance(0);
  };

  // Keyboard arrows
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "ArrowLeft") goToPrevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const addToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      selectedColor: product.colors[selectedColor],
      image: product.images[0],
    };

    const saved = localStorage.getItem("cartItems");
    let cart = saved ? JSON.parse(saved) : [];

    const existing = cart.find(item => item.id === cartItem.id);
    if (existing) {
      cart = cart.map(item => item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    alert(`${product.name} добавлен в корзину!`);
  };

  return (
    <div className="bg-white min-h-screen">
      <DefualtHeader />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Галерея */}
          <div className="space-y-6">
            <div
              ref={imageContainerRef}
              className="aspect-square bg-gray-50 flex items-center justify-center p-12 relative cursor-grab active:cursor-grabbing select-none overflow-hidden"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: isDragging ? `translateX(${dragDistance * 0.3}px)` : 'none',
                transition: isDragging ? 'none' : 'transform 0.4s ease'
              }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain pointer-events-none"
              />
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Миниатюры */}
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
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light uppercase tracking-wider mb-4">
                {product.name}
              </h1>
              <div className="text-3xl font-normal">
                {product.price.toLocaleString()} uzs
                {product.originalPrice && (
                  <span className="ml-4 text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()} uzs
                  </span>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600">Frame: Black / Lenses: Black</p>
            </div>

            <div className="text-center py-8">
              <h3 className="font-medium">2 week Warranty</h3>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-4">
                Specifications
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bold black acetate frames cut in a clean, rectangular silhouette...
              </p>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-black text-white py-4 text-sm font-light tracking-widest uppercase hover:bg-gray-900 transition"
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