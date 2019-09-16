
//import '@babel/polyfill'; 
const azure = require('azure-storage');
const { Aborter, BlobURL, BlockBlobURL, ContainerURL, ServiceURL, SharedKeyCredential, StorageURL, uploadStreamToBlockBlob } = require('@azure/storage-blob');
const sizeOf = require('image-size')
const md5 = require('md5')
const dotenv = require('dotenv').config()
const fs = require('fs');
const path = require('path');

const AZURE_STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT;
const AZURE_STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

const ONE_MEGABYTE = 1024 * 1024;
const FOUR_MEGABYTES = 4 * ONE_MEGABYTE;

const ONE_MINUTE = 60 * 1000;

const blobService = azure.createBlobService(AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY);

async function uploadImage(blobName, data) {
    return new Promise((resolve, reject) => {
        const containerName = "screenshots";
        
        blobService.createBlockBlobFromText(containerName, blobName, data, {contentSettings: { contentType: 'image/jpg'}}, function(error,result,reponse){
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(result);
                resolve(result);
            }
        })
    })
}

function getBlobUrl(containerName, blobName) {
    return blobService.getUrl(containerName, blobName);
}

async function checkIfUnique(buffer) {
    // data = buffer
    const url = md5(buffer);
    const url = await blobService.getUrl('screenshots', name);
}

module.exports = {
    checkIfUnique:checkIfUnique,
    uploadImage:uploadImage,

}