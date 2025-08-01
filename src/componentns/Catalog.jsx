// src/components/Catalog.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DefualtHeader from './DefualtHeader';

const Catalog = () => {
  const [sortBy, setSortBy] = useState('name');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://backend-production-79eb.up.railway.app/api/products');
        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cartItem = {
      id: product._id || product.id,
      name: product.name,
      variant: product.variant,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      selectedColor: product.colors[0],
      image: product.images[0] || 'default-image.jpg',
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

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (loading) return <div className="text-center py-16">Загрузка...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Ошибка: {error}</div>;

  return (
    <div className="bg-white min-h-screen">
      <DefualtHeader />
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="text-gray-600 font-light">
                Найдено {sortedProducts.length} товар
                {sortedProducts.length !== 1
                  ? sortedProducts.length < 5
                    ? 'а'
                    : 'ов'
                  : ''}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded px-4 py-2 text-gray-700 font-light focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="name">По названию</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product._id || product.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => navigate(`/product/${product._id || product.id}`)}
                  onMouseEnter={() => setHoveredProduct(product._id || product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Изображение */}
                  <div className="aspect-square bg-gray-50 relative overflow-hidden mb-4">
                    <div className="w-full h-full flex items-center justify-center p-8 relative">
                      {/* Первое изображение */}
                      <img
                        src={`https://backend-production-79eb.up.railway.app/uploads/${product.images[0]}`}
                        alt={`${product.name} - Image 1`}
                        className={`w-full h-full object-contain absolute inset-0 p-8 transition-opacity duration-700 ease-in-out ${
                          hoveredProduct === (product._id || product.id) && product.images[1] 
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
                          src={`https://backend-production-79eb.up.railway.app/uploads/${product.images[1]}`}
                          alt={`${product.name} - Image 2`}
                          className={`w-full h-full object-contain absolute inset-0 p-8 transition-opacity duration-700 ease-in-out ${
                            hoveredProduct === (product._id || product.id) 
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
                  <div>
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
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-2">Товары не найдены</h3>
                <p className="text-gray-600 font-light mb-6">Попробуйте изменить параметры сортировки</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;