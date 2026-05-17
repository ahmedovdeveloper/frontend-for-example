import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const models = [
  {
    id: 1,
    image: "https://www.dropbox.com/scl/fi/n142e8gapscrp8y7w1oip/IMG_0933-3.JPG?rlkey=gezbxka78a6frnc68a8x1ekpo&raw=1"
  },
  {
    id: 2,
    image: "https://www.dropbox.com/scl/fi/2or4dmmlg0s5nr4k0nc3m/IMG_0397.JPG?rlkey=y7sv2fd9nt1vdqryduvyiggj6&raw=1"
  },
  {
    id: 3,
    image: "https://www.dropbox.com/scl/fi/a95t28ge393g6sshvo78y/IMG_0399.JPG?rlkey=3u8xv055y7fc09ie8datw0nl1&raw=1"
  },
  {
    id: 4,
    image: "https://www.dropbox.com/scl/fi/m6hpscxvs95mth4sihau2/DSC05666.JPG?rlkey=athf72n9crnhd06ekqithnp0v&st=5zhmz7n8&raw=1"
  },
  {
    id: 5,
    image: "https://www.dropbox.com/scl/fi/7bvmn440xszzninpxjfav/IMG_6171.JPG?rlkey=opd5mjn8skbcs7w9mcjqxre0c&st=s4lsg6g7&raw=1",
  },
  {
    id: 6,
    image: "https://www.dropbox.com/scl/fi/brkb3vgtit7u5hersudjo/IMG_8096.JPG?rlkey=tiv8sim872vmt0fik14vzd3rd&st=fy7c2e1h&raw=1"
  },
];

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden bg-black">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900 opacity-10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-900 opacity-10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full"
        >
          {/* Left: Text Content */}
          <motion.div variants={textVariants} className="z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-[2px] block mb-4">
                Премиум коллекция очков
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-7xl font-luxury font-bold mb-6 leading-tight tracking-tighter"
            >
              HAM
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-400">
                Очки
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-8 max-w-md leading-relaxed"
            >
              Наслаждайтесь роскошными очками, созданными из премиум материалов и передового дизайна. Каждая пара рассказывает историю элегантности и изысканности.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-all duration-300 hover-lift"
              >
                Купить сейчас
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 glass text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-opacity-20 transition-all duration-300"
              >
                Узнать больше
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mt-12 flex gap-8">
              <div>
                <p className="text-2xl md:text-3xl font-luxury font-bold text-white mb-1">500+</p>
                <p className="text-sm text-gray-500">Довольных клиентов</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-luxury font-bold text-white mb-1">4.9★</p>
                <p className="text-sm text-gray-500">Средний рейтинг</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-luxury font-bold text-white mb-1">4</p>
                <p className="text-sm text-gray-500">Коллекции</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Models Grid — разные размеры */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '200px 180px 160px',
              gap: '8px',
              height: '560px',
            }}
          >
            {/* 01 — высокий левый, 2 строки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              style={{ gridColumn: '1', gridRow: '1 / 3' }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={models[0].image}
                alt="Model 1"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* 02 — средний верхний */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ gridColumn: '2', gridRow: '1' }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={models[1].image}
                alt="Model 2"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* 03 — высокий правый, 2 строки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ gridColumn: '3', gridRow: '1 / 3' }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={models[2].image}
                alt="Model 3"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* 04 — средний нижний */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ gridColumn: '2', gridRow: '2' }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={models[3].image}
                alt="Model 4"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* 05 — широкий нижний, 2 колонки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ gridColumn: '1 / 3', gridRow: '3' }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={models[4].image}
                alt="Model 5"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* 06 — маленький правый нижний */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ gridColumn: '3', gridRow: '3' }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={models[5].image}
                alt="Model 6"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};