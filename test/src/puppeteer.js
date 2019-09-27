const puppeteer = require('puppeteer');
const { processScreenshot } = require('./processing.js');
const { uploadImage, getBlobUrl, getHash } = require('./azure/blobService.js');
const { createReport, compare, completeReport, reportStatus } = require('./happo.js');

const url = `${process.env.URL}patterns/components-link-list-featured.default.html`;
const localUrl = 'http://localhost:8080/Website.UI.Template.v6.happo-url/patterns/';

function wait(func, time) { 
    return new Promise((resolve, reject) => {
    }) 
} 

function returnsPromise(puppeteerFunction, domain) {
  return new Promise(async (resolve, reject) => {
    let value = await puppeteerFunction(domain).catch((error) => {
      reject(error)
    })
    resolve(value);
  })
}

function processScripts(puppeteerScripts) {
  return new Promise((resolve, reject) => {
    let result = puppeteerScripts.reduce(async (accum, func) => {
      await accum;
      return returnsPromise(func, process.env.URL)

    }, Promise.resolve())

    result.then(async (value) => {
      // const completed = await completeReport()
      resolve(value);
    },
      (reason) => {
        reject(reason);
      }
    );
  })
}

async function catalogCourse(domain) {
  const imageArray = [];

  const url = `${domain}/patterns/components-catalog-course-default.default.html`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setViewport({
    width: 1200,
    height:600,
    deviceScaleFactor: 1
  })

  await page.goto(url, { waitUntil: 'networkidle2' });

  //await page.screenshot({fullPage: true, path:"beforeButtonPress.png"})
  let metaData = {
    url: null,
    component: 'Catalog Course',
    variant: 'default',
    target: 'Chrome'
  }
  const data = await page.screenshot({ fullPage: true, encoding: 'base64' })
  await processScreenshot(metaData, data)

  await page.$eval('body > form > uml-catalog-course > div > div > div.sc-hGoxap.bVyQSv > button', function(button){
    button.click()
  })
  
  //await page.screenshot({fullPage: true, path: "afterButtonPress.png"})
   metaData = {
    url: null,
    component: 'Catalog Course',
    variant: 'Details Clicked',
    target: 'Chrome'
  }
  const data = await page.screenshot({ fullPage: true, encoding: 'base64' })
  await processScreenshot(metaData, data)
  await browser.close();
}

async function newsBlocksSlider(domain){
  const snapshots = [];

  const url = `${domain}/patterns/components-news-blocks---slider.default.html`;
  const browser = await puppeteer.launch()
  const page = await browser.newPage();
  page.setViewport({
    width: 1200,
    height:600,
    deviceScaleFactor: 1
  })

  await page.goto(url, {waitUntil: 'networkidle2'});

  let metaData = {
    url: null,
    component: 'News Blocks -- slider',
    variant: 'default',
    target: 'Chrome'
  }
  const data = await page.screenshot({ fullPage: true, encoding: 'base64' })
  const snapshot = await processScreenshot(metaData, data)
  snapshots.push(snapshot);

  try {
    await page.$eval('body > form > div:nth-child(2) > div > uml-slider > div > div > div.comp-slider__buttons.sc-eqIVtm.hxsdAC > button.sc-bwzfXH.esZakx', (button) => {
      button.click()
    })
  } catch(err){
    console.log("Error: ", err);
  }

  setTimeout(async  function(){
    let metaData = {
      url: null,
      component: 'News Blocks -- slider',
      variant: 'Button Clicked',
      target: 'Chrome'
    }
    const data = await page.screenshot({ fullPage: true, encoding: 'base64' })
    const snapshot = await processScreenshot(metaData, data)
    snapshots.push(snapshot);

    try {
      console.log("Snapshots: ", snapshots);
      const result = await createReport(process.env.SHA, snapshots);  //check for error
      console.log("createReport result: ", result);
    } catch(error){
        console.log(error) 
    }
    await browser.close();

    const result = await createReport(process.env.SHA, snapshots);  //check for error
    await browser.close();
    const status = await reportStatus(process.env.SHA);
    const completed = await completeReport()
    const statusb = await reportStatus(process.env.SHA);

  }, 500)


}

function newsBlocksSliderPromise(domain) {
  return new Promise(async (resolve, reject) => {
    const snapshots = [];
    const url = `${domain}/patterns/components-news-blocks---slider.default.html`;
    const browser = await puppeteer.launch()
    const page = await browser.newPage();

    page.setViewport({
      width: 1200,
      height: 600,
      deviceScaleFactor: 1
    })

    await page.goto(url, { waitUntil: 'networkidle2' });

    let metaData = {
      url: null,
      component: 'News Blocks -- slider',
      variant: 'default',
      target: 'Chrome'
    }

    let data = await page.screenshot({ fullPage: true, encoding: 'base64' })
    const snapshot = await processScreenshot(metaData, data)
    snapshots.push(snapshot);

    try {
      await page.$eval('body > form > div:nth-child(2) > div > uml-slider > div > div > div.comp-slider__buttons.sc-eqIVtm.hxsdAC > button.sc-bwzfXH.esZakx', (button) => {
        button.click()
      })
    } catch (err) {
      console.log("Puppeteer button click error: ", err);
    }


    setTimeout(async function () {  // Code  in here must run after button click is done
      let metaData = {
        url: null,
        component: 'News Blocks -- slider',
        variant: 'Button Clicked',
        target: 'Chrome'
      }
      let data = await page.screenshot({ fullPage: true, encoding: 'base64' })
      const snapshot = await processScreenshot(metaData, data)
      snapshots.push(snapshot);
      try {
        console.log("Snapshots: ", snapshots);
        const result = await createReport(process.env.SHA, snapshots);  //check for error
        console.log("createReport result: ", result);
      } catch (error) {
        console.log(error)
      }
      await browser.close();

      const result = await createReport(process.env.SHA, snapshots);  //check for error
      await browser.close();
      resolve(result);

    }, 500)

   

  })
}

function catalogCoursePromise(domain) {
  return new Promise(async (resolve, reject) => {
    const snapshots = [];
    const url = `${domain}/patterns/components-catalog-course-default.default.html`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setViewport({
      width: 1200,
      height: 600,
      deviceScaleFactor: 1
    })

    await page.goto(url, { waitUntil: 'networkidle2' });

    let metaData = {
      url: null,
      component: 'Catalog Course',
      variant: 'default',
      target: 'Chrome'
    }
    let data = await page.screenshot({ fullPage: true, encoding: 'base64' })
    let snapshot = await processScreenshot(metaData, data)
    snapshots.push(snapshot);

    await page.$eval('body > form > uml-catalog-course > div > div > div.sc-hGoxap.bVyQSv > button', function (button) {
      button.click()
    })

    metaData = {
      url: null,
      component: 'Catalog Course',
      variant: 'Details Clicked',
      target: 'Chrome'
    }
    data = await page.screenshot({ fullPage: true, encoding: 'base64' })

    snapshot = await processScreenshot(metaData, data)
    snapshots.push(snapshot);
    console.log("processed: ", snapshot);
    await browser.close();
    const reportResult = await createReport(process.env.SHA, snapshots);  //check for error

    resolve(reportResult)
  })
}

function promiseAll() {
  const pupeteerFunctionsArray = [catalogCoursePromise, newsBlocksSliderPromise];
  Promise.all([newsBlocksSliderPromise(process.env.URL), catalogCoursePromise(process.env.URL)]).then( async () => { 
    const completed = await completeReport()
    console.log('completed: ', completed) 
  })
}

async function start() {
  promiseAll()
}

start()