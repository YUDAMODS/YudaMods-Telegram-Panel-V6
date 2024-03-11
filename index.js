/*
› Create By Yudamods
› Base Ori YudaMods

🌷 KALAU MAU RECODE TARO CREDITS GUA : YUDAMODS


"Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
(QS ash-Shaff: 2-3). */


const fs = require('fs');
const readline = require('readline');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const figlet = require('figlet');
const chalk = require('chalk');
const express = require('express');
const qrcode = require('qrcode-terminal');
const fetch = require('node-fetch')
const sharp = require('sharp');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 8080;

let token = '6916243118:AAGQFFvrRnOEP57pu0-A4REiI6baja2OIzw'; // buat bot t.me/BotFather

// Pterodactyl API configurations
const pterodactylApiUrl = ''; // Masukan Domain Panel
const pterodactylApiKey = ''; // Apikey PPane


let ownerContact = '0'; // dapatkan di bot t.me/getidsbot

// URL for Telegram thumbnail
const thumbPath = 'telegra.ph/file/2660b2f3572c0f2571fe9.png'; // Ganti Link Thumb Lu

/* Kalo Lu malas buat link thumb bisa Ganti
 const thumbPath = "./thumb.png"; */

// YouTube link
const youtubeLink = 'https://youtube.com/@YUDAMODS'; // Ganti Aja Bebas

const phoneVerificationQueue = {};

// Bot Session
const sessionFilePath = 'session.json'; // Jangan Di Ubah!!

let sessionData = {};
if (fs.existsSync(sessionFilePath)) {
  try {
    const sessionFileContent = fs.readFileSync(sessionFilePath, 'utf8');
    sessionData = JSON.parse(sessionFileContent);
  } catch (error) {
    console.error('Error reading session file:', error.message);
  }
}


const botToken = sessionData.token || '6916243118:AAGQFFvrRnOEP57pu0-A4REiI6baja2OIzw';


const bot = new TelegramBot(token || botToken, { polling: true });

let isQRCodeScanned = false;
let isTokenUsed = false;
let lastQRCodeDisplayTime = 0;
let userRole = '';
let currentUser = null;

function showMenu() {
  console.log('Selamat datang! Pilih salah satu opsi:');
  console.log('1. Use QR');
  console.log('2. Use Token');
}

function generateQRCode() {
  const currentTime = new Date().getTime();

  if (!isQRCodeScanned && currentTime - lastQRCodeDisplayTime >= 30000) {
    const qrCodeText = 'scanme'; // Gantilah dengan teks atau data QR code yang ingin Anda gunakan
    qrcode.generate(qrCodeText, { small: true });
    lastQRCodeDisplayTime = currentTime;
  } else {
    console.log('QR code sudah ditampilkan sebelumnya. Silakan tunggu 30 detik sebelum mencoba lagi.');
  }
}

function connectWithToken(token) {
  bot.options.polling = false;
  bot.token = token;
  bot.options.polling = true;

bot.on('message', async (m) => {
    let _p = '/'; // Set your prefix here
    const linkgc = '';
    const domain = 'YOUR_API_DOMAIN';
    const apikey = 'YOUR_API_KEY';

    // Your existing handler function
    let handler = async (m, { ctx, args, text, usedPrefix, command }) => {
        const c_apikey = 'YOUR_C_API-KEY';
        switch (command) {
            case 'addusr': {
                let t = text.split(',');
                if (t.length < 1) return m.reply(`> Perintah :\n${_p + command} nomor/tag`);
                let u = m.quoted ? m.quoted.sender : t[0] ? t[0].replace(/[^0-9]/g, '') : m.mentionedJid[0];
                let dms = '6283842204546'; // Replace with your Telegram user ID
    
                if (!u) return m.reply(`*Format salah!*\n> Perintah : ${_p + command} nomer/tag`);
                let d = (await ctx.getChat(u))[0] || {};
                let profil = d.exists ? crypto.randomBytes(2).toString('hex') : t[2];
                let password = d.exists ? crypto.randomBytes(3).toString('hex') : t[3];
    
                let f = await fetch(domain + "/api/application/users", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + apikey
                    },
                    body: JSON.stringify({
                        email: 'admin' + profil.toString() + '@yudamods.com',
                        username: 'YudaMods' + profil.toString(),
                        first_name: 'Yuda' + profil.toString(),
                        last_name: "Mods",
                        language: "en",
                        password: 'E_Ft1tseDQjK5_R' + password.toString()
                    })
                });
    
                let data = await f.json();
                if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
                let user = data.attributes;
    
                let p = await ctx.reply(m.chat, `
*===[ SUKSES MEMBUAT PANEL ]===*
    
📡ID: ${user.id}
👤USERNAME: ${user.username}
📃BUATAN: ${user.last_name}
✅AKUN DIKIRIM : @${u.split('@')[0]}`, m, { mentions: [u] });
    
                await ctx.sendMessage(u, {
                    text: `*===[ PESANAN PANEL ANDA ]===*\n
📡ID: ${user.id}                
👤USERNAME: ${user.username}
🔐PASSWORD: YudaMods${password}
🖥️LOGIN: ${webPage}
⛔EXPIRED : 1 Bulan
`,});
    
                ctx.sendMessage(dms, {
                    text: `*===[ PESANAN PANEL ]===*\n
👤AKUN PUNYA : @${u.split('@')[0]} 
📡ID: ${user.id}
    
📬EMAIL: ${user.email}
🖥️USERNAME: ${user.username}
🔐PASSWORD: YudaMods${password}
📃DIBUAT: ${user.created_at}
`,});
    
                ctx.sendMessage(u, {
                    text: `*===[ PERINGATAN ]===*\n
Gunakan dengan sebaik mungkin, simpan informasi akun karena jika hilang maka bukan tanggung jawab kami!
    
⛔Dilarang menjual kembali
⛔Dilarang menyebarkan akun karena
⛔Dilarang menggunakan berlebihan
⛔Jika terjadi error segera komplain
    
✅Garansi 5 Hari
✅Admin : 083842204546
✅Toko : YudaMods Store`,});
            }
            break;
            case 'delusr': {
                let usr = args[0];
                if (!usr) return m.reply('Masukkan ID');
    
                let f = await fetch(domain + "/api/application/users/" + usr, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + apikey
                    }
                });
    
                let res = f.ok ? { errors: null } : await f.json();
                if (res.errors) return m.reply('*USER TIDAK TERDAFTAR*');
                m.reply('*SUKSES MENGHAPUS USER TERSEBUT*');
            }
            break;
            case 'listusr': {
                let page = args[0] ? args[0] : '1';
                let f = await fetch(domain + "/api/application/users/" + usr, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + apikey
                    }
                });

                let res = await f.json();
                if (res.errors) return m.reply('*USER NOT FOUND*');
                let u = res.attributes;
                m.reply(`*${u.username.toUpperCase()} USER DETAILS*

\`\`\`ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}\`\`\``);
            }
            break;

            default: {
                // Handle unknown command or provide help
                m.reply(`Unknown command or invalid usage. Use ${_p}help for assistance.`);
            }
        }
    };

    // Use the handler function to handle messages
    handler(m);
});


bot.startPolling();


  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!isQRCodeScanned && text && text.toLowerCase() === 'scanme') {
      isQRCodeScanned = true;
      bot.sendMessage(chatId, 'Bot terhubung setelah berhasil melakukan scan QR code.');
    }
  });

  console.log('Bot terhubung menggunakan token.');
}

process.stdin.on('data', (data) => {
  const choice = data.toString().trim();

  if (choice === '1') {
    console.log('Silakan scan QR code untuk menggunakan bot.');
    generateQRCode();
    userRole = 'qr';
  } else if (choice === '2') {
    getTokenInput();
    userRole = 'token';
  } else if (choice === '3') {
    console.log('Terima kasih telah menggunakan bot. Sampai jumpa!');
    process.exit();
  } else {
    console.log('Pilihan tidak valid. Silakan pilih 1 untuk "Use QR", 2 untuk "Use Token", atau 3 untuk "Exit".');
  }
});

function getTokenInput(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('', (inputToken) => {
    rl.close();
    botToken = inputToken;
    token = inputToken;
    sessionData.token = inputToken;

    fs.writeFileSync(sessionFilePath, JSON.stringify(sessionData, null, 2));

    callback(inputToken);
  });
}

let Start = new Date();

let senderInfo;
let dateInfo;

const logs = (message, color, senderInfo, dateInfo) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(chalk[color](`[${timestamp}] ${senderInfo} ${dateInfo} => ${message}`));
};

figlet('YudaMods', (err, data) => {
  if (err) {
    console.error('Error rendering figlet:', err);
    return;
  }
  console.log(chalk.blue(data));
  console.log(chalk.blue('Bot is Running...'));
});

bot.on('polling_error', (error) => {
  logs(`Polling error: ${error.message}`, 'blue');
});

  function sendStartMenu(chatId) {
  const startMessage = "Selamat datang di bot YudaMods!\n\n" +
    "Berikut adalah fitur yang tersedia:\n" +
    "/addserver [Nama Server] - Menambahkan server baru\n" +
    "/adduser - Menambahkan pengguna baru\n" +
    "/addadmin [Nama Admin] - Menambahkan administrator baru\n" +
    "/checkuser [Nama Pengguna] - Memeriksa keberadaan pengguna\n" +
    "/checkadmin [Nama Admin] - Memeriksa keberadaan administrator\n" +
    "/deleteserver [Nama Server] - Menghapus server\n" +
    "/deleteuser [Nama Pengguna] - Menghapus pengguna\n" +
    "/deleteadmin [Nama Admin] - Menghapus administrator\n" +
    "/owner - Melihat nomor kontak owner\n" +
    "/getuserid - Mendapatkan ID pengguna\n" +
    "/addowner [ID Pengguna] - Menambahkan owner baru\n" +
    "/ytmp3 - Mendownload Mp3 Youtube\n" +
    "/ytmp4 - Mendownload Mp4 Youtube\n" +
    "/akinatorstart - Memulai Akinator\n" +
    "/akinatoranswer - Solusi Jawabab Akinator\n" +
    "/akinatorback - Akinator Kembali Dari Permainan\n" +
    "/akinatorend - Mengakhiri Akinator\n" +
    "/lirik - Mengetahui Lirik Lagu\n" +
    "/attack - Serangan Spam Bot Telegram\n" +
    "/runtime - Informasi waktu eksekusi skrip\n"; +
    "/panelinfo - Informasi Admin Panel";
  // Add YouTube button
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🎬 Kunjungi YouTube', url: youtubeLink }],
      ],
    },
  };

  bot.sendPhoto(chatId, thumbPath, { caption: startMessage, ...keyboard });
}

bot.onText(/\/start|\/menu/, (msg) => {
  const chatId = msg.chat.id;
  sendStartMenu(chatId);
});


bot.onText(/\/attack/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Please enter your phone number to initiate the attack:');
  phoneVerificationQueue[chatId] = 'awaiting_phone_number';
});

bot.on('text', async (msg) => {
  const chatId = msg.chat.id;
  const userText = msg.text;

  if (phoneVerificationQueue[chatId] === 'awaiting_phone_number') {
    // Assuming user entered the phone number
    const phoneNumber = userText;

    try {
      const response = await axios.post('https://api.payfazz.com/v2/phoneVerifications', {
        phone: '0' + phoneNumber,
      }, {
        headers: {
          'Host': 'api.payfazz.com',
          'Content-Length': '17',
          'Accept': '*/*',
          'Origin': 'https://www.payfazz.com',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; SM-G600S Build/LMY47V; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Referer': 'http://www.payfazz.com/register/BEN6ZF74XL',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        },
      });

      const resultText = response.data;
      bot.sendMessage(chatId, resultText);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'An error occurred while processing the request.');
    }

    // Clear the state after processing the phone number
    delete phoneVerificationQueue[chatId];
  }
});


bot.onText(/\/ytmp3/, async (msg) => {
  const chatId = msg.chat.id;

  // Handle /ytmp3 command
  const ytmp3Options = {
    method: 'GET',
    url: 'https://coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com/',
    params: {
      id: 'lF-jPBnZ098,OmAlu5T44t8,GTJHrHHAElU'
    },
    headers: {
      'X-RapidAPI-Key': 'b603bb3c5emsh575aa7c40970bd0p1c1022jsn722224edd232',
      'X-RapidAPI-Host': 'coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(ytmp3Options);
    bot.sendMessage(chatId, `MP3 Data: ${response.data}`);
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
});

bot.onText(/\/ytmp4/, async (msg) => {
  const chatId = msg.chat.id;

  // Handle /ytmp4 command
  const ytmp4Options = {
    method: 'GET',
    url: 'https://youtube-to-mp4.p.rapidapi.com/url=&title',
    params: {
      url: 'https://www.youtube.com/watch?v=IfNB5RTxnhI',
      title: 'Call of Duty : Modern Warfare 2 Remastered - All Weapon Reload Animations in 4 Minutes'
    },
    headers: {
      'X-RapidAPI-Key': 'b603bb3c5emsh575aa7c40970bd0p1c1022jsn722224edd232',
      'X-RapidAPI-Host': 'youtube-to-mp4.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(ytmp4Options);
    bot.sendMessage(chatId, `MP4 Data: ${response.data}`);
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
});


bot.onText(/\/addserver (.+)/, async (msg, match) => {
  const startTime = new Date();
  try {
    const serverName = match[1];
    const chatId = msg.chat.id;

    const response = await axios.post(`${pterodactylApiUrl}/api/application/servers`, {
      name: serverName,
    }, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000;

    bot.sendPhoto(chatId, thumbPath, {
      caption: `Server ${serverName} successfully added.\nExecution time: ${executionTime} seconds`,
    });
  } catch (error) {
    console.error('Error adding server:', error);
    bot.sendMessage(msg.chat.id, `Failed to add server. Error: ${error.message}`);
  }
});

bot.onText(/\/akinatorstart/, (msg) => {
  const chatId = msg.chat.id;
  axios.get('https://api.lolhuman.xyz/api/akinator/start?apikey=Ichanzx')
    .then(response => {
      bot.sendMessage(chatId, response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

bot.onText(/\/akinatoranswer/, (msg) => {
  const chatId = msg.chat.id;
  axios.get('https://api.lolhuman.xyz/api/akinator/answer?apikey=Ichanzx&server=&frontaddr=&session=&signature=&step=&answer=')
    .then(response => {
      bot.sendMessage(chatId, response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

bot.onText(/\/akinatorback/, (msg) => {
  const chatId = msg.chat.id;
  axios.get('https://api.lolhuman.xyz/api/akinator/back?apikey=Ichanzx&server=&session=&signature=&step=')
    .then(response => {
      bot.sendMessage(chatId, response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

bot.onText(/\/akinatorend/, (msg) => {
  const chatId = msg.chat.id;
  axios.get('https://api.lolhuman.xyz/api/akinator/end?apikey=Ichanzx&server=&session=&signature=&step=')
    .then(response => {
      bot.sendMessage(chatId, response.data);
    })
    .catch(error => {
      console.error(error);
    });
});


bot.onText(/\/lirik/, (msg) => {
  const chatId = msg.chat.id;
  axios.get('https://api.lolhuman.xyz/api/lirik?apikey=Ichanzx&query=melukis%20senja')
    .then(response => {
      bot.sendMessage(chatId, response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

bot.onText(/\/translate (.+)/, async (msg, match) => {
  const API_KEY = 'Ichanzx';
  const API_URL = 'https://api.lolhuman.xyz/api/translate/auto/id';

  const chatId = msg.chat.id;
  const textToTranslate = match[1];

  if (textToTranslate) {
    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          text: encodeURIComponent(textToTranslate),
        },
      });

      const translatedText = response.data.result;
      bot.sendMessage(chatId, `Translation: ${translatedText}`);
    } catch (error) {
      console.error('Translation Error:', error.message);
      bot.sendMessage(chatId, 'An error occurred while translating.');
    }
  } else {
    bot.sendMessage(chatId, 'Use the command /translate [text] to translate.');
  }
});

bot.onText(/\/adduser/, async (msg) => {
  const startTime = new Date();
  try {
    const chatId = msg.chat.id;

    const response = await axios.post(`${pterodactylApiUrl}/api/application/users`, null, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000;

    bot.sendPhoto(chatId, thumbPath, {
      caption: `User successfully added.\nExecution time: ${executionTime} seconds`,
    });
  } catch (error) {
    console.error('Error adding user:', error);
    bot.sendMessage(msg.chat.id, `Failed to add user. Error: ${error.message}`);
  }
});

bot.onText(/\/addadmin (.+)/, async (msg, match) => {
  const startTime = new Date();
  try {
    const adminUsername = match[1];
    const chatId = msg.chat.id;

    const response = await axios.post(`${pterodactylApiUrl}/api/application/users`, {
      username: adminUsername,
    }, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    await axios.post(`${pterodactylApiUrl}/api/application/users/${response.data.id}/administrative`, null, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000;

    bot.sendPhoto(chatId, thumbPath, {
      caption: `Administrator ${adminUsername} successfully added.\nExecution time: ${executionTime} seconds`,
    });
  } catch (error) {
    console.error('Error adding admin:', error);
    bot.sendMessage(msg.chat.id, `Failed to add administrator. Error: ${error.message}`);
  }
});

bot.onText(/\/checkuser (.+)/, async (msg, match) => {
  const startTime = new Date();
  try {
    const username = match[1];
    const chatId = msg.chat.id;

    const response = await axios.get(`${pterodactylApiUrl}/api/application/users`, {
      params: {
        filter: `username=${username}`,
      },
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    if (response.data.data.length > 0) {
      bot.sendPhoto(chatId, thumbPath, {
        caption: `User ${username} is already registered.`,
      });
    } else {
      bot.sendPhoto(chatId, thumbPath, {
        caption: `User ${username} is not registered yet.`,
      });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    bot.sendMessage(msg.chat.id, `Failed to check user. Error: ${error.message}`);
  }
});

bot.onText(/\/xnxx/, async (msg) => {
  const chatId = msg.chat.id;
  const url = `https://api.lolhuman.xyz/api/xnxx?apikey=Ichanzx&url=${encodeURIComponent(msg.text)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    bot.sendMessage(chatId, data);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'An error occurred while processing your request.');
  }
});


bot.onText(/\/translate2 (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const textToTranslate = match[1];
  const apiKey = 'YourTranslationApiKey'; // Replace with your actual translation API key
  const targetLanguage = 'id'; // Replace with your desired target language code

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${encodeURIComponent(
    textToTranslate
  )}&target=${targetLanguage}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.data && data.data.translations && data.data.translations.length > 0) {
      const translatedText = data.data.translations[0].translatedText;
      bot.sendMessage(chatId, `Translated Text: ${translatedText}`);
    } else {
      bot.sendMessage(chatId, 'Translation failed.');
    }
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'An error occurred while processing your request.');
  }
});

bot.onText(/\/checkspam (.+)/, async (msg, match) => {
  const phoneNumber = match[1];

  const options = {
    method: 'GET',
    url: 'https://spamcheck.p.rapidapi.com/index.php',
    params: {
      number: phoneNumber,
    },
    headers: {
      'X-RapidAPI-Key': 'b603bb3c5emsh575aa7c40970bd0p1c1022jsn722224edd232',
      'X-RapidAPI-Host': 'spamcheck.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const result = response.data;

    bot.sendMessage(msg.chat.id, `Spam check result for ${phoneNumber}: ${result}`);
  } catch (error) {
    console.error(error);
    bot.sendMessage(msg.chat.id, 'Error checking spam. Please try again later.');
  }
});


bot.onText(/\/checkadmin (.+)/, async (msg, match) => {
  const startTime = new Date();
  try {
    const adminUsername = match[1];
    const chatId = msg.chat.id;

    const response = await axios.get(`${pterodactylApiUrl}/api/application/users`, {
      params: {
        filter: `username=${adminUsername}`,
      },
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      }
    });

    if (response.data && response.data.data && response.data.data.length > 0) {
      bot.sendMessage(chatId, `Admin ${adminUsername} is already registered.`);
    } else {
      bot.sendMessage(chatId, `Admin ${adminUsername} is not registered yet.`);
    }
  } catch (error) {
    console.error('Error checking admin:', error);
    bot.sendMessage(msg.chat.id, `Failed to check admin. Error: ${error.message}`);
  }
});

bot.onText(/\/deleteserver (.+)/, async (msg, match) => {
  try {
    const serverName = match[1];
    const chatId = msg.chat.id;

    const response = await axios.delete(`${pterodactylApiUrl}/api/application/servers/${serverName}`, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    bot.sendMessage(msg.chat.id, `Server ${serverName} successfully deleted.`);
  } catch (error) {
    console.error('Error deleting server:', error);
    bot.sendMessage(msg.chat.id, `Failed to delete server. Error: ${error.message}`);
  }
});

bot.onText(/\/deleteuser (.+)/, async (msg, match) => {
  try {
    const username = match[1];
    const chatId = msg.chat.id;

    const response = await axios.delete(`${pterodactylApiUrl}/api/application/users/${username}`, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    bot.sendMessage(msg.chat.id, `User ${username} successfully deleted.`);
  } catch (error) {
    console.error('Error deleting user:', error);
    bot.sendMessage(msg.chat.id, `Failed to delete user. Error: ${error.message}`);
  }
});

bot.onText(/\/deleteadmin (.+)/, async (msg, match) => {
  try {
    const adminUsername = match[1];
    const chatId = msg.chat.id;

    const response = await axios.delete(`${pterodactylApiUrl}/api/application/users/${adminUsername}`, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    bot.sendMessage(msg.chat.id, `Administrator ${adminUsername} successfully deleted.`);
  } catch (error) {
    console.error('Error deleting admin:', error);
    bot.sendMessage(msg.chat.id, `Failed to delete administrator. Error: ${error.message}`);
  }
});


bot.onText(/\/getuserid (.+)/, async (msg, match) => {
  try {
    const username = match[1];
    const chatId = msg.chat.id;
    const response = await bot.getChat(username);

    if (response && response.id) {
      currentUser = response;
      bot.sendMessage(chatId, `Informasi Pengguna:\nNama: ${currentUser.first_name}\nTag: @${currentUser.username || 'N/A'}\nID: ${currentUser.id}`);
    } else {
      bot.sendMessage(chatId, 'Tidak dapat menemukan ID pengguna.');
    }
  } catch (error) {
    console.error('Error getting user ID:', error);
    bot.sendMessage(chatId, `Gagal mendapatkan informasi pengguna. Error: ${error.message}`);
  }
});

bot.onText(/\/addowner (.+)/, async (msg, match) => {
  try {
    const newOwnerID = match[1];
    const chatId = msg.chat.id;

    ownerContact = newOwnerID;

    bot.sendMessage(chatId, `Owner successfully updated. New owner ID: ${newOwnerID}`);
  } catch (error) {
    console.error('Error adding owner:', error);
    bot.sendMessage(chatId, `Failed to add owner. Error: ${error.message}`);
  }
});

bot.onText(/\/credits/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Dibuat oleh YudaMods. Berikan kredit jika digunakan.');
});

bot.onText(/\/panelinfo/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(msg.chat.id, `Your Panel Details\nDomain: ${pterodactylApiUrl}\nApikey: ${pterodactylApiKey}`);
});



bot.onText(/^\/owner$/, (msg) => {
  const From = msg.chat.id;
  const creatorMessage = 'This is my owner: [YUDAMODS](https://t.me/YUDAMODS)';
  
  senderInfo = `From: ${msg.from.first_name} (@${msg.from.username || 'N/A'})`;
  dateInfo = `Date: ${new Date(msg.date * 1000).toLocaleString()}`;

  const replyMarkup = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Chat Creator YudaMods`, url: `https://t.me/YUDAMODS}' }],
      ],
    },
  };
  bot.sendMessage(From, creatorMessage, { reply_to_message_id: msg.message_id, ...replyMarkup });

  // Tampilkan informasi di console
  logs('Creator response sent', 'green', senderInfo, dateInfo);
});


bot.onText(/^\/runtime$/, (msg) => {
  const now = new Date();
  const uptimeMilliseconds = now - Start;
  const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
  const uptimeMinutes = Math.floor(uptimeSeconds / 60);
  const uptimeHours = Math.floor(uptimeMinutes / 60);

  const From = msg.chat.id;
  const uptimeMessage = `Active ⏱️${uptimeHours} hour ${uptimeMinutes % 60} minute ${uptimeSeconds % 60} second.`;

  senderInfo = `From: ${msg.from.first_name} (@${msg.from.username || 'N/A'})`;
  dateInfo = `Date: ${new Date(msg.date * 1000).toLocaleString()}`;

  const replyMarkup = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Owner', url: 't.me/YUDAMODS' }],
      ],
    },
  };
  bot.sendMessage(From, uptimeMessage, { reply_to_message_id: msg.message_id, ...replyMarkup });

  // Tampilkan informasi di console
  logs('Runtime response sent', 'green', senderInfo, dateInfo);
});


function generateQRCode() {
  const qrCodeText = 'scanme'; // Gantilah dengan teks atau data QR code yang ingin Anda gunakan
  qrcode.generate(qrCodeText, { small: true });
}

function getTokenInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  
  
rl.question('', (inputToken) => {
    rl.close();
    if (inputToken.trim() === '') {
      console.log('Token tidak boleh kosong. Silakan masukkan token.');
      getTokenInput();
    } else {
      botToken = inputToken;
      token = inputToken;
      sessionData.token = inputToken;
      fs.writeFileSync(sessionFilePath, JSON.stringify(sessionData, null, 2));

     //  Clear figlet YudaMods and connect
      clearFigletAndConnect(inputToken);
    }
  });
}

function connectWithToken(inputToken) {
  if (userRole === 'token') {
    bot.options.polling = false;
    bot.token = inputToken;
    bot.options.polling = true;

    // Additional logic if needed after connecting with token
    console.log('Bot terhubung menggunakan token.');
  }
}

function clearFigletAndConnect(token) {
  console.clear(); // Clear console
  console.log('Connecting to YudaMods...');

  // Connect with the provided token
  connectWithToken(token);
}

getTokenInput();


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Jika pesan yang diterima adalah QR code, hubungkan bot
  if (!isQRCodeScanned && text && text.toLowerCase() === 'scanme') {
    isQRCodeScanned = true;
    bot.sendMessage(chatId, 'Bot terhubung setelah berhasil melakukan scan QR code.')
      .then(() => {
        // Tambahkan logika tambahan yang diperlukan setelah berhasil terhubung
        // Misalnya, kode tambahan di sini
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }
});