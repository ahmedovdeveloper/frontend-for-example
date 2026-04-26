// src/components/ProductCards.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FALLBACK_IMAGE = 'https://placehold.co/400x400/f3f4f6/9ca3af?text=No+Image';

const ProductCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const parsePrice = (priceString) => {
    return parseInt(priceString.toString().replace(/[^\d]/g, '')) || 0;
  };

  const addToCart = (product) => {
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

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <section className="bg-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Наша коллекция
          </h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Откройте для себя премиальные очки
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const discount = calculateDiscount(product.originalPrice, product.price);
            const isLowStock = product.stockLeft === 1;

            return (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="group hover:scale-[1.02] cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredCard(product._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden mb-4">

                  {discount > 0 && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-full">
                        -{discount}%
                      </span>
                    </div>
                  )}

                  {isLowStock && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-orange-600 text-white px-3 py-1 text-sm font-semibold">
                        Остался 1
                      </span>
                    </div>
                  )}

                  <div className="w-full h-full flex items-center justify-center p-8 relative">
                    {/* Primary image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onError={handleImageError}
                      className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${
                        hoveredCard === product._id && product.images[1] ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    {/* Hover image */}
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={product.name}
                        onError={handleImageError}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${
                          hoveredCard === product._id ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2 uppercase tracking-wide text-black">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center gap-3">
                    {product.originalPrice && parsePrice(product.originalPrice) > parsePrice(product.price) ? (
                      <>
                        <span className="text-red-500 line-through">
                          {parsePrice(product.originalPrice).toLocaleString()} uzs
                        </span>
                        <span className="text-green-600 font-bold">
                          {parsePrice(product.price).toLocaleString()} uzs
                        </span>
                      </>
                    ) : (
                      <span>
                        {parsePrice(product.price).toLocaleString()} uzs
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductCards;
