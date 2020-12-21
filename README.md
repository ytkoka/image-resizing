# image-resizing
## A lambda@edge function for resizing JPEG image on Origin response from S3 bucket.
Resizing JPEG format files by using "resize" query string and Changing JPEG quality by using "q" query string.

### Query Parameters:

* Resize  
	https://{cloudfront-domain}/image.jpg?resize=width:hight

*	Resize+Jpeg quality  
https://{cloudfront-domain}/image.jpg?resize=width:hight&q=quality(1-100)
 

### Setting up:
The Dockerfile is configured to download Amazon Linux and install Node.js 12. x along with dependencies.

Dockerfile:
```
FROM amazonlinux:latest

RUN ["/bin/bash", "-c", "curl -s https://rpm.nodesource.com/setup_12.x | bash -"]
RUN ["/bin/bash", "-c", "yum install -y gcc-c++ nodejs"]

CMD ["npm", "install", "--only=production"]

```

package.json:
```
{
    "name": "image-risizing-at-edge",
    "version": "1.0.0",
    "description": "A lambda@edge function for resizing JPEG image on Origin response from S3 bucket",
     "main": "index.js",
    "dependencies": {
        "sharp": "^0.26"
    }
}
```
```
docker build -t amazonlinux/nodejs .
```
```
docker run --rm -v "$(pwd)":/opt -w /opt amazonlinux/nodejs:latest
```
index.js : Please input your S3 bucket name into 'S3 Bucket_Name'  

Package the node_module and index.js  
```
zip -r imageresize.zip node_modules/ index.js
```



