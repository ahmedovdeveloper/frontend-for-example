// src/components/Basket.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import DefualtHeader from './DefualtHeader';

const Basket = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    let items = savedCart
      ? JSON.parse(savedCart)
      : [
          {
            id: 1,
            name: 'H1 Roland',
            variant: 'Black/Black',
            price: 15900,
            originalPrice: 19900,
            quantity: 1,
            selectedColor: '#000000',
            images: ['default.jpg'],
          },
          {
            id: 3,
            name: 'H1A Chelsea',
            variant: 'Tortoise/Blue',
            price: 16700,
            quantity: 2,
            selectedColor: '#8B4513',
            images: ['default.jpg'],
          },
          {
            id: 6,
            name: 'H5 Venice',
            variant: 'Rose Gold',
            price: 19800,
            quantity: 1,
            selectedColor: '#E8B4A0',
            images: ['default.jpg'],
          },
        ];
    items = items.map(item => ({
      ...item,
      images: Array.isArray(item.images) ? item.images : [],
    }));
    console.log('Cart items loaded from localStorage:', items);
    return items;
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  const promoCodes = {
    SAVE10: { discount: 10, type: 'percentage' },
    SAVE5000: { discount: 5000, type: 'fixed' },
    FIRST20: { discount: 20, type: 'percentage' },
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...promoCodes[promoCode.toUpperCase()],
      });
      setPromoCode('');
    } else {
      alert('Неверный промокод');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const handleImageError = (id) => {
    console.log(`Image failed to load for item ID: ${id}`);
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = appliedPromo
    ? appliedPromo.type === 'percentage'
      ? subtotal * (appliedPromo.discount / 100)
      : appliedPromo.discount
    : 0;

  const total = subtotal - discount;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPhoneNumber('');
    setCustomerName('');
  };

  // --- FIXED: no photo sending, only text messages ---
  const handleCheckout = async () => {
    if (!phoneNumber || !customerName) {
      alert('Пожалуйста, заполните имя и номер телефона');
      return;
    }

    const phoneRegex = /^\+?\d[\d\s-]{6,}\d$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      alert('Пожалуйста, введите действительный номер телефона (например, +998901234567)');
      return;
    }

    setIsCheckingOut(true);
    try {
      // Option A: Call your backend endpoint (recommended)
      // Example: POST /api/send-order with order data.
      // If you have backend, uncomment the fetch below and adapt URL.
      /*
      const serverResponse = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phoneNumber,
          cartItems,
          subtotal,
          discount,
          total,
        }),
      });

      if (!serverResponse.ok) {
        throw new Error('Server failed to send Telegram message');
      }
      console.log('Order sent via backend:', await serverResponse.json());
      */

      // Option B: (Not recommended for production) Send from client using env vars.
      // Be aware: exposing bot token in frontend is insecure.
      const botToken = '7525818901:AAHkfzPxjjLONzhcjjHyx_1QvS3t-jyq42w';
      const chatId = '-1002751674386';

      if (!botToken || !chatId) {
        // If you don't have bot token in client, fallback to client-side direct send is skipped.
        // Inform user to use backend.
        console.warn('No bot token/chat id in env. Please use backend to send messages.');
        // Still clear cart and notify success locally:
        alert('Заказ оформлен! Мы свяжемся с вами. (Telegram: настройте отправку на сервере)');
        setCartItems([]);
        setAppliedPromo(null);
        closeModal();
        return;
      }

      // Build text-only summary and itemized messages (no photos)
      const orderSummary = [
        `✅ *Новый заказ*`,
        ``,
        `*Клиент:* ${customerName}`,
        `*Телефон:* ${phoneNumber}`,
        ``,
        `*Подытог:* uzs: ${subtotal.toLocaleString()}`,
        `*Скидка:* uzs: ${discount.toLocaleString()}`,
        `*Итого:* uzs: ${total.toLocaleString()}`,
        ``,
        `_Список товаров:_`,
        ...cartItems.map(
          (it, idx) =>
            `${idx + 1}. ${it.name} — ${it.variant} — x${it.quantity} — uzs: ${(it.price * it.quantity).toLocaleString()}`
        ),
      ].join('\n');

      // send single message (text only)
      const sendResp = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: orderSummary,
            parse_mode: 'Markdown',
          }),
        }
      );

      if (!sendResp.ok) {
        const errText = await sendResp.text();
        throw new Error(`Telegram API error: ${errText}`);
      }

      console.log('Order sent to Telegram (text only):', await sendResp.json());
      alert('Заказ оформлен! Спасибо за покупку! Информация отправлена в Telegram.');
      setCartItems([]);
      setAppliedPromo(null);
      closeModal();
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      alert(`Заказ оформлен, но произошла ошибка при отправке в Telegram: ${error.message}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <DefualtHeader />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-6 sm:mb-8 tracking-tight animate-fade-in">
          Корзина
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-md animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-3 sm:mb-4 tracking-tight">
              Ваша корзина пуста
            </h3>
            <p className="text-gray-600 font-light mb-6 sm:mb-8 text-sm sm:text-base">
              Добавьте товары из коллекции, чтобы оформить заказ
            </p>
            <Link
              to="/catalog"
              className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-light tracking-wide uppercase text-xs sm:text-sm hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cartItems.map((item) => {
                console.log('Rendering cart item:', item);
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden relative flex-shrink-0">
                        <img
                          src={`https://backend-production-79eb.up.railway.app/uploads/${item.images && item.images[0] ? item.images[0] : 'default.jpg'}`}
                          alt={item.name}
                          className="w-full h-full object-cover transition-opacity duration-300"
                          onError={() => handleImageError(item.id)}
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <h3 className="font-light text-lg sm:text-xl text-gray-900 mb-2 tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 font-light">
                          {item.variant}
                        </p>
                        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                          <span className="text-xs sm:text-sm text-gray-500">Цвет:</span>
                          <div
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor }}
                          ></div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="text-lg sm:text-xl font-light text-gray-900">
                            uzs: {item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              uzs: {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-start">
                        <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-100 rounded-lg p-1 sm:p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white border border-gray-300 transition-colors duration-200"
                          >
                            -
                          </button>
                          <span className="text-base sm:text-lg font-light min-w-[1.5rem] sm:min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white border border-gray-300 transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg sticky top-20 animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6 tracking-tight">
                  Итог заказа
                </h2>

                <div className="mb-6 sm:mb-8">
                  <label className="block text-xs sm:text-sm font-light text-gray-700 mb-2 sm:mb-3">Промокод</label>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Введите код"
                      className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
                    />
                    <button onClick={applyPromoCode} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs">Применить</button>
                  </div>

                  {appliedPromo && (
                    <div className="mt-3 flex items-center justify-between bg-green-100 text-green-800 px-3 py-2 rounded-lg text-xs">
                      <span>Промокод {appliedPromo.code} применен</span>
                      <button onClick={removePromoCode} className="text-green-600">x</button>
                    </div>
                  )}
                </div>

                <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between text-gray-700 text-base">
                    <span>Подытог:</span>
                    <span>uzs: {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 text-base">
                      <span>Скидка:</span>
                      <span>uzs: {discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-lg font-light text-gray-900 mb-6">
                  <span>Итого:</span>
                  <span>uzs: {total.toLocaleString()}</span>
                </div>

                <button
                  onClick={openModal}
                  disabled={isCheckingOut}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-light tracking-wide uppercase text-xs disabled:bg-gray-400"
                >
                  {isCheckingOut ? 'Оформление...' : 'Оформить заказ'}
                </button>

              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full">
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6 tracking-tight">Контактные данные</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-light text-gray-700 mb-2">Имя</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Введите ваше имя" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-light text-gray-700 mb-2">Номер телефона</label>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Введите номер телефона (например, +998901234567)" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm" />
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button onClick={closeModal} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg">Отмена</button>
              <button onClick={handleCheckout} disabled={isCheckingOut || !phoneNumber || !customerName} className="flex-1 bg-gray-900 text-white py-2 rounded-lg">
                {isCheckingOut ? 'Оформление...' : 'Подтвердить заказ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
