import TelegramBot from 'node-telegram-bot-api';
import ejs from 'ejs';
import htmlToPdf from './util/html-to-pdf.js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const __dirname = new URL('.', import.meta.url).pathname;
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Command to generate invoice
bot.onText(/\/generate (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [id, date, amount] = match[1].split(' ');
  const headerHtml = await ejs.renderFile(`${__dirname}/views/header.ejs`);
  const footerHtml = await ejs.renderFile(`${__dirname}/views/footer.ejs`);
  const bodyHtml = await ejs.renderFile(`${__dirname}/views/body.ejs`, {
    id,
    date,
    amount
  });
  const pdfBuffer = await htmlToPdf(headerHtml,bodyHtml,footerHtml);
  bot.sendDocument(chatId, pdfBuffer,{}, {
    filename: 'invoice.pdf',
    contentType: 'application/pdf'
  });
});

