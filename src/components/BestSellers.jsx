import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';

export const BestSellers = () => {
  const bestSellers = products.slice(0, 4);

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-900 opacity-5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-900 opacity-5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-[2px]">
            Отобранная коллекция
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold mt-4 mb-4">
            Бестселлеры
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Откройте для себя наши самые любимые коллекции, отобранные за их исключительное качество и timeless дизайн.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bestSellers.map((product, idx) => (
            <ProductCard key={product._id} product={product} index={idx} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="/shop"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-4 border border-gray-700 text-white font-semibold uppercase tracking-wider rounded-lg hover:border-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Посмотреть все коллекции
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
