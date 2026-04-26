// src/components/ProductView.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefualtHeader from './DefualtHeader';

const ProductView = () => {
  const { id } = useParams(); // id з URL, наприклад "1", "2", "3", "4"
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

   const products = [
    {
      _id: "1",
      name: "HAM BLUE",
      price: "699.000 uzs",
      originalPrice: "699.000 uzs",
      images: [
      "https://www.dropbox.com/scl/fi/51r5rvlq3wpljduasynk3/dcfb2dc8-7c59-47c7-a0ef-38f1cb961283.png?rlkey=woasigyi57d1x28whov6d9tc4&st=0qtz0628&raw=1",
      "https://www.dropbox.com/scl/fi/6q4xzzckcxkz7albq1lru/45320f5c-8827-493e-9210-6ab3219de2a0.png?rlkey=nd7psrgk7wnl81ozcju0webow&st=gbrg2vkn&raw=1",
      "https://www.dropbox.com/scl/fi/yt8f96mdly7hvu1cb9qo5/ChatGPT-Image-23-.-2026-.-21_18_25.png?rlkey=yd6a4zu9dk48jqh8wjlesmzo3&st=jpikameo&raw=1",
      ],
      stockLeft: 20
    },
    {
      _id: "2",
      name: "HAM  BLACK",
      price: "699.000 uzs",
      originalPrice: "699.000",
      images: [
        "https://www.dropbox.com/scl/fi/ya4e0iy6lz91qil1m8nd1/610c7bc8-2b85-409f-89cd-4f89729f7219.png?rlkey=zgultmom8mr4ai6hbqy0rowei&st=agoot949&raw=1",
        "https://www.dropbox.com/scl/fi/rjksqe39ievm7czvepo3g/66f1afeb-1066-4ef2-872f-19a12663ca06.png?rlkey=lvzzlh27ombytibxqmuigvcfx&st=flzaycbz&raw=1",
        "https://www.dropbox.com/scl/fi/evuzctqcqnyu3cxybq13b/808095f4-d849-4db3-baae-9018ee9e07e3-removebg-preview.png?rlkey=oq446iu6zw5t9bux50azgw9f4&st=ehm4q9uw&raw=1"
      ],
      stockLeft: null
    },
    {
      _id: "3",
      name: "HAM ORANGE",
      price: "699.000 uzs",
      originalPrice: "699.000 uzs",
      images: [
       "https://www.dropbox.com/scl/fi/dtm14esalecqlm58gr9lp/2927ee7a-6cc4-4a11-8d70-6499e928592f-removebg-preview.png?rlkey=xnzioog0eu5q4i4bgd5b06412&st=1saqmuyf&raw=1",
       "https://www.dropbox.com/scl/fi/r3t1eh0k5939xgdqr101b/716ff3ef-3506-41d3-a5c1-0c537ffcd030-removebg-preview.png?rlkey=ogxovpmq7j4cfwo96c0ymn5ir&st=9ndq3gah&raw=1",
       "https://www.dropbox.com/scl/fi/fatf934erz2fzukcnpbcc/fbbd15a1-2d0a-401b-923e-adadc349ae88-removebg-preview-1.png?rlkey=loowwgjuisfthlrg94eejmk99&st=0rcluj3f&raw=1"
      ],
      stockLeft: null
    },
    {
      _id: "4",
      name: "HAM WHITE",
      price: "699.000 uzs",
      originalPrice: "699.000 uzs",
      images: [
        "https://www.dropbox.com/scl/fi/q00o8pblnj2ryjg4ddego/8e62e6cb-6721-43e2-aafb-cc73ad353b65-removebg-preview.png?rlkey=0zoiepap5wp0pvwjbxkc2lp77&st=yjeuehd8&raw=1",
        "https://www.dropbox.com/scl/fi/hpa5bk797rhvlzs3yibvm/9d9a1fb6-f447-4a7e-8dd3-d500cf4e8a23-removebg-preview.png?rlkey=sjbjh6y3k8m7scev5p7e27tcz&st=7npck08l&raw=1",
        "https://www.dropbox.com/scl/fi/57qjj5djjqw432r7uw6nq/e6f15d25-8ad5-4bba-bd89-2e5160eb804e-removebg-preview.png?rlkey=ru9edhe3vx3sy0tzvir3847nw&st=fcbfgksi&raw=1"
      ],
      stockLeft: null
    },
    {
      _id: "5",
      name: "HAM CHAMELEON/BLACK",
      price: "699.000 uzs",
      originalPrice: "699.000 uzs",
      images: [
       "https://www.dropbox.com/scl/fi/uj3w8qyxbnxyfs96a7aw0/5429570636700390183-removebg-preview.png?rlkey=j1yebgu0xvvpdqr52lsf80m4d&raw=1",
        "https://www.dropbox.com/scl/fi/lkjmreywvw8fxexx8jpg9/48fe3346-9d06-4eaa-9135-bc01b8ef94e0-removebg-preview.png?rlkey=wiri9cjqnl6yptlnc71vimjao&raw=1",
       "https://www.dropbox.com/scl/fi/62juktfhd4w1nu2yl2qr7/c6ee2c2b-6798-4f28-bab2-b95754dbd14f-removebg-preview.png?rlkey=v64kolfl851i3vo7a2109yrzk&st=fw6ul7te&raw=1",
       "https://www.dropbox.com/scl/fi/w5efdbu3xtctueukpr34d/34f3ecf3-7bf9-49c0-9215-6c646b7f225d-removebg-preview.png?rlkey=9ygirsin3a39wo27mxn4u6nhk&st=fa0ausog&raw=1"
      ],
      stockLeft: null
    }
  ];
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
    alert(`${product.name} добавить в карзину`);
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
             добавить в карзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
