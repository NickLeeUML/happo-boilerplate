const sizeOf = require('image-size');
const {
    checkIfUnique,
    uploadImage,
    getBlobUrl,
    convertToHash,
    listSegment 
} = require('./azure/blobService.js');
const { createReport, compare } = require('./happo.js');

const processScreenshot = async function (imageData, rawData) {

    const buff = new Buffer(rawData, 'base64');
    const size = sizeOf(buff);
    const hash = convertToHash(buff);  //md5 converter

    const snapshot = { ...imageData, ...{ height: size.height, width: size.width, } };

    const unique = await listSegment(hash);

    if (unique) {  // upload
        await uploadImage(hash, buff);
        const url = await getBlobUrl('screenshots', hash);
        snapshot.url = url;
        return snapshot;

    } else {  // don't upload  
        console.log("not unique");
        const url = await getBlobUrl('screenshots', hash);
        snapshot.url = url;
        return snapshot;
    }
}

module.exports = {
    processScreenshot: processScreenshot
}