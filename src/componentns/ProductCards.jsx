// src/components/ProductCards.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const products = [
    {
      _id: "1",
      name: "CHELSEA BLACK/BLUE",
      price: "549.000 uzs",
      originalPrice: "549.000 uzs",
      images: [
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603549/uploads/xp8i1txivzp8ildi4uzt.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603609/uploads/nlyorrjsoj1ydy2o6zqf.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603663/uploads/udizegkmpbtxi2fyibp7.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603724/uploads/am41thknuqhsxxnc9rq0.jpg"
      ],
      soldOut: false,
      stockLeft: 1 // ← Добавляем количество оставшихся штук только для этого товара
    },
    {
      _id: "2",
      name: "Roland Tortoise White",
      price: "499.000 uzs",
      originalPrice: "499.000 uzs",
      images: [
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603775/uploads/kt8txzbiywzekwosfryi.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603810/uploads/sk5duovigsrfhctsbhii.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603857/uploads/mfwmcn8eekjhwnozlfm3.png",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603961/uploads/jc9l7jlrlwdigtyrsdtg.jpg"
      ],
      soldOut: false,
      stockLeft: null // Нет ограничения
    },
    {
      _id: "3",
      name: "Roland Tortoise Blue Chameleon",
      price: "599.000 uzs",
      originalPrice: "599.000 uzs",
      images: [
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767603995/uploads/lsh05uikpt4fpn6yyhyp.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604016/uploads/jgbpn77axon8zj8vkmzu.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604084/uploads/tu4o27x0nkak2exmurri.jpg",
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604138/uploads/kmc2fixm7ncrtrawp8pn.jpg",
      ],
      soldOut: false,
      stockLeft: null
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
        "https://res.cloudinary.com/dnw8u1bxr/image/upload/v1767604260/uploads/ischhwur4kc1t0b0oftw.jpg",
      ],
      soldOut: false,
      stockLeft: null
    }
  ];

  const availableProducts = ["Roland Tortoise White", "Roland Tortoise Blue Chameleon"];

  const parsePrice = (priceString) => {
    return parseInt(priceString.toString().replace(/[^\d]/g, '')) || 0;
  };

  const addToCart = (product) => {
    if (product.soldOut || !availableProducts.includes(product.name)) {
      alert('Этот товар распродан!');
      return;
    }

    const cartItem = {
      id: product._id,
      name: product.name,
      price: parsePrice(product.price),
      originalPrice: product.originalPrice ? parsePrice(product.originalPrice) : undefined,
      quantity: 1,
      image: product.images[0],
    };

    const savedCart = localStorage.getItem('cartItems');
    let cartItems = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cartItems.find(item => item.id === cartItem.id);
    if (existingItem) {
      cartItems = cartItems.map(item =>
        item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cartItems.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} добавлен в корзину!`);
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice) return 0;
    const original = parsePrice(originalPrice);
    const current = parsePrice(currentPrice);
    if (original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const isSoldOut = (product) => product.soldOut || !availableProducts.includes(product.name);

  return (
    <section className="bg-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Наша коллекция
          </h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Откройте для себя премиальные очки, созданные с вниманием к каждой детали
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const soldOut = isSoldOut(product);
            const discount = calculateDiscount(product.originalPrice, product.price);
            const isLowStock = product.stockLeft === 1 && !soldOut; // Только для CHELSEA BLACK/BLUE

            return (
              <div
                key={product._id}
                onClick={() => !soldOut && navigate(`/product/${product._id}`)}
                className={`group transition-all duration-300 ${
                  soldOut ? 'cursor-not-allowed opacity-75' : 'hover:scale-[1.02] cursor-pointer'
                }`}
                onMouseEnter={() => setHoveredCard(product._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden mb-4">
                  {/* Sold Out */}
                  {soldOut && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold uppercase tracking-wide">
                        Sold Out
                      </span>
                    </div>
                  )}

                  {/* Discount */}
                  {!soldOut && discount > 0 && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-full">
                        -{discount}%
                      </span>
                    </div>
                  )}

                  {/* Low Stock Badge (только для CHELSEA BLACK/BLUE) */}
                  {isLowStock && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-orange-600 text-white px-3 py-1 text-sm font-semibold uppercase tracking-wide rounded">
                        Осталось 1 шт
                      </span>
                    </div>
                  )}

                  <div className="w-full h-full flex items-center justify-center p-8 relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-700 ${
                        hoveredCard === product._id && product.images[1] ? 'opacity-0' : 'opacity-100'
                      } ${soldOut ? 'grayscale' : ''}`}
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={product.name}
                        className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-700 ${
                          hoveredCard === product._id ? 'opacity-100' : 'opacity-0'
                        } ${soldOut ? 'grayscale' : ''}`}
                      />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className={`font-semibold text-lg mb-2 uppercase tracking-wide ${soldOut ? 'text-gray-500' : 'text-black'}`}>
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    {soldOut ? (
                      <span className="text-gray-500 text-lg font-normal">
                        {product.originalPrice ? parsePrice(product.originalPrice).toLocaleString() : parsePrice(product.price).toLocaleString()} uzs
                      </span>
                    ) : product.originalPrice && parsePrice(product.originalPrice) > parsePrice(product.price) ? (
                      <>
                        <span className="text-red-500 text-lg font-normal line-through decoration-red-500 decoration-2">
                          {parsePrice(product.originalPrice).toLocaleString()} uzs
                        </span>
                        <span className="text-green-600 text-lg font-bold">
                          {parsePrice(product.price).toLocaleString()} uzs
                        </span>
                      </>
                    ) : (
                      <span className="text-black text-lg font-normal">
                        {parsePrice(product.price).toLocaleString()} uzs
                      </span>
                    )}
                  </div>

                  {soldOut && (
                    <p className="text-red-600 text-sm font-medium mt-1">
                      Товар распродан
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="border border-gray-900 text-gray-900 px-8 py-3 font-light tracking-wide uppercase text-sm hover:bg-gray-900 hover:text-white transition-all duration-300">
            Показать еще
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
