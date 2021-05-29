FROM node:current-alpine3.13

# Client 
RUN mkdir -p /client
COPY client/ .
WORKDIR /client
RUN yarn
RUN yarn build

# Server
RUN mkdir -p /server
COPY server/ .
WORKDIR /server
RUN yarn
RUN npm install
RUN npm run build
