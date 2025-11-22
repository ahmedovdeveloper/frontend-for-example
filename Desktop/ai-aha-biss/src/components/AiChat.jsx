"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Megaphone,
  Instagram,
  Target,
  ShoppingCart,
  Search,
  Mail,
  Handshake,
  ArrowUpRight,
  Star,
  Menu,
  X,
  Send,
  Copy,
  Download,
  Share2,
  Mic,
  MicOff,
  Loader2,
  Play,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function AhaAiUltimate() {
  // === ПРОВЕРКА ПЛАНА ===
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isPaid = user.plan && user.plan !== "free";

  // === СЧЁТЧИК БЕСПЛАТНЫХ ЗАПРОСОВ (ТОЛЬКО ДЛЯ FREE) ===
  const FREE_REQUESTS_LIMIT = 3;
  const [freeRequestsUsed, setFreeRequestsUsed] = useState(() => {
    if (isPaid) return 0;
    const saved = localStorage.getItem("aha_ai_free_requests");
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    if (isPaid) {
      localStorage.removeItem("aha_ai_free_requests");
      return;
    }
    localStorage.setItem("aha_ai_free_requests", freeRequestsUsed.toString());
  }, [freeRequestsUsed, isPaid]);

  // === ПРОВЕРКА ЛИМИТА ===
  const checkFreeLimit = () => {
    if (isPaid) return true;
    if (freeRequestsUsed >= FREE_REQUESTS_LIMIT) {
      window.location.href = "/login";
      return false;
    }
    return true;
  };

  const remainingRequests = isPaid ? Infinity : Math.max(0, FREE_REQUESTS_LIMIT - freeRequestsUsed);

  // === UI Состояния ===
  const [activeTab, setActiveTab] = useState("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completedVideos, setCompletedVideos] = useState([]);

  const [chatHistories, setChatHistories] = useState({
    chat: [],
    marketing: [],
    smm: [],
    ads: [],
    sales: [],
    seo: [],
    email: [],
    partners: [],
    scale: [],
  });

  const [chatInputs, setChatInputs] = useState({
    chat: "",
    marketing: "",
    smm: "",
    ads: "",
    sales: "",
    seo: "",
    email: "",
    partners: "",
    scale: "",
  });

  const chatEndRefs = useRef({});
  const recognitionRef = useRef(null);

  // === Pro-курс (10 уроков с YouTube видео) ===
  const proVideos = [
    { 
      id: 1, 
      title: "Привлечение первых 100 клиентов", 
      duration: "14:20",
      videoUrl: "https://www.youtube.com/watch?v=Mnsskiql8gw" // GaryVee — Cold Outreach
    },
    { 
      id: 2, 
      title: "Увеличение среднего чека на 30%", 
      duration: "16:10",
      videoUrl: "https://www.youtube.com/embed/8nXqJ6G4g4c" // HubSpot — Upsell
    },
    { 
      id: 3, 
      title: "Воронка продаж от А до Я", 
      duration: "18:40",
      videoUrl: "https://www.youtube.com/embed/3vR3kR3kR3k" // Ankur Nagpal
    },
    { 
      id: 4, 
      title: "Реклама с ROI x5", 
      duration: "15:55",
      videoUrl: "https://www.youtube.com/embed/4mX4mX4mX4m" // Alex Hormozi
    },
    { 
      id: 5, 
      title: "Контент, который продаёт", 
      duration: "13:30",
      videoUrl: "https://www.youtube.com/embed/5nX5nX5nX5n" // MrBeast Style
    },
    { 
      id: 6, 
      title: "Автоматизация бизнеса", 
      duration: "17:20",
      videoUrl: "https://www.youtube.com/embed/6oX6oX6oX6o" // Zapier + AI
    },
    { 
      id: 7, 
      title: "Кейсы и отзывы", 
      duration: "12:45",
      videoUrl: "https://www.youtube.com/embed/7pX7pX7pX7p" // ConversionXL
    },
    { 
      id: 8, 
      title: "Масштабирование", 
      duration: "19:15",
      videoUrl: "https://www.youtube.com/embed/8qX8qX8qX8q" // Y Combinator
    },
    { 
      id: 9, 
      title: "Финансовая модель", 
      duration: "16:50",
      videoUrl: "https://www.youtube.com/embed/9rX9rX9rX9r" // Damodaran
    },
    { 
      id: 10, 
      title: "Делегирование и лидерство", 
      duration: "14:00",
      videoUrl: "https://www.youtube.com/watch?v=I0JV4VMDnJc" // Simon Sinek
    },
  ];

  const MODEL_PROMPTS = {
    marketing: `Полный маркетинг-план:\n• Онлайн: SMM, SEO, контекст, email\n• Оффлайн: партнёрства, события\n• Брендинг, tone of voice\n• Контент-стратегия\n• План запуска\n• KPI и бюджет`,
    smm: `Контент-план на 30 дней:\n• Instagram / VK / Telegram\n• Посты, сторис, рилсы\n• Темы: боль → решение → кейсы → оффер\n• Готовые тексты + визуалы\n• Хэштеги, время`,
    ads: `Реклама:\n• 5 креативов (текст + визуал)\n• Таргет: возраст, интересы, гео\n• Платформы: VK, Telegram, Google\n• Бюджет → лиды → продажи`,
    sales: `Воронка продаж:\n• Холодный → тёплый → горячий\n• Скрипты звонков\n• CRM-настройки\n• Upsell / cross-sell\n• Автоворонки`,
    seo: `SEO-стратегия:\n• Ключевые слова (10 шт)\n• Структура сайта\n• Контент-план (10 статей)\n• Техническое SEO\n• Ссылки\n• Прогноз трафика`,
    email: `Email-воронка:\n• 7 писем прогрева\n• 3 письма продаж\n• Темы: история, кейсы, оффер\n• CTA и конверсия\n• Автоматизация`,
    partners: `Партнёрская программа:\n• Кого искать (5 идей)\n• Предложение\n• Скрипт переговоров\n• Договоры\n• ROI от партнёров`,
    scale: `Масштабирование:\n• От 1 до 10 точек\n• Франшиза / филиалы\n• Системы управления\n• Найм и обучение\n• Финансовая модель`,
  };

  const tabs = [
    { id: "chat", label: "Чат с AI", icon: MessageSquare, desc: "Любой вопрос" },
    { id: "marketing", label: "Маркетинг", icon: Megaphone, desc: "Онлайн + оффлайн" },
    { id: "smm", label: "SMM", icon: Instagram, desc: "30 дней контента" },
    { id: "ads", label: "Реклама", icon: Target, desc: "Таргет + креативы" },
    { id: "sales", label: "Продажи", icon: ShoppingCart, desc: "Воронка + скрипты" },
    { id: "seo", label: "SEO", icon: Search, desc: "Трафик из поиска" },
    { id: "email", label: "Email", icon: Mail, desc: "Прогрев + продажи" },
    { id: "partners", label: "Партнёрки", icon: Handshake, desc: "Блогеры + коллабы" },
    { id: "scale", label: "Масштаб", icon: ArrowUpRight, desc: "От 1 до 10 точек" },
    { id: "pro-course", label: "Pro Курс", icon: Star, desc: "10 уроков" },
  ];

  const currentChat = chatHistories[activeTab] || [];
  const currentInput = chatInputs[activeTab] || "";

  // === ГОЛОСОВОЙ ВВОД ===
  const startVoiceRecognition = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.interimResults = true;
    recognition.continuous = true;

    let finalTranscript = "";

    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalTranscript += t + " ";
        else interim += t;
      }
      setChatInputs((prev) => ({
        ...prev,
        [activeTab]: finalTranscript + interim,
      }));
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => {
      setIsRecording(false);
      if (finalTranscript.trim()) {
        setChatInputs((prev) => ({
          ...prev,
          [activeTab]: finalTranscript.trim(),
        }));
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, [activeTab]);

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false);
  };

  const handleVoiceInput = () => {
    isRecording ? stopVoiceRecognition() : startVoiceRecognition();
  };

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, [activeTab]);

  // === ОТПРАВКА ===
  const handleChatSend = async () => {
    if (!currentInput.trim() || isLoading || activeTab === "pro-course") return;

    if (!checkFreeLimit()) return;

    const userMsg = currentInput.trim();
    setChatInputs((prev) => ({ ...prev, [activeTab]: "" }));
    setChatHistories((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], { role: "user", content: userMsg }],
    }));

    setIsLoading(true);
    setChatHistories((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], { role: "assistant", content: "Генерирую..." }],
    }));

    if (!isPaid) {
      setFreeRequestsUsed((prev) => prev + 1);
    }

    try {
      const systemPrompt = activeTab === "chat" ? "" : MODEL_PROMPTS[activeTab];
      const response = await fetch("http://localhost:9000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt: userMsg,
          model: "gpt-4o-mini",
        }),
      });

      const data = await response.json();
      const result = data.result || "Ошибка ответа";

      setChatHistories((prev) => {
        const updated = [...prev[activeTab]];
        updated[updated.length - 1] = { role: "assistant", content: result };
        return { ...prev, [activeTab]: updated };
      });

      if (!isPaid && freeRequestsUsed + 1 >= FREE_REQUESTS_LIMIT) {
        setTimeout(() => {
          alert("Вы использовали все 3 бесплатных запроса!");
          window.location.href = "/login";
        }, 1500);
      }
    } catch (err) {
      setChatHistories((prev) => {
        const updated = [...prev[activeTab]];
        updated[updated.length - 1] = { role: "assistant", content: "Ошибка сервера" };
        return { ...prev, [activeTab]: updated };
      });
    } finally {
      setIsLoading(false);
    }
  };

  // === УТИЛИТЫ ===
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Скопировано!");
  };

  const downloadTxt = (text) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareLink = () => {
    const url = `https://aha-ai.com/share/${Date.now()}`;
    navigator.clipboard.writeText(url);
    alert("Ссылка скопирована: " + url);
  };

  const toggleVideoComplete = (videoId) => {
    setCompletedVideos((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
  };

  useEffect(() => {
    if (chatEndRefs.current[activeTab]) {
      chatEndRefs.current[activeTab].scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat]);

  const videosCompleted = completedVideos.length;

  // === РЕНДЕР ===
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-gray-100 overflow-hidden">
      {/* Оверлей */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* САЙДБАР */}
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-64 md:w-72 bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 flex flex-col transition-transform duration-300 fixed md:relative z-50 h-full`}
      >
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AHA AI
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const hasMessages = chatHistories[tab.id]?.length > 0;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all ${isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "hover:bg-white/5"
                  }`}
              >
                <div
                  className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-gray-800/50"}`}
                >
                  <Icon size={18} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-semibold flex items-center gap-2">
                    <span className="truncate">{tab.label}</span>
                    {hasMessages && tab.id !== "pro-course" && (
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{tab.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Счётчик — ТОЛЬКО ДЛЯ FREE */}
        {!isPaid && freeRequestsUsed > 0 && (
          <div className="p-3 border-t border-gray-700/50">
            <div className="flex items-center gap-2 text-xs text-yellow-400 bg-yellow-600/10 px-3 py-2 rounded-lg">
              <AlertCircle size={14} />
              <span>
                Осталось запросов: <strong>{remainingRequests}</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ОСНОВНАЯ ЧАСТЬ */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/50 px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg md:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg md:text-xl font-bold truncate">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-gray-400 truncate">
              {activeTab === "pro-course"
                ? `${videosCompleted}/10 уроков`
                : tabs.find((t) => t.id === activeTab)?.desc}
            </p>
          </div>
          {activeTab === "pro-course" && (
            <div className="bg-yellow-600/20 px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-400">PRO</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "pro-course" ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {proVideos.map((video, index) => {
                const isCompleted = completedVideos.includes(video.id);
                const isLocked =
                  index > 0 && !completedVideos.includes(proVideos[index - 1].id);
                return (
                  <div
                    key={video.id}
                    className={`bg-gray-800/80 backdrop-blur-sm border rounded-xl p-4 ${isLocked
                      ? "border-gray-700/30 opacity-60"
                      : "border-gray-700/50"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500">Урок {video.id}</div>
                        <h4 className="font-semibold text-sm md:text-base">{video.title}</h4>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>

                    {/* Встроенное видео */}
                    {!isLocked && (
                      <div className="mb-3">
                        <iframe
                          width="100%"
                          height="315"
                          src={video.videoUrl}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-xl"
                        ></iframe>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${isLocked
                          ? "bg-gray-700/30"
                          : isCompleted
                            ? "bg-green-500/20"
                            : "bg-blue-500/20"
                          }`}
                      >
                        {isLocked ? (
                          <Lock size={16} className="text-gray-500" />
                        ) : isCompleted ? (
                          <CheckCircle size={16} className="text-green-400" />
                        ) : (
                          <Play size={16} className="text-blue-400" />
                        )}
                      </div>
                      <button
                        onClick={() => !isLocked && toggleVideoComplete(video.id)}
                        disabled={isLocked}
                        className={`flex-1 py-2 text-xs font-medium rounded-lg ${isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          } disabled:opacity-50`}
                      >
                        {isCompleted ? "Пройдено" : "Начать"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {currentChat.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4">
                    {React.createElement(
                      tabs.find((t) => t.id === activeTab)?.icon || MessageSquare,
                      { size: 28, className: "text-blue-400" }
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {activeTab === "chat"
                      ? "Расскажите о бизнесе"
                      : tabs.find((t) => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Например: "Кофейня, 20 клиентов в день, хочу 100"
                  </p>

                  {!isPaid && remainingRequests < FREE_REQUESTS_LIMIT && (
                    <p className="text-yellow-400 text-sm mb-4 flex items-center justify-center gap-1">
                      <AlertCircle size={16} />
                      Осталось запросов: <strong>{remainingRequests}</strong>
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
                    {["Составить план", "Контент на месяц", "Реклама", "Продажи"].map(
                      (p, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (checkFreeLimit()) {
                              setChatInputs((prev) => ({
                                ...prev,
                                [activeTab]: p,
                              }));
                            }
                          }}
                          className="p-5 text-left bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-lg text-xs"
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : (
                currentChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-full sm:max-w-xl ${msg.role === "user" ? "ml-8" : "mr-8"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                            AI
                          </div>
                          <span>AHA AI</span>
                        </div>
                      )}
                      <div
                        className={`p-4 rounded-xl ${msg.role === "user"
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                          : "bg-gray-800/80 text-gray-100 border border-gray-700/50"
                          }`}
                      >
                        <pre className="whitespace-pre-wrap text-sm">{msg.content}</pre>
                        {msg.role === "assistant" && !isLoading && (
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-700/50 text-xs">
                            <button
                              onClick={() => copyToClipboard(msg.content)}
                              className="flex items-center gap-1 hover:text-white"
                            >
                              <Copy size={12} /> Копировать
                            </button>
                            <button
                              onClick={() => downloadTxt(msg.content)}
                              className="flex items-center gap-1 hover:text-white"
                            >
                              <Download size={12} /> Скачать
                            </button>
                            <button
                              onClick={shareLink}
                              className="flex items-center gap-1 hover:text-white"
                            >
                              <Share2 size={12} /> Поделиться
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={(el) => (chatEndRefs.current[activeTab] = el)} />
            </div>
          )}
        </div>

        {/* INPUT */}
        {activeTab !== "pro-course" && (
          <div className="border-t border-gray-700/50 p-3 md:p-4 bg-gray-900/60 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700/50">
                <button
                  onClick={handleVoiceInput}
                  className={`p-3 rounded-lg transition-all flex-shrink-0 ${isRecording ? "bg-red-600" : "bg-purple-600 hover:bg-purple-500"
                    } text-white`}
                >
                  {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                </button>

                <textarea
                  value={currentInput}
                  onChange={(e) =>
                    setChatInputs((prev) => ({
                      ...prev,
                      [activeTab]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSend();
                    }
                  }}
                  placeholder="Ваш запрос..."
                  className="flex-1 bg-transparent text-gray-100 px-3 py-2 outline-none resize-none min-h-[40px] max-h-24 text-sm"
                  rows="1"
                  disabled={!isPaid && freeRequestsUsed >= FREE_REQUESTS_LIMIT}
                />

                <button
                  onClick={handleChatSend}
                  disabled={
                    !currentInput.trim() ||
                    isLoading ||
                    (!isPaid && freeRequestsUsed >= FREE_REQUESTS_LIMIT)
                  }
                  className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg disabled:opacity-50 text-white flex-shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>

              {!isPaid && freeRequestsUsed >= FREE_REQUESTS_LIMIT && (
                <p className="text-center text-yellow-400 text-xs mt-2">
                  Лимит бесплатных запросов исчерпан.{" "}
                  <a href="/login" className="underline">
                    Войти
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}