import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, setCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    phone: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.telegram.trim() || !formData.phone.trim()) {
      setError('Пожалуйста, заполните имя, Telegram и телефон.');
      return;
    }

    if (cart.length === 0) {
      setError('Корзина пуста. Добавьте товары, чтобы оформить заказ.');
      return;
    }

    setIsSubmitting(true);

    const botToken = '8431125135:AAEJAS0uhWD75n3cEq4lonFRaA6o0t7ZSkw';
    const chatId = '-1002751674386';
    const subtotal = cartTotal;
    let message = `🛒 <b>Новый заказ!</b>\n\n`;
    message += `👤 <b>Имя:</b> ${formData.name}\n`;
    message += `📱 <b>Телефон:</b> ${formData.phone}\n`;
    message += `💬 <b>Telegram:</b> @${formData.telegram.replace(/^@/, '')}\n\n`;
    message += `<b>Товары:</b>\n`;

    cart.forEach(item => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
      message += `• ${item.name}\n`;
      if (item.variant) message += `  (${item.variant})\n`;
      message += `  Количество: ${item.quantity} × ${price.toLocaleString()} uzs\n`;
      message += `  Сумма: ${(price * item.quantity).toLocaleString()} uzs\n\n`;
    });

    message += `<b>Сумма товаров:</b> ${subtotal.toLocaleString()} uzs\n\n`;
    message += `Спасибо за заказ! 💎`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      const result = await response.json();
      if (!result.ok) {
        throw new Error(result.description || 'Ошибка отправки сообщения в Telegram');
      }

      setOrderPlaced(true);
      setCart([]);
      localStorage.removeItem('ham-cart');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      console.error('Ошибка отправки:', err);
      setError('Не удалось отправить заказ в Telegram. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = cartTotal;

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="bg-black pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-luxury font-bold text-white mb-4">Корзина пуста</h1>
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
          >
            Продолжить покупки
          </button>
        </motion.div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="bg-black pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>

          <h1 className="text-4xl font-luxury font-bold text-white mb-2">
            Заказ подтвержден!
          </h1>
          <p className="text-gray-400 mb-4">
            Спасибо за ваш заказ. Мы отправили данные в Telegram и свяжемся с вами в ближайшее время.
          </p>
          <p className="text-xl font-semibold text-white mb-8">
            Заказ #HAM-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>

          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
          >
            На главную
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black pt-32 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-luxury font-bold mb-12 text-white"
        >
          Оформление заказа
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-8"
          >
            {/* Steps */}
            <div className="flex gap-4 mb-8">
              {[1, 2].map(s => (
                <motion.button
                  key={s}
                  type="button"
                  onClick={() => setStep(s)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    step === s
                      ? 'bg-white text-black'
                      : 'glass text-white'
                  }`}
                >
                  {s === 1 ? 'Контакты' : 'Просмотр'}
                </motion.button>
              ))}
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Контактная информация</h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />

                <input
                  type="text"
                  name="telegram"
                  placeholder="Telegram username"
                  value={formData.telegram}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Номер телефона"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
                >
                  Просмотреть заказ
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Проверка заказа</h2>

                {cart.map(item => {
                  const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
                  return (
                    <div key={item._id} className="bg-neutral-900 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-gray-400">{(price * item.quantity).toLocaleString()} uzs</p>
                      </div>
                      <p className="text-gray-400 text-sm">{item.quantity} × {price.toLocaleString()} uzs</p>
                    </div>
                  );
                })}

                <div className="bg-neutral-900 rounded-xl p-4">
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Сумма товаров</span>
                    <span>{totalPrice.toLocaleString()} uzs</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Итого</span>
                    <span>{totalPrice.toLocaleString()} uzs</span>
                  </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заказ в Telegram'}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setStep(1)}
                  className="w-full py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-all"
                >
                  Вернуться к контактам
                </motion.button>
              </motion.div>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-8 lg:sticky lg:top-36 h-fit"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Сводка заказа</h3>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-800">
              <div className="flex justify-between text-gray-400">
                <span>Сумма</span>
                <span>{totalPrice.toLocaleString()} uzs</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Доставка</span>
                <span className="text-green-500">Бесплатно</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-white">Итого</span>
              <span className="text-2xl font-bold text-white">
                {totalPrice.toLocaleString()} uzs
              </span>
            </div>

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
      </div>
    </div>
  );
};
