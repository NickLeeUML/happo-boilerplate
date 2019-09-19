
const sizeOf = require('image-size');

const {
    checkIfUnique,
    uploadImage,
    getBlobUrl,
    convertToHash,
    listSegment } = require('./azure/blobService.js');

const { createReport } = require('./happo.js');

const processScreenShot = async function (imageData, rawdata) {

    const buff = new Buffer(rawdata, 'base64');
    const size = sizeOf(buff);
    const hash = convertToHash(buff);  //md5 converter
    //const unique = await checkIfUnique(hash)  //will return undefined if not available 

    const snapshot = { ...imageData, ...{ height: size.height, width: size.width, } };

    const unique = await listSegment(hash);

    if (unique) {  // upload
        await uploadImage(hash, buff);
        const url = await getBlobUrl('screenshots', hash);
        snapshot.url = url;
        const result = await createReport(process.env.CURRENT_SHA, snapshot);   //check for error
        console.log("createReport result: ", result);
        // upload to happo here

    } else {  // dont't upload 
        console.log("not unique");
        const url = await getBlobUrl('screenshots', hash)
        const result = await createReport(process.env.CURRENT_SHA, snapshot)  //check for error
        console.log("createReport result: ", result)
        //uploading to happo
    }
}

module.exports = {
    processScreenShot
}