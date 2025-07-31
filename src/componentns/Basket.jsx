import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

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
            images: ['https://picsum.photos/400/400?random=1'],
          },
          {
            id: 3,
            name: 'H1A Chelsea',
            variant: 'Tortoise/Blue',
            price: 16700,
            quantity: 2,
            selectedColor: '#8B4513',
            images: ['https://picsum.photos/400/400?random=3'],
          },
          {
            id: 6,
            name: 'H5 Venice',
            variant: 'Rose Gold',
            price: 19800,
            quantity: 1,
            selectedColor: '#E8B4A0',
            images: ['https://picsum.photos/400/400?random=6'],
          },
        ];
    // Ensure all items have an images array
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

  const handleCheckout = async () => {
    if (!phoneNumber || !customerName) {
      alert('Пожалуйста, заполните имя и номер телефона');
      return;
    }

    // Validate phone number
    const phoneRegex = /^\+?\d[\d\s-]{6,}\d$/; // Allows + followed by digits, spaces, or dashes, at least 7 digits
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      alert('Пожалуйста, введите действительный номер телефона (например, +998901234567 или 998 90 123 45 67)');
      return;
    }

    setIsCheckingOut(true);
    try {
      const botToken = '7525818901:AAEO0Avc3gDHpd-FGoLHYu1hmB6bkVaTyHY';
      const chatId = '-1002751674386';

      const testResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/getChat?chat_id=${chatId}`,
        { method: 'GET' }
      );
      if (!testResponse.ok) {
        throw new Error(`Bot cannot access chat: ${await testResponse.text()}`);
      }
      console.log('Bot connected to chat:', await testResponse.json());

      // Send order summary message first
      const orderSummary = `Новый заказ:\n\nКлиент: ${customerName}\nТелефон: ${phoneNumber}\n\nПодытог: uzs: ${subtotal.toLocaleString()}\nСкидка: uzs: ${discount.toLocaleString()}\nИтого: uzs: ${total.toLocaleString()}`;
      const summaryResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: orderSummary,
          }),
        }
      );

      if (!summaryResponse.ok) {
        throw new Error(`Failed to send summary: ${await summaryResponse.text()}`);
      }
      console.log('Summary sent successfully:', await summaryResponse.json());

      // Send each product individually with its image, customer data, and details
      for (const item of cartItems) {
        const itemMessage = `Новый заказ:\n\nКлиент: ${customerName}\nТелефон: ${phoneNumber}\n\nТовар: ${item.name}\nВариант: ${item.variant}\nКоличество: ${item.quantity}\nЦена за единицу: uzs: ${item.price.toLocaleString()}\nОбщая цена: uzs: ${(item.price * item.quantity).toLocaleString()}`;
        const photoUrl = `https://backend-2y5w.onrender.com/uploads/${item.image[0] || 'default.jpg'}`;
        console.log(`Sending photo for item: ${item.name}, imageUrl: ${photoUrl}`);
        const photoResponse = await fetch(
          `https://api.telegram.org/bot${botToken}/sendPhoto`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              photo: photoUrl,
              caption: itemMessage,
            }),
          }
        );

        if (!photoResponse.ok) {
          console.warn(`Failed to send photo for ${item.name}: ${await photoResponse.text()}`);
          // Send message without photo as fallback
          const messageResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: itemMessage,
              }),
            }
          );

          if (!messageResponse.ok) {
            console.warn(`Failed to send message for ${item.name}: ${await messageResponse.text()}`);
          } else {
            console.log(`Message sent successfully for ${item.name}:`, await messageResponse.json());
          }
        } else {
          console.log(`Photo sent successfully for ${item.name}:`, await photoResponse.json());
        }
      }

      alert('Заказ оформлен! Спасибо за покупку! Информация отправлена в Telegram.');
      setCartItems([]);
      setAppliedPromo(null);
      closeModal();
    } catch (error) {
      console.error('Error sending to Telegram:', error.message);
      alert(`Заказ оформлен, но произошла ошибка при отправке в Telegram: ${error.message}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <h1 className="text-4xl font-light text-gray-900 mb-8 tracking-tight animate-fade-in">Корзина</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md animate-fade-in">
            <div className="text-gray-400 mb-6">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 21h2m0 0h8m-8 0a2 2 0 104 0m6 0a2 2 0 100-4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
              Ваша корзина пуста
            </h3>
            <p className="text-gray-600 font-light mb-8">
              Добавьте товары из коллекции, чтобы оформить заказ
            </p>
            <Link
              to="/catalog"
              className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-3 rounded-lg font-light tracking-wide uppercase text-sm hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                console.log('Rendering cart item:', item);
                const imageSrc = item.images && item.images.length > 0 
                  ? (imageErrors[item.id] ? item.images[0] : `https://backend-2y5w.onrender.com/uploads/${item.images[0]}`)
                  : 'https://picsum.photos/400/400';
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-36 h-36 rounded-lg overflow-hidden relative">
                        <img
                          src={`https://backend-2y5w.onrender.com/uploads/${item.image[0]}`}
                          alt={item.name}
                          className="w-full h-full object-cover transition-opacity duration-300"
                          onError={() => handleImageError(item.id)}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-light text-xl text-gray-900 mb-2 tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 font-light">
                         {item.variants?.[0]?.name  }
                        </p>
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-sm text-gray-500">Цвет:</span>
                          <div
                            className="w-5 h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor }}
                          ></div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xl font-light text-gray-900">
                            uzs: {item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              uzs: {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-300 transition-colors duration-200"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="text-lg font-light min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-300 transition-colors duration-200"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-8 shadow-lg sticky top-24 animate-fade-in">
                <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                  Итог заказа
                </h2>
                <div className="mb-8">
                  <label className="block text-sm font-light text-gray-700 mb-3">
                    Промокод
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Введите код"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-5 py-3 rounded-lg text-sm hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Применить
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-3 flex items-center justify-between bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm animate-fade-in">
                      <span>Промокод {appliedPromo.code} применен</span>
                      <button
                        onClick={removePromoCode}
                        className="text-green-600 hover:text-green-800 transition-colors duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-4 border-b border-gray-200 pb-6 mb-6">
                  <div className="flex justify-between text-gray-700 text-lg font-light">
                    <span>Подытог:</span>
                    <span>uzs: {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 text-lg font-light">
                      <span>Скидка:</span>
                      <span>uzs:{discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xl font-light text-gray-900 mb-8">
                  <span>Итого:</span>
                  <span>uzs:{total.toLocaleString()}</span>
                </div>
                <button
                  onClick={openModal}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 rounded-lg font-light tracking-wide uppercase text-sm hover:from-gray-800 hover:to-gray-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Оформление...</span>
                    </div>
                  ) : (
                    'Оформить заказ'
                  )}
                </button>
                <div className="mt-6 flex items-center justify-center space-x-3 text-sm text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Безопасная оплата</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Контактные данные
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Введите ваше имя"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Введите номер телефона (например, +998901234567)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-light tracking-wide uppercase text-sm hover:bg-gray-300 transition-all duration-300"
              >
                Отмена
              </button>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || !phoneNumber || !customerName}
                className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 rounded-lg font-light tracking-wide uppercase text-sm hover:from-gray-800 hover:to-gray-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Оформление...</span>
                  </div>
                ) : (
                  'Подтвердить заказ'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;