import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('ham-user', JSON.stringify({
      email: formData.email,
      name: isLogin ? formData.email : formData.name,
    }));
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass rounded-lg p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-luxury font-bold text-white mb-2">HAM</h1>
            <p className="text-gray-400">
              {isLogin ? 'Добро пожаловать' : 'Присоединись к сообществу HAM'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                type="text"
                name="name"
                placeholder="Полное имя"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
              />
            )}

            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: !isLogin ? 0.1 : 0 }}
              type="email"
              name="email"
              placeholder="Адрес электронной почты"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
            />

            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: !isLogin ? 0.2 : 0.1 }}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
            />

            {!isLogin && (
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
              />
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Забыли пароль?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all mt-6"
            >
              {isLogin ? 'Войти' : 'Создать аккаунт'}
            </motion.button>
          </form>

          {/* Toggle */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm mb-4">
              {isLogin ? "Нет аккаунта?" : 'Уже есть аккаунт?'}
            </p>
            <motion.button
              onClick={() => setIsLogin(!isLogin)}
              whileHover={{ scale: 1.05 }}
              className="text-white font-semibold text-sm"
            >
              {isLogin ? 'Создать аккаунт' : 'Войти'}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-center text-xs text-gray-500 mb-4">ИЛИ</p>
            <div className="space-y-2">
              <button className="w-full py-3 glass text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-sm">
                Войти через Google
              </button>
              <button className="w-full py-3 glass text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-sm">
                Войти через Apple
              </button>
            </div>
          </div>
        </motion.div>

        {/* Back to Shop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate('/shop')}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Продолжить покупки
          </button>
        </motion.div>
      </div>
    </div>
  );
};
