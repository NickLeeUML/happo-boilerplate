const puppeteer = require('puppeteer');
const { processScreenShot } = require('./happo.js');
const {checkIfUnique, uploadImage, getBlobUrl, getHash} = require('./azure/blobService.js');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://stackoverflow.com/tags', {waitUntil: 'networkidle0'});
  try {
    const elemText = await page.$eval("body > header > div > ol.list-reset.grid.gs4 > li > a", elem => elem.innerText)
    console.log('element innerText:', elemText)
  } catch(err){
    console.log(err)
  }
  
  const data = await page.screenshot({fullPage: true, encoding: 'base64'})
  const buff = new Buffer(data, 'base64');
  await processScreenShot('Stackoverflow', 'homepage',data)

  await browser.close();
  // await uploadImage('Stackoverflow',buff)


})();