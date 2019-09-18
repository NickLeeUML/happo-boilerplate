console.log("COMMIT VALUE: ", process.env.commit)

const puppeteer = require('puppeteer');
const { processScreenShot } = require('./processing.js');
const {checkIfUnique, uploadImage, getBlobUrl, getHash} = require('./azure/blobService.js');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://news.ycombinator.com/news'

  await page.goto(url, {waitUntil: 'networkidle0'});
  try {
    const elemText = await page.$eval("body > header > div > ol.list-reset.grid.gs4 > li > a", elem => elem.innerText)
    console.log('element innerText:', elemText)
  } catch(err){
    console.log(err)
  }
  
  const data = await page.screenshot({fullPage: true, encoding: 'base64'})

  const imageData = {
    url: null,
    component: 'YCombinator',
    variant: 'News',
    target: 'Chrome',
};


  await processScreenShot(imageData, data)

  await browser.close();
  // await uploadImage('Stackoverflow',buff)


});

