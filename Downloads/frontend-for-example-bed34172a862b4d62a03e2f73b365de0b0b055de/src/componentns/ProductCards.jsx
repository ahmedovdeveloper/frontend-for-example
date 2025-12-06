// src/components/ProductCards.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [products, setProducts] = useState([]);

  // Список товаров, которые В НАЛИЧИИ (все остальные будут sold out)
  const availableProducts = ["CHELSEA BLACK/BLUE", "Roland Tortoise White", "Roland Tortoise Blue Chameleon", "Chelsea Black Chameleon"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-mihlievs.onrender.com/api/products');
        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        console.log('Products fetched:', products);
      }
    };

    fetchProducts();
  }, []);

  const parsePrice = (priceString) => {
    if (typeof priceString === 'number') return priceString;
    return parseInt(priceString.toString().replace('uzs', '').replace(',', ''));
  };

  const addToCart = (product) => {
    // Проверяем, не распродан ли товар
    if (!availableProducts.includes(product.name)) {
      alert('Этот товар распродан!');
      return;
    }

    const cartItem = {
      id: product._id || product.id,
      name: product.name,
      variant: product.variant,
      price: parsePrice(product.price),
      originalPrice: product.originalPrice
        ? parsePrice(product.originalPrice)
        : undefined,
      quantity: 1,
      selectedColor: product.colors[0], // Default to first color
      image: product.images[0],
    };

    const savedCart = localStorage.getItem('cartItems');
    let cartItems = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cartItems.find(
      (item) => item.id === cartItem.id && item.selectedColor === cartItem.selectedColor
    );
    if (existingItem) {
      cartItems = cartItems.map((item) =>
        item.id === cartItem.id && item.selectedColor === cartItem.selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cartItems.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} добавлен в корзину!`);
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const isSoldOut = (productName) => !availableProducts.includes(productName);

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
            const isProductSoldOut = isSoldOut(product.name);
            const discount = calculateDiscount(product.originalPrice, product.price);
            
            return (
              <div
                key={product._id || product.id}
                onClick={() => {
                  if (!isProductSoldOut) {
                    navigate(`/product/${product._id || product.id}`);
                  }
                }}
                className={`group cursor-pointer transition-all duration-300 ${
                  isProductSoldOut ? 'cursor-not-allowed opacity-75' : 'hover:scale-[1.02]'
                }`}
                onMouseEnter={() => setHoveredCard(product._id || product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Изображение */}
                <div className="aspect-square bg-gray-50 relative overflow-hidden mb-4">
                  {/* SOLD OUT Badge */}
                  {isProductSoldOut && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold uppercase tracking-wide">
                        Sold Out
                      </span>
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {!isProductSoldOut && discount > 0 && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-full">
                        -{discount}%
                      </span>
                    </div>
                  )}

                  <div className="w-full h-full flex items-center justify-center p-8 relative">
                    {/* Первое изображение */}
                    <img
                      src={`https://backend-mihlievs.onrender.com/uploads/${product.images[0]}`}
                      alt={`${product.name} - Image 1`}
                      className={`w-full h-full object-contain absolute inset-0 p-8 transition-opacity duration-700 ease-in-out ${
                        hoveredCard === (product._id || product.id) && product.images[1] 
                          ? 'opacity-0' 
                          : 'opacity-100'
                      } ${isProductSoldOut ? 'grayscale' : ''}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                      }}
                    />
                    {/* Второе изображение (показывается при hover) */}
                    {product.images[1] && (
                      <img
                        src={`https://backend-mihlievs.onrender.com/${product.images[1]}`}
                        alt={`${product.name} - Image 2`}
                        className={`w-full h-full object-contain absolute inset-0 p-8 transition-opacity duration-700 ease-in-out ${
                          hoveredCard === (product._id || product.id) 
                            ? 'opacity-100' 
                            : 'opacity-0'
                        } ${isProductSoldOut ? 'grayscale' : ''}`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>
                
                {/* Информация о товаре */}
                <div className="text-center">
                  <h3 className={`font-semibold text-lg mb-2 uppercase tracking-wide ${
                    isProductSoldOut ? 'text-gray-500' : 'text-black'
                  }`}>
                    {product.name}
                  </h3>
                  
                  {/* Цены */}
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    {isProductSoldOut ? (
                      /* Для распроданных товаров показываем originalPrice или обычную price */
                      <span className="text-gray-500 text-lg font-normal">
                        {product.originalPrice 
                          ? parsePrice(product.originalPrice).toLocaleString() 
                          : parsePrice(product.price).toLocaleString()
                        } uzs
                      </span>
                    ) : product.originalPrice && product.originalPrice > product.price ? (
                      <>
                        {/* Зачеркнутая оригинальная цена красным */}
                        <span className="text-red-500 text-lg font-normal line-through decoration-red-500 decoration-2">
                          {parsePrice(product.originalPrice).toLocaleString()} uzs
                        </span>
                        {/* Цена со скидкой */}
                        <span className="text-green-600 text-lg font-bold">
                          {parsePrice(product.price).toLocaleString()} uzs
                        </span>
                      </>
                    ) : (
                      /* Обычная цена */
                      <span className="text-black text-lg font-normal">
                        {parsePrice(product.price).toLocaleString()} uzs
                      </span>
                    )}
                  </div>
                  
                  {isProductSoldOut && (
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
