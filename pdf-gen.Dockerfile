FROM gcr.io/smooth-verve-252121/deploy_utils:latest

RUN mkdir -p /copy
WORKDIR /copy
COPY copy/ .

RUN mkdir -p /pdf-gen
WORKDIR /pdf-gen
COPY pdf-gen/ .

RUN yarn
