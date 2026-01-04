// src/components/Basket.jsx — ГОТОВЫЙ КОД С "КОРЗИНА ПУСТА"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefualtHeader from './DefualtHeader';

const Basket = () => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Ошибка парсинга корзины:", e);
        return [];
      }
    }
    return []; // если ничего нет — пустая корзина
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  // Промокоды
  const promoCodes = {
    SAVE10: { discount: 10, type: 'percentage' },
    SAVE5000: { discount: 5000, type: 'fixed' },
    FIRST20: { discount: 20, type: 'percentage' },
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim();
    if (promoCodes[code]) {
      setAppliedPromo({ code, ...promoCodes[code] });
      setPromoCode('');
      alert(`Промокод ${code} применён!`);
    } else {
      alert('Неверный промокод');
    }
  };

  const removePromo = () => setAppliedPromo(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo
    ? appliedPromo.type === 'percentage'
      ? Math.round(subtotal * (appliedPromo.discount / 100))
      : appliedPromo.discount
    : 0;
  const total = Math.max(0, subtotal - discount);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setPhoneNumber('');
    setCustomerName('');
  };

  const handleCheckout = async () => {
    if (!customerName.trim() || !phoneNumber.trim()) {
      alert('Заполните имя и телефон');
      return;
    }

    if (!/^\+?\d[\d\s-]{8,15}$/.test(phoneNumber.replace(/\s/g, ''))) {
      alert('Введите корректный номер телефона');
      return;
    }

    setIsCheckingOut(true);

    try {
      const botToken = '8431125135:AAEJAS0uhWD75n3cEq4lonFRaA6o0t7ZSkw';
      const chatId = '-1002751674386'; // supergroup ID (с -100)

      let message = `🛒 <b>Новый заказ!</b>\n\n`;
      message += `👤 <b>Имя:</b> ${customerName}\n`;
      message += `📱 <b>Телефон:</b> ${phoneNumber}\n\n`;
      message += `<b>Товары:</b>\n`;

      cartItems.forEach(item => {
        message += `• ${item.name}\n`;
        if (item.variant) message += `  (${item.variant})\n`;
        message += `  Количество: ${item.quantity} × ${item.price.toLocaleString()} uzs\n`;
        message += `  Сумма: ${(item.price * item.quantity).toLocaleString()} uzs\n\n`;
      });

      message += `<b>Сумма товаров:</b> ${subtotal.toLocaleString()} uzs\n`;
      if (discount > 0) {
        message += `<b>Скидка (${appliedPromo.code}):</b> -${discount.toLocaleString()} uzs\n`;
      }
      message += `<b>Итого к оплате:</b> ${total.toLocaleString()} uzs\n\n`;
      message += `Спасибо за заказ! 💎`;

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const result = await response.json();

      if (result.ok) {
        alert('✅ Заказ успешно отправлен в группу!');
        setCartItems([]);
        localStorage.removeItem('cartItems');
        setAppliedPromo(null);
        closeModal();
      } else {
        alert('❌ Ошибка: ' + (result.description || 'Неизвестная ошибка'));
      }
    } catch (err) {
      console.error("Ошибка отправки:", err);
      alert('Заказ принят, но не удалось отправить в Telegram');
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Если корзина пуста — красивое сообщение
  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <DefualtHeader />
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-8">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 21h12m-12 0a2 2 0 104 0m6 0a2 2 0 100-4" />
              </svg>
            </div>
            <h1 className="text-4xl font-light mb-6 text-gray-800">Корзина пуста</h1>
            <p className="text-gray-600 text-lg mb-10">
              Добавьте товары из каталога, чтобы оформить заказ
            </p>
            <Link 
              to="/catalog" 
              className="inline-block bg-black text-white px-10 py-4 rounded-lg uppercase tracking-wider text-sm hover:bg-gray-800 transition"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Если есть товары — показываем корзину
  return (
    <div className="bg-gray-50 min-h-screen">
      <DefualtHeader />
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <h1 className="text-4xl font-light mb-12 text-center">Корзина</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-6 flex gap-6 items-center shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-contain rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-light mb-2">{item.name}</h3>
                  {item.variant && <p className="text-gray-600 text-sm">{item.variant}</p>}
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center border rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-4 py-2 hover:bg-gray-100">-</button>
                      <span className="px-6 py-2 font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-4 py-2 hover:bg-gray-100">+</button>
                    </div>
                    <span className="text-xl font-medium">
                      {(item.price * item.quantity).toLocaleString()} uzs
                    </span>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 ml-auto">
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg h-fit">
            <h2 className="text-2xl font-light mb-6">Итог</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Сумма:</span>
                <span>{subtotal.toLocaleString()} uzs</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Скидка:</span>
                  <span>-{discount.toLocaleString()} uzs</span>
                </div>
              )}
              <div className="flex justify-between text-2xl font-bold pt-4 border-t">
                <span>К оплате:</span>
                <span>{total.toLocaleString()} uzs</span>
              </div>
            </div>

            <button
              onClick={openModal}
              className="w-full bg-black text-white py-4 rounded-lg uppercase tracking-wider hover:bg-gray-800 transition"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-light mb-6">Оформить заказ</h2>
            <input
              type="text"
              placeholder="Ваше имя"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />
            <input
              type="tel"
              placeholder="Телефон (+998...)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-6"
            />
            <div className="flex gap-4">
              <button onClick={closeModal} className="flex-1 border py-3 rounded-lg">Отмена</button>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="flex-1 bg-black text-white py-3 rounded-lg disabled:opacity-50"
              >
                {isCheckingOut ? "Отправка..." : "Подтвердить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;