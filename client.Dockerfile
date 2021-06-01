FROM node:current-alpine3.13

COPY client/ .
RUN yarn