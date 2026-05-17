import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p._id === id);
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const inWishlist = isInWishlist(id);

  if (!product) {
    return (
      <div className="bg-black min-h-screen pt-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-luxury font-bold text-white mb-4">
            Продукт не найден
          </h1>
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
          >
            Вернуться в магазин
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = () => {
    addToWishlist(product);
  };

  const relatedProducts = products.filter(p => p._id !== id).slice(0, 4);

  return (
    <div className="bg-black pt-32 pb-20 min-h-screen">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <button
          onClick={() => navigate('/shop')}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← Вернуться в магазин
        </button>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image Gallery */}
            <div className="relative">
              <Swiper
                modules={[Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl"
              >
                {product.images.map((image, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Gallery */}
            <Swiper
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={12}
              className="rounded-xl"
              breakpoints={{
                0: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {product.images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-gray-700 hover:border-white transition-all duration-300"
                  >
                    <img
                      src={image}
                      alt={`Миниатюра ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background Effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-3xl rounded-3xl" />
            <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm rounded-2xl" />

            {/* Sticky Container */}
            <div className="sticky top-36 p-8 rounded-2xl border border-white/10">
              {/* Product Info */}
              <div className="mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl font-luxury font-bold text-white mb-3 leading-tight"
                >
                  {product.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 mb-6 text-lg uppercase tracking-wider"
                >
                  {product.category}
                </motion.p>

                {/* Enhanced Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating || 4.8)
                            ? 'text-yellow-400'
                            : 'text-gray-700'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <span className="text-white font-semibold">
                    {product.rating} • (48 отзывов)
                  </span>
                </motion.div>

                {/* Price with Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <p className="text-5xl font-bold text-white mb-2">
                    {product.price}
                  </p>
                  {product.originalPrice && product.originalPrice !== product.price && (
                    <p className="text-xl text-gray-500 line-through">
                      {product.originalPrice}
                    </p>
                  )}
                </motion.div>

                {/* Stock Status with Animation */}
                {product.stockLeft ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-2 mb-8"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-green-400 font-semibold">
                      ✓ {product.stockLeft} в наличии
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-red-500 font-semibold mb-8"
                  >
                    Нет в наличии
                  </motion.p>
                )}

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-gray-300 mb-8 leading-relaxed text-lg"
                >
                  {product.description}
                </motion.p>

                {/* Enhanced Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-4 mb-8"
                >
                  {['Поляризованные линзы премиум-класса', 'Защита от UV (100%)', 'Легкая титановая рамка', 'Водонепроницаемые и устойчивые к царапинам'].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      className="flex items-center gap-4 text-gray-300 bg-white/5 p-3 rounded-lg backdrop-blur-sm"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                      <span className="font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="space-y-6"
              >
                {/* Quantity Selector */}
                <div className="flex items-center gap-6">
                  <p className="text-white font-semibold text-lg">Количество:</p>
                  <div className="flex items-center gap-4 bg-neutral-800/50 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </motion.button>
                    <motion.span
                      key={quantity}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-12 text-center text-white font-bold text-xl"
                    >
                      {quantity}
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-all"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!product.stockLeft}
                  className={`w-full py-5 rounded-xl font-bold uppercase tracking-wider transition-all text-lg ${
                    product.stockLeft
                      ? 'bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-200 hover:to-white shadow-lg hover:shadow-white/25'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.stockLeft ? 'Добавить в корзину' : 'Нет в наличии'}
                </motion.button>

                {/* Wishlist Button */}
                <motion.button
                  onClick={handleWishlist}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 rounded-xl font-bold uppercase tracking-wider transition-all text-lg border-2 ${
                    inWishlist
                      ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                      : 'glass text-white border-white/20 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  {inWishlist ? '❤️ В избранном' : '🤍 Добавить в избранное'}
                </motion.button>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-10 pt-8 border-t border-white/20 space-y-5"
              >
                {[
                  {
                    icon: '🚚',
                    title: 'Бесплатная доставка',
                    desc: 'При заказе от 2M сум'
                  },
                  {
                    icon: '🔒',
                    title: 'Безопасная оплата',
                    desc: 'SSL шифрование платежей'
                  },
                 
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + idx * 0.1 }}
                    className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-[3px] block mb-4">
                Откройте для себя
              </span>
              <h2 className="text-6xl font-luxury font-bold text-white mb-4">
                Вам также может понравиться
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <ProductCard product={p} index={idx} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
