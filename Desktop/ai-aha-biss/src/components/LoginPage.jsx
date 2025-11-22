"use client"; // УБЕРИ ЭТУ СТРОКУ — она только для Next.js!

import React, { useState } from "react";
import { 
  Check, X, Sparkles, Zap, Crown, ArrowRight, 
  MessageSquare
} from "lucide-react";

export default function LoginPage() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [showComparison, setShowComparison] = useState(false);

  const TELEGRAM_LINK = "https://t.me/akhmad_x1";

  const plans = [
    {
      id: "free",
      name: "Free",
      icon: MessageSquare,
      price: { monthly: 0, yearly: 0 },
      description: "Для знакомства с AI",
      color: "from-gray-600 to-gray-700",
      features: [
        { text: "3 генерации", included: true },
        { text: "3 AI-модели", included: true },
        { text: "Базовый чат", included: true },
        { text: "Экспорт в TXT", included: true },
        { text: "Pro курсы", included: false },
        { text: "Приоритетная поддержка", included: false },
        { text: "Все 9 моделей", included: false },
        { text: "Безлимитные генерации", included: false },
      ],
      cta: "Начать бесплатно",
      link: "/chat",
      popular: false
    },
    {
      id: "pro",
      name: "Pro",
      icon: Zap,
      price: { monthly: 990, yearly: 9900 },
      description: "Для серьезного бизнеса",
      color: "from-blue-600 to-purple-600",
      features: [
        { text: "5000 генераций/месяц", included: true },
        { text: "Все 9 AI-моделей", included: true },
        { text: "Pro курс (10 уроков)", included: true },
        { text: "Экспорт в PDF/DOCX", included: true },
        { text: "История на 90 дней", included: true },
        { text: "Email поддержка", included: true },
        { text: "Безлимит", included: false },
        { text: "Приоритет генерации", included: false },
      ],
      cta: "Купить Pro",
      link: TELEGRAM_LINK,
      popular: true
    },
    {
      id: "ultimate",
      name: "Ultimate",
      icon: Crown,
      price: { monthly: 2490, yearly: 24900 },
      description: "Максимум возможностей",
      color: "from-yellow-600 to-orange-600",
      features: [
        { text: "Безлимитные генерации", included: true },
        { text: "Все 9 AI-моделей", included: true },
        { text: "Pro курс + консультации", included: true },
        { text: "Экспорт в любых форматах", included: true },
        { text: "Безлимитная история", included: true },
        { text: "Приоритетная поддержка 24/7", included: true },
        { text: "Ранний доступ к новым фичам", included: true },
        { text: "Персональный менеджер", included: true },
      ],
      cta: "Купить Ultimate",
      link: TELEGRAM_LINK,
      popular: false
    }
  ];

  const comparisonFeatures = [
    { category: "Генерация контента", features: [
      { name: "Генераций в месяц", free: "3", pro: "5000", ultimate: "∞" },
      { name: "Скорость генерации", free: "Обычная", pro: "Быстрая", ultimate: "Моментальная" },
      { name: "Качество контента", free: "Базовое", pro: "Высокое", ultimate: "Премиум" },
    ]},
    { category: "AI Модели", features: [
      { name: "Чат с AI", free: "✓", pro: "✓", ultimate: "✓" },
      { name: "Маркетинг", free: "—", pro: "✓", ultimate: "✓" },
      { name: "SMM", free: "✓", pro: "✓", ultimate: "✓" },
      { name: "Реклама", free: "—", pro: "✓", ultimate: "✓" },
      { name: "Продажи", free: "✓", pro: "✓", ultimate: "✓" },
      { name: "SEO", free: "—", pro: "✓", ultimate: "✓" },
      { name: "Email", free: "—", pro: "✓", ultimate: "✓" },
      { name: "Партнерки", free: "—", pro: "✓", ultimate: "✓" },
      { name: "Масштабирование", free: "—", pro: "✓", ultimate: "✓" },
    ]},
    { category: "Обучение", features: [
      { name: "Pro курс (10 уроков)", free: "—", pro: "✓", ultimate: "✓" },
      { name: "Личные консультации", free: "—", pro: "—", ultimate: "✓" },
      { name: "Комьюнити", free: "—", pro: "✓", ultimate: "✓ VIP" },
    ]},
    { category: "Экспорт и история", features: [
      { name: "Экспорт TXT", free: "✓", pro: "✓", ultimate: "✓" },
      { name: "Экспорт PDF/DOCX", free: "—", pro: "✓", ultimate: "✓" },
      { name: "История чатов", free: "7 дней", pro: "90 дней", ultimate: "Безлимит" },
    ]},
    { category: "Поддержка", features: [
      { name: "Email поддержка", free: "—", pro: "✓", ultimate: "✓ 24/7" },
      { name: "Персональный менеджер", free: "—", pro: "—", ultimate: "✓" },
      { name: "Время ответа", free: "—", pro: "24 часа", ultimate: "1 час" },
    ]}
  ];

  const faqs = [
    { q: "Можно ли поменять тариф?", a: "Да, в любой момент. Разница пересчитывается пропорционально." },
    { q: "Что после 3 генераций?", a: "Доступ к Free временно ограничен. Pro — докупите генерации." },
    { q: "Можно отменить подписку?", a: "Да, в личном кабинете. Доступ до конца оплаченного периода." },
    { q: "Скидки для команд?", a: "Да, от 5 лицензий — 20%. Пишите в Telegram." }
  ];

  const getPrice = (plan) => {
    const price = billingPeriod === "yearly" ? plan.price.yearly : plan.price.monthly;
    const monthlyPrice = billingPeriod === "yearly" ? Math.floor(price / 12) : price;
    return { price, monthlyPrice };
  };

  const handleBuy = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = link;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-gray-100">
      <div className="border-b border-gray-700/50 bg-gray-900/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AHA AI
          </h1>
          <a href="/login" className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all text-sm">
            Войти
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
          <Sparkles size={16} className="text-blue-400" />
          <span className="text-sm text-blue-300">Специальное предложение: -17% при годовой оплате</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Выберите свой план
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Начните бесплатно, масштабируйтесь по мере роста
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white font-semibold' : 'text-gray-400'}`}>
            Ежемесячно
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-gray-700 rounded-full relative transition-all"
          >
            <div className={`w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full absolute top-1 transition-all ${
              billingPeriod === 'yearly' ? 'left-8' : 'left-1'
            }`}></div>
          </button>
          <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-white font-semibold' : 'text-gray-400'}`}>
            Ежегодно
          </span>
          {billingPeriod === 'yearly' && (
            <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
              Экономия 17%
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const { price, monthlyPrice } = getPrice(plan);
            const isFree = plan.id === "free";

            return (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20' : 'border-gray-700/50 hover:border-gray-600/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}

                <div className="p-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        {price > 0 ? price.toLocaleString('ru-RU') : "Бесплатно"}
                      </span>
                      {price > 0 && <span className="text-gray-400">₽</span>}
                    </div>
                    {billingPeriod === 'yearly' && price > 0 && (
                      <p className="text-sm text-gray-400 mt-1">
                        {monthlyPrice.toLocaleString('ru-RU')} ₽/месяц
                      </p>
                    )}
                    {price > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        {billingPeriod === 'yearly' ? 'в год' : 'в месяц'}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleBuy(plan.link)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group mb-6 ${
                      isFree
                        ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-200'
                        : plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-gray-700/50 hover:bg-gray-700 text-gray-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X size={18} className="text-gray-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-500'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
        >
          {showComparison ? 'Скрыть' : 'Показать'} детальное сравнение
        </button>
      </div>

      {showComparison && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left p-6 text-gray-400 font-semibold">Возможности</th>
                    <th className="text-center p-6 font-semibold">Free</th>
                    <th className="text-center p-6 font-semibold bg-blue-600/10">Pro</th>
                    <th className="text-center p-6 font-semibold">Ultimate</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, i) => (
                    <React.Fragment key={i}>
                      <tr className="bg-gray-800/50">
                        <td colSpan={4} className="p-4 font-semibold text-sm text-blue-400">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, j) => (
                        <tr key={j} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                          <td className="p-4 text-gray-300">{feature.name}</td>
                          <td className="p-4 text-center text-gray-400">{feature.free}</td>
                          <td className="p-4 text-center bg-blue-600/5">{feature.pro}</td>
                          <td className="p-4 text-center text-gray-400">{feature.ultimate}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Частые вопросы</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 p-12">
          <Crown size={48} className="mx-auto mb-6 text-yellow-400" />
          <h3 className="text-3xl font-bold mb-4">Готовы начать?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам предпринимателей
          </p>
          <button
            onClick={() => handleBuy("/chat")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/30 inline-flex items-center gap-2"
          >
            Начать бесплатно
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}