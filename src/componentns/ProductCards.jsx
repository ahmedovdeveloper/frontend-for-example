// src/components/ProductCards.jsx — РОБОТАЄ З public/product/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const products = [
    {
      _id: "1",
      name: "CHELSEA BLACK/BLUE",
      price: "385.000 uzs",
      originalPrice: "600.000 uzs",
      images: [
        "/product/img2.jpeg",
        "/product/2.jpeg",
        "/product/3.jpeg",
        "/product/5.jpeg"
      ],
      soldOut: false
    },
    {
      _id: "2",
      name: "Roland Tortoise White",
      price: "350.000 uzs",
      originalPrice: "550.000 uzs",
      images: [
        "/product/tr1.jpeg",
        "/product/tr2.jpeg",
        "/product/tr3.png",
        "/product/tr5.jpeg"
      ],
      soldOut: false
    },
    {
      _id: "3",
      name: "Roland Tortoise Blue Chameleon",
      price: "420.000 uzs",
      originalPrice: "599.000 uzs",
      images: [
        "/product/rht2.jpeg",
        "/product/rbh1.jpeg",
        "/product/rhm3.jpeg",
        "/product/rhm4.jpeg",
        "/product/rhm6.jpeg"
      ],
      soldOut: false
    },
    {
      _id: "4",
      name: "Chelsea Black Chameleon",
      price: "445.000 uzs",
      originalPrice: "700.000 uzs",
      images: [
        "/product/cbh2.jpeg",
        "/product/chb1.jpeg",
        "/product/cbh3.jpeg",
        "/product/cbh4.jpeg",
        "/product/cbh5.jpeg"
      ],
      soldOut: false
    }
  ];

  const availableProducts = ["CHELSEA BLACK/BLUE", "Roland Tortoise White", "Chelsea Black Chameleon", "Roland Tortoise Blue Chameleon"];

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