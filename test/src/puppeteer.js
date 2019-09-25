console.log("PREIVOUS_SHA: ", process.env.PREVIOUS_SHA);
console.log("CURRENT_SHA: ", process.env.CURRENT_SHA);
console.log("CHANGE_URL: ", process.env.CHANGE_URL);
console.log("SHA: ", process.env.SHA);

const puppeteer = require('puppeteer');
const { processScreenshot } = require('./processing.js');
const { checkIfUnique, uploadImage, getBlobUrl, getHash } = require('./azure/blobService.js');
const { createReport, compare, completeReport, reportStatus } = require('./happo.js');

const url = `${process.env.URL}patterns/components-link-list-featured.default.html`;
const localUrl = 'http://localhost:8080/Website.UI.Template.v6.happo-url/patterns/';


function wait(func, time){
    return new Promise((resolve, reject) => {

      setTimeout(func,time)

    }) 
} 


const endpoints = {
  catalogs: [
    {
      component:'Catalog Course',
      variant: 'List',
      url: 'components-catalog-course-list-default.default.html' 
    },
    {
      component:'Catalog Course',
      variant: 'Default',
      url: 'components-catalog-course-default.default.html' 
    }
  ],
  linkList: [
    {
      component:'Link List',
      variant: 'Featured',
      url: 'components-link-list-featured.default.html' 
    },
    {
      component:'Link List',
      variant: 'Featured - Slider',
      url: 'components-link-list-featured---slider.default.html' 
    },
    {
      component:'Link List',
      variant: 'Featured - Dark Theme',
      url: 'components-link-list-featured---dark-theme.default.html' 
    },
  ]

}


async function runUI() {
  // return new Promise((resolve, reject)=>{
  // })

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });
  // try {
  //   const elemText = await page.$eval("body > header > div > ol.list-reset.grid.gs4 > li > a", elem => elem.innerText)
  //   console.log('element innerText:', elemText)
  // } catch (err) {
  //   console.log(err)
  // }

  const data = await page.screenshot({ fullPage: true, encoding: 'base64' })

  const imageData = {
    url: null,
    component: 'Linked List',
    variant: 'Featured',
    target: 'Chrome'
  }

  await processScreenshot(imageData, data)

  await browser.close();

  //await compare()
  //await uploadImage('Stackoverflow',buff)
};

//runUI()



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
  const metaData = {
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
  const metaData = {
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

  //await page.screenshot({fullPage: true, path:"before.png"});
  const metaData = {
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
    console.log("Whoops: ", err);
  }


  // async function func() {   //this value?
  //   const metaData = {
  //     url: null,
  //     component: 'News Blocks -- slider',
  //     variant: 'Button Clicked',
  //     target: 'Chrome'
  //   }
  //   const data = await page.screenshot({ fullPage: true, encoding: 'base64' })
  //   const snapshot = await processScreenshot(metaData, data)
  //   snapshot.push(snapshot);
  // }

  // const waitedFunc = wait(func,500)
  // await waitedFunc()



  setTimeout(async  function(){
    const metaData = {
      url: null,
      component: 'News Blocks -- slider',
      variant: 'Button Clicked',
      target: 'Chrome'
    }
    const data = await page.screenshot({ fullPage: true, encoding: 'base64' })
    const snapshot = await processScreenshot(metaData, data)
    snapshots.push(snapshot);
    //await page.screenshot({fullPage: true, path: "after.png"})


    try {
      console.log("Snapshots: ", snapshots);
      const result = await createReport(process.env.SHA, snapshots);  //check for error
      console.log("createReport result: ", result);
    } catch(error){
        console.log(error) 
    }
    await browser.close();

  }, 500)
  

  const result = await createReport(process.env.SHA, snapshots);  //check for error
  console.log("Result", result)
  await browser.close();
  const status = await reportStatus(process.env.SHA);
  console.log("report status: ", status);
  const completed = await completeReport()
  console.log("completed: ", completed);

  const statusb = await reportStatus(process.env.SHA);
  console.log("report status after complete: ", statusb);
}

async function start() {
  await newsBlocksSlider(process.env.URL)
}


start()