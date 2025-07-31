// src/components/ProductCards.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-2y5w.onrender.com/api/products');
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

  const parsePrice = (priceString) =>
    parseInt(priceString.replace('uzs', '').replace(',', ''));

  const addToCart = (product) => {
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
          {products.map((product) => (
            <div
              key={product._id || product.id}
              onClick={() => navigate(`/product/${product._id || product.id}`)}
              className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredCard(product._id || product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Изображение */}
              <div className="aspect-square bg-gray-50 relative overflow-hidden mb-4">
                <div className="w-full h-full flex items-center justify-center p-8 relative">
                  {/* Первое изображение */}
                  <img
                    src={`https://backend-2y5w.onrender.com/uploads/${product.images[0]}`}
                    alt={`${product.name} - Image 1`}
                    className={`w-full h-full object-contain absolute inset-0 p-8 transition-opacity duration-700 ease-in-out ${
                      hoveredCard === (product._id || product.id) && product.images[1] 
                        ? 'opacity-0' 
                        : 'opacity-100'
                    }`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                    }}
                  />
                  {/* Второе изображение (показывается при hover) */}
                  {product.images[1] && (
                    <img
                      src={`https://backend-2y5w.onrender.com/uploads/${product.images[1]}`}
                      alt={`${product.name} - Image 2`}
                      className={`w-full h-full object-contain absolute inset-0 p-8 transition-opacity duration-700 ease-in-out ${
                        hoveredCard === (product._id || product.id) 
                          ? 'opacity-100' 
                          : 'opacity-0'
                      }`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </div>
              
              {/* Информация о товаре */}
              <div className="text-center">
                <h3 className="font-semibold text-lg text-black mb-2 uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-base font-normal">
                  {product.price.toLocaleString()} uzs
                </p>
              </div>
            </div>
          ))}
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