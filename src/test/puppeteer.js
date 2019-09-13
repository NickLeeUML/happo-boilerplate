const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://stackoverflow.com/', {waitUntil: 'networkidle0'});
  try {
    const elemText = await page.$eval("body > header > div > ol.list-reset.grid.gs4 > li > a", elem => elem.innerText)
    console.log('element innerText:', elemText)
  } catch(err){
    console.log(err)
  }
  
  //await page.pdf({path: 'hn.pdf', format: 'A4'});

  await browser.close();
})();