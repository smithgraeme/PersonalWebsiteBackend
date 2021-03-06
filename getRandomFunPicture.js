const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async function(event, context, callback) {
    const bucket = "graeme-personal-website";

    var params = {
        Bucket: bucket,
    };

    const result = await s3.listObjects(params).promise();

    const imagesArray = result.Contents;

    const count = imagesArray.length;
    console.log("Image Count: " + count);

    const index = getRandomInt(0, count);
    console.log("Index: " + index);

    const chosenPictureKey = imagesArray[index].Key;
    console.log(chosenPictureKey);

    const url = s3.getSignedUrl('getObject', { Bucket: bucket, Key: chosenPictureKey });

    console.log('Presigned Access URL is', url);

    callback(null, {
        statusCode: '302',
        headers: {
            'Content-Type': 'application/json',
            'Location': url,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
    });
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
