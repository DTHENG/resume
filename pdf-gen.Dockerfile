FROM gcr.io/smooth-verve-252121/deploy_utils:latest

RUN bash auth.sh

RUN mkdir -p /copy
WORKDIR /copy
COPY copy/ .

RUN mkdir -p /pdf-gen
WORKDIR /pdf-gen
COPY pdf-gen/ .

