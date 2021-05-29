FROM node:current-alpine3.13

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
