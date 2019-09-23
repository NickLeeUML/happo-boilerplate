console.log("PREIVOUS_SHA: ", process.env.PREVIOUS_SHA);
console.log("CURRENT_SHA: ", process.env.CURRENT_SHA);
console.log("CHANGE_URL: ", process.env.CHANGE_URL);

const puppeteer = require('puppeteer');
const { processScreenShot } = require('./processing.js');
const { checkIfUnique, uploadImage, getBlobUrl, getHash } = require('./azure/blobService.js');
const { createReport, compare } = require('./happo.js');


async function runUI() {
  // return new Promise((resolve, reject)=>{

  // })


  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://news.ycombinator.com/'

  await page.goto(url, { waitUntil: 'networkidle0' });
  try {
    const elemText = await page.$eval("body > header > div > ol.list-reset.grid.gs4 > li > a", elem => elem.innerText)
    console.log('element innerText:', elemText)
  } catch (err) {
    console.log(err)
  }

  const data = await page.screenshot({ fullPage: true, encoding: 'base64' })

  const imageData = {
    url: null,
    component: 'Ycombinator',
    variant: 'News',
    target: 'Chrome'
  }


  await processScreenShot(imageData, data)

  await browser.close();

  //await compare()
  // await uploadImage('Stackoverflow',buff)

};


runUI()

async function start(){
  await runUI()
}

