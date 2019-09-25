
const request = require('request-promise');
const {
    checkIfUnique,
    uploadImage,
    getBlobUrl,
    convertToHash,
    listSegment } = require('./azure/blobService.js');

//require('dotenv').config()
require('dotenv').config({ path: __dirname + '/.env' });
const HAPPO_API_KEY = process.env.HAPPO_API_KEY;
const HAPPO_API_SECRET = process.env.HAPPO_API_SECRET;

const blobService = require('./azure/blobService.js')


const token = new Buffer(`${HAPPO_API_KEY}:${HAPPO_API_SECRET}`).toString('base64');

const getReportStatus = async function (reportId) {
    const options = {
        url: `https://happo.io/api/reports/${reportId}/status`,
        headers: {
            Authorization: `Basic ${token}`,
        },
    };
    request.get(options).then(console.log);
}

const createReport = async function (sha, snapshots) {
    
    const body = {
        snaps: snapshots,
        project: 'Puppeteer Azure Integration w/ partials',
        message: '', // pull request title
        partial: true,
    };


    return new Promise((resolve, reject) => {
        const options = {
            url: `https://happo.io/api/reports/${sha}`,
            headers: {
                Authorization: `Basic ${token}`,
            },
            body: body,
            json: true,
        };
        request
            .post(options)
            .then((data) => {
                //handle error
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const completeReport = async function () {  //used when all screenshots are done
    return new Promise( (resolve, reject) => {
        request.post({
            url: `https://happo.io/api/reports/${process.env.SHA}/complete`,
            headers: {
                Authorization: `Basic ${token}`,
            },
        })
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
 }

function uploadLogic(data) {
    const buff = new Buffer(data, 'base64');
    getBlobUrl('screenshots', buff)

}

const compare = async function() {
    const body  = {
        project:'Puppeteer Azure Integration w/ partials',
        link: process.env.CHANGE_URL,
        message:'second comparison test',
        author:'nicholas_lee@uml.edu',
    };

    const options = {
        url: `https://happo.io/api/reports/${process.env.PREVIOUS_SHA}/compare/${process.env.CURRENT_SHA}`,
        headers: {
            Authorization: `Basic ${token}`,
        },
        body: body,
        json: true,
    };

    return new Promise((resolve, reject) => {
       

        request
            .post(options)
            .then((data) => {
                //handle error
                console.log("data: ", data);
                resolve(data);
            })
            .catch((error) => {
                console.log("error: ", error);
                reject(error);
            });
    })
}

module.exports = {
    completeReport: completeReport,
    createReport: createReport,
    compare: compare
}