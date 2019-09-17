
const request = require('request-promise');
const { 
    checkIfUnique, 
    uploadImage, 
    getBlobUrl, 
    convertToHash, 
    listSegment } = require('./azure/blobService.js');

//require('dotenv').config()
require('dotenv').config({path:__dirname+'/.env'});
const HAPPO_API_KEY = process.env.HAPPO_API_KEY;
const HAPPO_API_SECRET = process.env.HAPPO_API_SECRET;

const blobService = require('./azure/blobService.js')


const token = new Buffer(`${HAPPO_API_KEY}:${HAPPO_API_SECRET}`).toString('base64');

const getReportStatus = async function(reportId){
    const options = {
        url: `https://happo.io/api/reports/${reportId}/status`,
        headers: {
            Authorization: `Basic ${token}`,
        },
    };
    request.get(options).then(console.log);
} 

const createReport = async function(sha, imageURLArray){
    // sha is a unique id usually the commit 

    const body = {
        snaps: [],
        project: '',
        message: '',
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

const completeReport = async function(sha, imageURLArray){}

function uploadLogic(data){
    const buff = new Buffer(data, 'base64');
    getBlobUrl('screenshots', buff)

}

const processScreenShot = async function(componentName, variant, data){
    const hash = convertToHash(data);
    //const unique = await checkIfUnique(hash)  //will return undefined if not available 
    const unique = await listSegment(hash)
    if(unique){  // upload
        const buff = new Buffer(data, 'base64');
        await uploadImage(hash, buff)
        const url = await getBlobUrl('screenshots', hash)
        
        // upload to happo here

    } else {  // dont't upload 
        console.log("not unique")
        const buff = new Buffer(data, 'base64');

        await uploadImage(hash, buff)
        const url = await getBlobUrl('screenshots', hash);

        //uploading to happo
    }
}

module.exports = {
    processScreenShot
}