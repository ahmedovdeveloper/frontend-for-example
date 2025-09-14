import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Какие виды очков вы предлагаете?",
    answer:
      "Мы предлагаем широкий ассортимент очков: солнцезащитные, с диоптриями, компьютерные, модные оправы, а также детские и спортивные модели."
  },
  {
    question: "Как выбрать подходящую оправу?",
    answer:
      "Вы можете воспользоваться нашим онлайн-гидом по подбору оправы в зависимости от формы лица, стиля и предпочтений. Также доступна виртуальная примерочная, если она есть на сайте."
  },
  {
    question: "Доставляете ли вы за границу?",
    answer:
      "Нет, международная доставка в настоящее время не осуществляется. Мы доставляем заказы только по территории вашей страны."
  },
  {
    question: "Как ухаживать за очками?",
    answer:
      "Рекомендуем протирать линзы микрофиброй, использовать специальный спрей для чистки, избегать агрессивных чистящих средств и не оставлять очки под прямыми солнечными лучами."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-3 text-center">Часто задаваемые вопросы</h2>
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer bg-white"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                {activeIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-700 text-base leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
