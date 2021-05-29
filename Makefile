install: 
	yarn --cwd client install && yarn --cwd server install

build: 
	yarn --cwd client build

test: 
	yarn --cwd client test

run: 
	yarn --cwd client build && yarn --cwd server build && yarn --cwd server start

start: 
	yarn --cwd client start

	
	