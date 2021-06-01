FROM node:current-alpine3.13

ENV REACT_APP_ANALYTICS_ID=UA-18339357-1

# Copy
RUN mkdir -p /copy
WORKDIR /copy
COPY copy/ .

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
RUN yarn build
