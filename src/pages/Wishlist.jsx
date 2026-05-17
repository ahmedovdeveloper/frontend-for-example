import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist = () => {
  const { wishlist } = useCart();

  return (
    <div className="bg-black pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold mb-12 text-white"
        >
          Мое избранное
        </motion.h1>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-3xl font-luxury font-bold text-white mb-4">Твоё избранное пусто</h2>
            <p className="text-gray-400 mb-8">Добавь свои любимые очки в избранное</p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              Посмотреть коллекции
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product, idx) => (
              <ProductCard key={product._id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
