import express from 'express';
import htmlToPdf from './util/html-to-pdf.js';
import ejs from 'ejs';
const app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// get current directory
const __dirname = new URL('.', import.meta.url).pathname;

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/generate-invoice',async (req, res) => {
  const {id, date, amount} = req.body;
  const headerHtml = await ejs.renderFile(`${__dirname}/views/header.ejs`);
  const footerHtml = await ejs.renderFile(`${__dirname}/views/footer.ejs`);
  const bodyHtml = await ejs.renderFile(`${__dirname}/views/body.ejs`, {
    id,
    date,
    amount
  });
  const pdfBuffer = await htmlToPdf(headerHtml,bodyHtml,footerHtml);
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBuffer);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});