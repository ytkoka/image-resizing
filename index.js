'use strict';
 
const AWS = require('aws-sdk');
const querystring = require('querystring');
const sharp = require('sharp');
const chromaSubsampling_value = '4:2:0'; //Default chroma subsampling 
const S3 = new AWS.S3();
const bucket_name = '<S3 Bucket_Name>';
 
exports.handler = (event, context, callback) => {
 
    let request = event.Records[0].cf.request;
    let response = event.Records[0].cf.response;

    if (response.status == 304 || response.status == 404 ) {
        callback(null, response);
        return;
    }
   
// File Size Check
if (response.headers['content-length'][0].value > 1048576){
    callback(null, response);
    return;
}
// File extension Check
if (!request.uri.endsWith('\.jpg') && !request.uri.endsWith('\.jpeg') ){
    console.log("request.uri", request.uri);
    callback(null, response);
    return;
}

// get the querystring
    let query_params = querystring.parse(request.querystring);

   if(query_params.resize != null && query_params.resize.indexOf(':') != -1){
        let imageparam = (query_params.resize).split(':');
        var width = parseInt(imageparam[0], 10);
        var height = parseInt(imageparam[1], 10);
   }else{
       // if there is no querystring, just pass the response
        callback(null, response);
        return;
   }
// Jpeg Quality
   if(query_params.q != null && (parseInt(query_params.q, 10)) <= 100){
        var jpgQuality_value = parseInt(query_params.q, 10);
   }else{
        var jpgQuality_value = 80; // Default Jpeg quality
   }

   console.log("width", width);
   console.log("height", height);
   console.log("jpgQuality_value", jpgQuality_value);

    let s3_params = {
        Bucket: bucket_name,
        Key: request.uri.substring(1)
    };

// get the source image file
    S3.getObject(s3_params).promise()
        .then(data => sharp(data.Body)
            .resize(width, height, {
                fit: sharp.fit.inside
            })
            .toFormat('jpeg')
            .jpeg({
                quality: jpgQuality_value,
                chromaSubsampling: chromaSubsampling_value
              })
            .toBuffer()
        )
        .then(buffer => {
            response.status = '200';
            response.body = buffer.toString('base64');
            response.bodyEncoding = 'base64';
            response.headers['content-type'] = [{ key: 'Content-Type', value: 'image/jpeg'}];
            callback(null, response);
        })
        .catch(err => {
            console.log(err);
        });
};

