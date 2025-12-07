// src/components/Catalog.jsx — ПРАВИЛЬНО ПРАЦЮЄ З src/assets/product/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefualtHeader from './DefualtHeader';

// Імпортуємо ВСІ картинки з папки product
import img1 from '../assets/product/img2.jpeg';
import img2 from '../assets/product/2.jpeg';
import img3 from '../assets/product/3.jpeg';
import img4 from '../assets/product/5.jpeg';

import tr1 from '../assets/product/tr1.jpeg';
import tr2 from '../assets/product/tr2.jpeg';
import tr3 from '../assets/product/tr3.jpeg';
import tr4 from '../assets/product/tr5.jpeg';

import rbh1 from '../assets/product/rbh1.jpeg';
import rbh2 from '../assets/product/rht2.jpeg';
import rbh3 from '../assets/product/rhm3.jpeg';
import rbh4 from '../assets/product/rhm4.jpeg';

import chb1 from '../assets/product/chb1.jpeg';
import chb2 from '../assets/product/cbh2.jpeg';
import chb3 from '../assets/product/cbh3.jpeg';
import chb4 from '../assets/product/cbh4.jpeg';

const Catalog = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('name');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // ТОВАРИ З ПРАВИЛЬНИМИ ІМПОРТАМИ
  const products = [
    {
      _id: "1",
      name: "CHELSEA BLACK/BLUE",
      price: 549000,
      originalPrice: 600000,
      images: [img1, img2, img3, img4],
      rating: 4.8
    },
    {
      _id: "2",
      name: "Roland Tortoise White",
      price: 499000,
      originalPrice: 550000,
      images: [tr1, tr2, tr3, tr4],
      rating: 4.9
    },
    {
      _id: "3",
      name: "Roland Tortoise Blue Chameleon",
      price: 599000,
      images: [rbh1, rbh2, rbh3, rbh4],
      rating: 5.0
    },
    {
      _id: "4",
      name: "Chelsea Black Chameleon",
      price: 649000,
      originalPrice: 700000,
      images: [chb1, chb2, chb3, chb4],
      rating: 4.7
    }
  ];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="bg-white min-h-screen">
      <DefualtHeader />
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Наша коллекция</h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Откройте для себя премиальные очки, созданные с вниманием к каждой детали
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-300 rounded px-6 py-3 text-gray-700"
          >
            <option value="name">По названию</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="aspect-square bg-gray-50 relative overflow-hidden mb-4 rounded-xl">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                      hoveredProduct === product._id && product.images[1] ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                        hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}
                </div>
              </div>

              <h3 className="text-lg font-medium text-center mb-2">{product.name}</h3>
              <p className="text-center text-xl">
                {product.price.toLocaleString()} uzs
                {product.originalPrice && (
                  <span className="ml-3 text-gray-500 line-through text-lg">
                    {product.originalPrice.toLocaleString()} uzs
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;