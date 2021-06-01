FROM node:current-alpine3.13

RUN mkdir -p /pdf-gen
WORKDIR /pdf-gen
COPY pdf-gen/ .
RUN npm install
