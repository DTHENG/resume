FROM node:current-alpine3.13

COPY pdf-gen/ .
RUN npm install