const TelegramBot = require('node-telegram-bot-api');

// Bot tokeningizni kiriting
const token = '8065348509:AAEfoA_pYq6yYzRH-Ea2ry39_66Qw83iL3g';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "Foydalanuvchi"; // Foydalanuvchi ismini olish

  // Stiker yuborish
  bot.sendSticker(chatId, "CAACAgQAAxkBAAMIZ57kV3xlXcaSaJ1dp4jJS1flBKwAAvIJAAIRlWFS9FXrtLS5FPk2BA").then(() => {
    bot.sendMessage(chatId, `Hurmatli ${firstName}! 👋\n <b>ANFA</b> TRADING CLUB botiga xush kelibsiz!`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📢 Kanalimizga obuna bo‘ling", url: "https://t.me/anfatc" }],
          [{ text: "✅ Obuna bo‘ldim", callback_data: "subscribed" }]
        ]
      }
    });
  });
});

// "✅ Obuna bo‘ldim" tugmasi bosilganda
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "subscribed") {
    bot.sendMessage(chatId, "Tabriklaymiz! 🎉 Endi quyidagi tugmalar orqali botdan foydalanishingiz mumkin:", {
      reply_markup: {
        keyboard: [
          [{ text: "🌐 ANFA TRADING CLUBNING ONLAYN PLATFORMALARI" }],
          [{ text: "📊 Tavsiya uchun brokerlar" }],
          [{ text: "📚 Kursimiza haqida" }],
          [{ text: "👤 Admin bilan bog'lanish" }],
        ],
        one_time_keyboard: true,
        resize_keyboard: true
      }
    });
  }
});




bot.onText("🌐 ANFA TRADING CLUBNING ONLAYN PLATFORMALARI", (msg) => {
    const chatId = msg.chat.id;
        bot.sendMessage(chatId, "🌐 ANFA TRADING CLUBNING ONLAYN PLATFORMALARI", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "INSTAGRAM", url: "https://www.instagram.com/anfa.tc/" }],
                    [{ text: "TELEGRAM", url: "https://t.me/anfatc" }],
                ]
            }
        });
});

bot.onText("👤 Admin bilan bog'lanish", (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "👤 Admin bilan bog'lanish", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "ANFA TRADING CLUB ADMINI", url: "https://t.me/ANFAFX1" }],   
            ]
        }
    });
})
bot.onText("📊 Tavsiya uchun brokerlar", (msg) => {
    const chatId = msg.chat.id;

    // Sending the Libertex broker image with description and buttons
    bot.sendPhoto(chatId, "https://sjc.microlink.io/6tp5zu7CTy5MjTYdlBQTh9IrbqQ7oiuVD-dIVosb8IkWAmgCFYy7qwPRpA6FjUvE3RvsKkdwdZy4owVWKSkSIA.jpeg", {
        caption: "<b>Libertex</b>\n\nInnovatsion broker, ham yangi, ham tajribali treyderlarga qulay platforma taqdim etadi.\n\n<b>Imkonyatlari:</b>\n\n1️⃣ <b>CFD va Forex savdosi</b>\n\n2️⃣ <b>Salbiy balans himoyasi</b>\n\n3️⃣ <b>Ko'p aktivli savdo</b>\n\n4️⃣ <b>Mukofotlangan mobil ilova</b>",
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "📃 Royxatdan o'tish",
                        url: "https://go.libertex-affiliates.com/visit/?bta=64574&nci=21880" // Replace with actual registration link
                    },
                    {
                        text: "🎥 Libertex video",
                        callback_data: "libertex_video"
                    }
                ]
            ]
        }
    });

    // Sending the Exness broker image with description and buttons
    bot.sendPhoto(chatId, "https://media.licdn.com/dms/image/v2/D5612AQGyqKN33EOreg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1731655358155?e=2147483647&v=beta&t=KelReU4YBM9qy7-6Ey0wHlVSyDl4hXdxSCC0JjAi4yI", {
        caption: "<b>Exness</b>\n\nInnovatsion broker, ham yangi, ham tajribali treyderlarga qulay platforma taqdim etadi.\n\n<b>Imkonyatlari:</b>\n\n1️⃣ <b>CFD va Forex savdosi</b>\n\n2️⃣ <b>Salbiy balans himoyasi</b>\n\n3️⃣ <b>Ko'p aktivli savdo</b>\n\n4️⃣ <b> Mukofotlangan mobil ilova</b>",
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "📃 Royxatdan o'tish",
                        url: "https://one.exnesstrack.org/a/sq4bj54zcx" // Replace with actual registration link
                    },
                    {
                        text: "🎥 Exness video",
                        callback_data: "exness_video"
                    }
                ]
            ]
        }
    });

    // Sending the AMarkets broker image with description and buttons
    bot.sendPhoto(chatId, "https://www.amarkets.org/wp-content/uploads/2023/11/Online-broker-AMarkets-black.jpg", {
        caption: "<b>A Markets</b>\n\nInnovatsion broker, ham yangi, ham tajribali treyderlarga qulay platforma taqdim etadi.\n\n<b>Imkonyatlari:</b>\n\n1️⃣ <b>CFD va Forex savdosi</b>\n\n2️⃣ <b>Salbiy balans himoyasi</b>\n\n3️⃣ <b>Ko'p aktivli savdo</b>\n\n4️⃣ <b>Mukofotlangan mobil ilova</b>",
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "📃 Royxatdan o'tish",
                        url: "https://profit-market.info/fx/?g=IDSA92" // Replace with actual registration link
                    },
                    {
                        text: "🎥 A Markets video",
                        callback_data: "amarkets_video"
                    }
                ]
            ]
        }
    });
});

// Handling the video callbacks
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'libertex_video') {
        bot.sendVideo(chatId, "BAACAgIAAxkBAAOLZ57z96rNUl1Xgatvgt6QmMp_wvMAAndqAAIo7PlIwBTMQ6oJUbs2BA", {
            caption: "📹 Libertex Broker Video\nRo'yxatdan o'tish uchun video.",
        });
    } else if (data === 'exness_video') {
        bot.sendVideo(chatId, "BAACAgIAAxkBAAOHZ57zkZ8QvPlKN31Zo12GxLpwQKYAAlg-AAJTFdBJy0hMGT2T3nQ2BA", {
            caption: "📹 Exness Broker Video\nRo'yxatdan o'tish uchun video.",
        });
    } else if (data === 'amarkets_video') {
        bot.sendVideo(chatId, "BAACAgQAAxkBAAOJZ57zu58bHhT696pzRE-2HkpDINcAAi8XAAICNXhQk5PNZX7mQkA2BA", {
            caption: "📹 A Markets Broker Video\nRo'yxatdan o'tish uchun video.",
        });
    }
});
bot.onText("📚 Kursimiza haqida", (msg) => {
    const chatId = msg.chat.id;

    // First course information with image
    bot.sendPhoto(chatId, "AgACAgIAAxkBAAOrZ575MLEmNFZ6p_sfSXqVjjgJsAIAAgPtMRso7PlITwkcs7oJpMoBAAMCAAN4AAM2BA", {
        caption: `
        📚 <b>Online Folks</b>\n\n💲 Narxi: $359  <b>Oldin: $400</b>\n\n🌍 Malysian SNR va ANFA SNR\n\n🧠 Shaxsiy strategiya stabil daromad uchun\n💹 Bozor psihologiyasi\n\n🔴 Live trade\n\n💼 Money/Risk management\n\n🗣 Discord + Vip 2oy imkoniyati
        `,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "👉 Kursga Yozilish",
                        url: "https://t.me/ANFAFX1" 
                    }
                ]
            ]
        },
        parse_mode: 'HTML',
    }).then(() => {
        // Send second course after the first one is sent
        bot.sendPhoto(chatId, "AgACAgIAAxkBAAOuZ575-jMpX1AAAQlMIy6Axgm1c0XVAAIE7TEbKOz5SMHf9N2OfJ9qAQADAgADeAADNgQ", {
            caption: `
            📚 <b>VIP Kanal + Discord</b>\n\n💲 Narxi: 750,000 <b>Oldin: 1,000,000</b>\n\n🔴 Kuniga 5-10 ta signal beriladi 100%\n\n📈 Garant 5.000pips - 10.000pips\n\n🧠 Shaxsiy strategiya stabil daromad uchun\n\n💼 Live trade
            `,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "👉 VIP ga Qo'shilish",
                            url: "https://t.me/ANFAFX1" 
                        }
                    ]
                ]
            },
            parse_mode: 'HTML',
        }).then(() => {
            // Send third course after the second one is sent
            bot.sendPhoto(chatId, "AgACAgIAAxkBAAOxZ576RWCZaL8rrLQsGiNt9nqBA3cAAgrtMRso7PlIswhgeZDdhVMBAAMCAAN4AAM2BA", {
                caption: `
                📚 <b>Individual Course</b>\n\n💲 Narxi: Kelushuv o'stida\n\n🌍 Malysian SNR va ANFA SNR\n\n🧠 Shaxsiy strategiya stabil daromad uchun\n\n📊 Bozor psihologiyasi\n\n💼 Money/Risk management\n\n💬 Support 24/7\n\n🗣 Discord + Vip qoshilish imkoniyati\n\n🔴 Live trade\n
                `,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "👉 Kursga Yozilish",
                                url: "https://t.me/ANFAFX1" 
                            }
                        ]
                    ]
                },
                parse_mode: 'HTML',
            });
        });
    });
});

