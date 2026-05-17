import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const footerSections = [
    {
      title: 'Магазин',
      links: [
        { label: 'Все коллекции', path: '/shop' },
        { label: 'Избранные', path: '/shop?filter=featured' },
        { label: 'Новинки', path: '/shop?filter=new' },
        { label: 'Распродажа', path: '/shop?filter=sale' },
      ],
    },
    {
      title: 'Бренд',
      links: [
        { label: 'О бренде HAM', path: '/about' },
        { label: 'Наша история', path: '/about' },
        { label: 'Мастерство', path: '/about' },
        { label: 'Контакты', path: '/contact' },
      ],
    },
    {
      title: 'Поддержка',
      links: [
        { label: 'Часто задаваемые вопросы', path: '/contact' },
        { label: 'Доставка', path: '/contact' },
        { label: 'Возвраты', path: '/contact' },
        { label: 'Гарантия', path: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <Link to="/">
              <h3 className="text-xl sm:text-2xl font-luxury font-bold text-white mb-4 tracking-wider">
                HAM
              </h3>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Люксовые очки премиум качества, созданные для современного мира.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <motion.a
                  key={social}
                  href={`https://${social}.com/hameyewear`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="w-8 h-8 glass rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                >
                  <span className="text-xs font-bold">{social[0].toUpperCase()}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={itemVariants}
          className="py-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-luxury font-bold text-white mb-2">
                Присоединись к клубу HAM
              </h4>
              <p className="text-sm text-gray-500">
                Получи эксклюзивный доступ к новым коллекциям и специальным предложениям.
              </p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Введи твой email"
                className="flex-1 px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                Подписаться
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>&copy; 2026 HAM Eyewear. Все права защищены.</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-gray-400 transition-colors">
                Условия использования
              </Link>
              <Link to="/privacy" className="hover:text-gray-400 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/shipping" className="hover:text-gray-400 transition-colors">
                Информация о доставке
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
