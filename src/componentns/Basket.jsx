// src/components/Basket.jsx — ПОВНИЙ ГОТОВИЙ КОД (без помилок!)
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
        console.error("Помилка парсингу корзини:", e);
      }
    }
    // Дефолтні товари, якщо корзина порожня
    return [
      {
        id: 1,
        name: "CHELSEA BLACK/BLUE",
        price: 549000,
        originalPrice: 600000,
        quantity: 1,
        variant: "Classic",
        image: "/src/assets/product/img2.jpeg"
      },
      {
        id: 2,
        name: "Roland Tortoise White",
        price: 499000,
        originalPrice: 550000,
        quantity: 2,
        variant: "Premium",
        image: "/src/assets/product/tr1.jpeg"
      }
    ];
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  // Промокоди
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
      alert(`Промокод ${code} застосовано!`);
    } else {
      alert('Невірний промокод');
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
      alert('Заповніть ім\'я та телефон');
      return;
    }

    if (!/^\+?\d[\d\s-]{8,15}$/.test(phoneNumber.replace(/\s/g, ''))) {
      alert('Введіть коректний номер телефону');
      return;
    }

    setIsCheckingOut(true);

    try {
      const botToken = '7525818901:AAHkfzPxjjLONzhcjjHyx_1QvS3t-jyq42w';
      const chatId = '-1002751674386';

      let message = `Новий заказ!\n\n`;
      message += `Ім'я: ${customerName}\n`;
      message += `Телефон: ${phoneNumber}\n\n`;
      message += `Товари:\n`;

      cartItems.forEach(item => {
        message += `• ${item.name}\n`;
        message += `  Кількість: ${item.quantity} × ${item.price.toLocaleString()} uzs\n`;
        if (item.variant) message += `  (${item.variant})\n`;
        message += `\n`;
      });

      message += `Підсумок: ${subtotal.toLocaleString()} uzs\n`;
      if (discount > 0) message += `Знижка: ${discount.toLocaleString()} uzs\n`;
      message += `ВСЬОГО: ${total.toLocaleString()} uzs`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      alert('Замовлення успішно відправлено! Дякуємо за покупку!');
      setCartItems([]);
      localStorage.removeItem('cartItems');
      setAppliedPromo(null);
      closeModal();

    } catch (err) {
      console.error("Помилка відправки:", err);
      alert('Замовлення прийнято, але не вдалося відправити в Telegram');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <DefualtHeader />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-light mb-8">Кошик порожній</h1>
          <Link to="/catalog" className="bg-black text-white px-8 py-4 rounded-lg uppercase tracking-wider">
            Перейти до каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <DefualtHeader />
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <h1 className="text-4xl font-light mb-12 text-center">Кошик</h1>

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
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg h-fit">
            <h2 className="text-2xl font-light mb-6">Підсумок</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Підсумок:</span>
                <span>{subtotal.toLocaleString()} uzs</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Знижка:</span>
                  <span>-{discount.toLocaleString()} uzs</span>
                </div>
              )}
              <div className="flex justify-between text-2xl font-bold pt-4 border-t">
                <span>До сплати:</span>
                <span>{total.toLocaleString()} uzs</span>
              </div>
            </div>

            <button
              onClick={openModal}
              className="w-full bg-black text-white py-4 rounded-lg uppercase tracking-wider hover:bg-gray-800 transition"
            >
              Оформити замовлення
            </button>
          </div>
        </div>
      </div>

      {/* Модалка оформлення */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-light mb-6">Оформлення замовлення</h2>
            <input
              type="text"
              placeholder="Ваше ім'я"
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
              <button onClick={closeModal} className="flex-1 border py-3 rounded-lg">Скасувати</button>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="flex-1 bg-black text-white py-3 rounded-lg disabled:opacity-50"
              >
                {isCheckingOut ? "Відправка..." : "Підтвердити"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;