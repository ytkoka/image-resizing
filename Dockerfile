FROM amazonlinux:latest
MAINTAINER ytkoka

RUN ["/bin/bash", "-c", "curl -s https://rpm.nodesource.com/setup_12.x | bash -"]
RUN ["/bin/bash", "-c", "yum install -y gcc-c++ nodejs"]

CMD ["npm", "install", "--only=production"]

