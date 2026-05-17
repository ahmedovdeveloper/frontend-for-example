import { motion } from 'framer-motion';

export const BrandStory = () => {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden image-zoom glass">
              <img
                src="https://www.dropbox.com/scl/fi/6hob2jru9z8qfv4cykmyo/DSC01240.JPG?rlkey=9n8peq8bgu8nxjm406lhaes4z&raw=1"
                alt="Brand Story"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Float Element */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-0 right-0 sm:-bottom-8 sm:-right-8 w-40 h-40 glass rounded-full p-4 flex flex-col items-center justify-center text-center"
            >
              <p className="text-3xl font-luxury font-bold text-white mb-2">Est. 2026</p>
              <p className="text-xs text-gray-400">Premium Crafted</p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-[2px]">
              Наша история
            </span>

            <h2 className="text-5xl font-luxury font-bold mt-4 mb-6">
              Создано для элегантности
            </h2>

            <p className="text-gray-400 mb-4 leading-relaxed text-lg">
              HAM родился из страсти к премиум очкам и приверженности timeless дизайну. Мы верим, что отличные солнцезащитные очки делают больше, чем защищают ваши глаза — они выражают ваш стиль.
            </p>

            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              Каждая пара тщательно изготовлена с использованием премиум материалов и передовых производственных технологий. Мы сочетаем роскошь с функциональностью, чтобы создать очки, которые выдержат испытание временем.
            </p>

            <div className="space-y-4 mb-8">
              {['Премиум материалы', 'Ручная работа', 'Пожизненная гарантия'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <span className="text-white font-semibold">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Узнать наше мастерство
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
