import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link to={`/product/${product._id}`}>
        <div className="bg-neutral-900 rounded-lg overflow-hidden class hover-lift transition-all duration-500 cursor-pointer h-full">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-black aspect-square">
            {/* Main Image */}
            <motion.img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Stock Status */}
            {product.stockLeft ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold"
              >
                {product.stockLeft} Limited
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
              >
                НЕТ В НАЛИЧИИ
              </motion.div>
            )}

            {/* Wishlist Button */}
            <motion.button
              onClick={handleWishlist}
              initial={{ opacity: 0, scale: 0 }}
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={inWishlist ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>

            {/* Image Gallery Dots */}
            {product.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
              >
                {product.images.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-white w-6' : 'bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </motion.div>
            )}

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 flex items-center justify-center glass backdrop-blur-sm text-white font-semibold uppercase tracking-wider transition-all ${
                product.stockLeft
                  ? 'hover:bg-opacity-80 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!product.stockLeft}
            >
              {product.stockLeft ? 'Добавить в корзину' : 'Недоступно'}
            </motion.button>
          </div>

          {/* Product Info */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-luxury uppercase tracking-wide text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              {product.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-white">
                    {product.rating}
                  </span>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-white">
                  {product.price}
                </p>
                {product.originalPrice && product.originalPrice !== product.price && (
                  <p className="text-xs text-gray-500 line-through">
                    {product.originalPrice}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
