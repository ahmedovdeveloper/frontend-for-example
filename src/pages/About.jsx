import { motion } from 'framer-motion';

export const About = () => {
  return (
    <div className="bg-black pt-32 pb-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-luxury font-bold mb-6">
              О бренде HAM
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Мы не просто бренд очков. Мы опекуны люксовости, мастерства и вечной элегантности.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative overflow-hidden border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-luxury font-bold mb-6">Наша миссия</h2>
              <p className="text-gray-400 mb-4 leading-relaxed text-lg">
                Создавать премиальные очки, которые выходят за рамки трендов и служат символом утонченного вкуса. Каждая пара очков HAM разработана, чтобы возвысить твой образ.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                Мы верим в качество вместо количества, мастерство вместо удобства и вечное вместо преходящего.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden h-96 image-zoom glass"
            >
              <img
                src="https://www.dropbox.com/scl/fi/jc0ttpc0g9khbw7aof9i3/DSC01289.JPG?rlkey=jnr67hk9e40k5bprqxzzqty9t&raw=1"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-luxury font-bold text-center mb-16"
          >
            Наши ценности
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Превосходство',
                description: 'Мы обязуемся придерживаться высочайших стандартов качества во всех аспектах нашего ремесла.',
                icon: '◆',
              },
              {
                title: 'Инновация',
                description: 'Мы сочетаем принципы вечного дизайна с современными технологиями.',
                icon: '✦',
              },
              {
                title: 'Устойчивость',
                description: 'Мы заботимся о нашей планете через ответственное закупочное и этичное производство.',
                icon: '♦',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full glass flex items-center justify-center text-4xl"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative overflow-hidden border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-luxury font-bold text-center mb-16"
          >
            Наш путь
          </motion.h2>

          <div className="space-y-8">
            {[
              { year: '2024', title: 'Основание HAM', description: 'Начало революции в люксовой оптике' },
              { year: '2025', title: 'Первые коллекции', description: 'Запуск наших знаковых премиальных коллекций' },
              { year: '2026', title: 'Глобальное расширение', description: 'Принесение HAM на люксовые рынки по всему миру' },
            ].map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-8 items-center"
              >
                <div className="w-32 flex-shrink-0">
                  <p className="text-3xl font-luxury font-bold text-white">{milestone.year}</p>
                </div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex-1 glass rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-luxury font-bold mb-6">Join the HAM Community</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Discover luxury eyewear that defines your style and celebrates your individuality.
            </p>
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              Explore Collections
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
