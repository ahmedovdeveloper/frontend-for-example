import { motion } from 'framer-motion';
import { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hello@hameyewear.com',
      link: 'mailto:hello@hameyewear.com',
    },
    {
      icon: '📱',
      title: 'Телефон',
      value: '+998 99 123 45 67',
      link: 'tel:+998991234567',
    },
    {
      icon: '📍',
      title: 'Адрес',
      value: 'Ташкент, Узбекистан',
      link: '#',
    },
  ];

  return (
    <div className="bg-black pt-32 pb-20 min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-luxury font-bold mb-6">
              Свяжись с нами
            </h1>
            <p className="text-xl text-gray-400">
              Мы будем рады услышать от тебя. Свяжись с нами в любое время.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 relative overflow-hidden border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-lg p-6 hover:bg-white/10 transition-all block"
                >
                  <p className="text-3xl mb-3">{info.icon}</p>
                  <p className="text-sm text-gray-400 mb-1">{info.title}</p>
                  <p className="text-white font-semibold">{info.value}</p>
                </motion.a>
              ))}
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 space-y-4"
            >
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-green-400 text-sm"
                >
                  ✓ Спасибо! Мы скоро ответим тебе.
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Твоё имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Твой email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Номер телефона (не обязательно)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
              />

              <input
                type="text"
                name="subject"
                placeholder="Тема"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
              />

              <textarea
                name="message"
                placeholder="Твоё сообщение"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-gray-600 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors resize-none"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                Отправить сообщение
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-950 relative overflow-hidden border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-luxury font-bold text-center mb-12"
          >
            Часто задаваемые вопросы
          </motion.h2>

          <div className="space-y-4">
            {[
              { q: 'Какая гарантия на очки HAM?', a: 'Все очки HAM имеют пожизненную гарантию на производственные дефекты.' },
              { q: 'Вы доставляете за границу?', a: 'Да, мы доставляем по всему миру с бесплатной доставкой на заказы от 2 млн сум.' },
              { q: 'Как ухаживать за очками?', a: 'Используйте предоставленную микрофибровую салфетку и избегайте экстремальных температур. Подробные инструкции см. в руководстве по уходу.' },
              { q: 'Могу ли я вернуть или обменять товар?', a: 'Да, мы предлагаем возврат и обмен в течение 30 дней для неношеных товаров в оригинальной упаковке.' },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-lg p-6"
              >
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
