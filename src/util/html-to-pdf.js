import puppeteer from 'puppeteer';

const htmlToPdf = async (headerHtml,bodyHtml,footerHtml) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(bodyHtml, {
      waitUntil: 'domcontentloaded'
    });
    const pdfBuffer = await page.pdf({
      displayHeaderFooter: true,
      headerTemplate: headerHtml,
      footerTemplate: footerHtml,
      format: 'A4',
      printBackground: true,
      margin: { 
        top: "100px",
        bottom: "50px"
      },
      preferCSSPageSize: true
    });
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    console.log(error);
  }
}

export default htmlToPdf;