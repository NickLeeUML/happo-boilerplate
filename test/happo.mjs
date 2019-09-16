import request from 'request-promise';
import dotenv from 'dotenv';

const HAPPO_API_KEY = process.env.HAPPO_API_KEY;
const HAPPO_API_SECRET = process.env.HAPPO_API_SECRET;

import blobService from './azure/blobService.js';
const { getBlobUrl } = blobService;

const token = new Buffer(`${HAPPO_API_KEY}:${HAPPO_API_SECRET}`).toString('base64');

export const getReportStatus = async function(reportId){
    const options = {
        url: `https://happo.io/api/reports/${reportId}/status`,
        headers: {
            Authorization: `Basic ${token}`,
        },
    };
    request.get(options).then(console.log);
} 

export const createReport = async function(sha, imageURLArray){
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

export const completeReport = async function(sha, imageURLArray){}


function uploadLogic(data){
    const buff = new Buffer(data, 'base64');
    getBlobUrl('screenshots', buff)


}