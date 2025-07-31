// src/components/ProductView.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://backend-2y5w.onrender.com/api/products/${id}`);
        console.log('API Response:', response.data);
        setProduct(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-16">Загрузка...</div>;
  if (error || !product) return <div className="text-center py-16 text-red-500">Продукт не найден</div>;

  const addToCart = () => {
    const cartItem = {
      id: product._id || product.id,
      name: product.name,
      variant: product.variant,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      selectedColor: product.colors[selectedColor],
      image: product.images,
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
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-12">
              <img
                src={`https://backend-2y5w.onrender.com/uploads/${product.images[selectedImage]}`}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Found';
                }}
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-4 justify-center">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-gray-50 flex items-center justify-center p-2 transition-all duration-300 ${
                      selectedImage === index ? 'ring-2 ring-black' : 'hover:ring-1 ring-gray-300'
                    }`}
                  >
                    <img
                      src={`https://backend-2y5w.onrender.com/uploads/${image}`}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            {/* Product Title & Price */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-semibold text-black mb-4 uppercase tracking-wide">
                {product.name}
              </h1>
              <p className="text-2xl text-gray-900 font-normal">
                {product.price.toLocaleString()} uzs
              </p>
            </div>

          

            {/* Frame & Lens Info */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-600 text-sm">
                Frame: Black / Lenses: Black
              </p>
            </div>

          

            {/* Features */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 mb-1">Worldwide Express</h3>
                <p className="text-xs text-gray-600">Shipping</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 mb-1">Quick & Easy Returns</h3>
                <p className="text-xs text-gray-600"></p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 mb-1">Lifetime Warranty</h3>
                <p className="text-xs text-gray-600"></p>
              </div>
            </div>

            {/* Specifications */}
            <div className="pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-4 uppercase tracking-wide">
                SPECIFICATIONS
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bold black acetate frames cut in a clean, rectangular silhouette, 
                combined with dark lenses that deliver with a fusion of style and 
                functionality. Finished with signature temple detailing.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={addToCart}
              className="border border-gray-900 text-gray-900 px-8 py-3 font-light tracking-wide uppercase text-sm hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                ДОБАВИТЬ В КОРЗИНУ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;