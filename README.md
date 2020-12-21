# image-resizing
## A lambda@edge function for resizing JPEG image on Origin response from S3 bucket.
Resizing JPEG format files by using "resize" query string and Changing JPEG quality by using "q" query string.

### Query Parameters:

* Resize  
	https://{cloudfront-domain}/image.jpg?resize=width:hight

*	Resize+Jpeg quality  
https://{cloudfront-domain}/image.jpg?resize=width:hight&q=quality(1-100)
 

### Setting up:
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

index.js : Please input your S3 bucket name into 'S3 Bucket_Name'

