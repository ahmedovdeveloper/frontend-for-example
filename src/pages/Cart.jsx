import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="bg-black pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-luxury font-bold mb-12 text-white"
        >
          Корзина покупок
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-3xl font-luxury font-bold text-white mb-4">Твоя корзина пуста</h2>
            <p className="text-gray-400 mb-8">Исследуй наши коллекции и найди свои идеальные очки</p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              Продолжить покупки
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-neutral-900 rounded-lg p-6 glass flex gap-6"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{item.category}</p>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-neutral-800 rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-white hover:bg-neutral-700 rounded transition-colors"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-white text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-white hover:bg-neutral-700 rounded transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          {parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity}.000 сум
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.price} за шт.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-lg p-8 lg:sticky lg:top-36 h-fit"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Сводка заказа</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-800">
                <div className="flex justify-between text-gray-400">
                  <span>Сумма</span>
                  <span>{cartTotal.toLocaleString()}.000 сум</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Доставка</span>
                  <span className="text-green-500">Бесплатно</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-white">Итого</span>
                <span className="text-2xl font-bold text-white">
                  {cartTotal.toLocaleString()}.000 сум
                </span>
              </div>

              <motion.a
                href="/checkout"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all mb-3"
              >
                Перейти к оформлению
              </motion.a>

              <Link
                to="/shop"
                className="block w-full text-center py-3 glass text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
              >
                Продолжить покупки
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-800 space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 9V7a1 1 0 011-1h8a1 1 0 011 1v2M5 9a2 2 0 002 2h6a2 2 0 002-2m-6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  Защищенный платеж
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  Бесплатная доставка от 2 млн сум
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
