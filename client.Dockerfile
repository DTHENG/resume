FROM node:16.14.0

# Copy
RUN mkdir -p /copy
WORKDIR /copy
COPY copy/ .

# Client 
RUN mkdir -p /client
WORKDIR /client
COPY client/ .
RUN yarn
