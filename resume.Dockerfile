FROM node:current-alpine3.13

ENV REACT_APP_ANALYTICS_ID=UA-18339357-1

# Client 
RUN mkdir -p /client
WORKDIR /client
COPY client/ .
RUN yarn
RUN yarn build

# Server
RUN mkdir -p /server
WORKDIR /server
COPY server/ .
RUN yarn
RUN npm install
RUN npm run build
